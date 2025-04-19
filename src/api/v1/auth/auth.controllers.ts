
import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import type { Iuser, IUserProfileType } from '../../../types/user';
import { checkOtpRestrictions, sendOtp, trackOtpRequests, validateRegistration } from '../../../configs/utils/helpers/helpers.auth';
import UserModel from '../users/users.models';
import { ValidationError } from '../../../configs/utils/errorhandlers/errors.handler';

export const userRegistration = async (req: FastifyRequest, reply: FastifyReply) => {

    try {

        const defaultUserProfile: IUserProfileType = "DEFAULT"
        const data = req.body as Iuser
        validateRegistration(data, defaultUserProfile);

        // Check if email already exists before creating a new user
        const existingUser = await UserModel.findOne({ where: { email: data.email } });
        if (existingUser) {
            throw new ValidationError(`Email already exists: ${existingUser.dataValues.email}`)
        };
        await checkOtpRestrictions(data.email);
        await trackOtpRequests(data.email);
        await sendOtp(data.name, data.email, "email-activation-registration");
        reply.status(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({
                message: "Otp send to provided email, pls verify"
            })
    } catch (error) {
        return error;
    }
}