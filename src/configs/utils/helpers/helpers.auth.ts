import type { DoneFuncWithErrOrRes } from "fastify";
import type { Iuser, IUserProfileType } from "../../../types/user";
import { ValidationError } from "../errorhandlers/errors.handler";
import crypto from "crypto"
import redis from "../../db/db.redis";
import { sendEmail, type sendEmail_params } from "../emails/emails.otp";
import { OtpErrorMessageList } from "../../constants/local.constants";

export const validateRegistration = (data: Iuser, userProfileType: IUserProfileType) => {
    const { name, email, password, phone_number } = data;
    if (!name || !email || !password || (userProfileType === "SELLER" && (!phone_number))) {
        throw new ValidationError(`missing required fields`)
    }
    // trackOtpRequests(email, done)
}

export const checkOtpRestrictions = async (email: string, done: DoneFuncWithErrOrRes) => {

    const errOtpMessage: OtpErrorMessage | undefined = OtpErrorMessageList.find(
        (otp) => otp.language === "en"
    );

    const responseLockOtp = await redis.get(`otp_lock:${email}`);
    if (responseLockOtp) {
        return done(new ValidationError(errOtpMessage?.otp_Lock_message))
    };
    const responseSpamLockOtp = await redis.get(`otp_spam_lock:${email}`);
    if (responseSpamLockOtp) {
        return done(new ValidationError(errOtpMessage?.otp_Spam_message))
    }
    const responseCooldownOtp = await redis.get(`otp_cooldown:${email}`);
    if (responseCooldownOtp) {
        return done(new ValidationError(errOtpMessage?.otp_Cooldown_message))
    }

}


export const trackOtpRequests = async (email: string, done: DoneFuncWithErrOrRes) => {

    const errOtpMessage: OtpErrorMessage | undefined = OtpErrorMessageList.find(
        (otp) => otp.language === "en"
    );
    const otpRequestKey = `otp_request_count:${email}`
    let otpRequests = parseInt((await redis.get(otpRequestKey)) || "0");
    if (otpRequests >= 2) {
        await redis.set(`otp_spam_lock:${email}`, "locked", "EX", 3600); // Lock for 1hour return
        return done(new ValidationError(errOtpMessage?.otp_Cooldown_message))
    }
    await redis.set(otpRequestKey, otpRequests + 1, "EX", 3600);
};

export const sendOtp = async (name: string, email: string, template: string) => {
    const otp = crypto.randomInt(100000, 999999).toString();
    // set the otp on redis database with expiry date

    const otpExpiryTime = 300; const otpNextTimetoSend = 60;
    const emailInfo: sendEmail_params = {
        to: email,
        subject: "Verify Your Email",
        templateName: template,
        data: { name }
    }
    await sendEmail(emailInfo);
    await redis.set(`otp:${email}`, otp, "EX", otpExpiryTime);
    await redis.set(`otp_cooldown:${email}`, "true", "EX", otpNextTimetoSend);
}

