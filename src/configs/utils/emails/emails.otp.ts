
import nodemailer from "nodemailer";
import { envMailService } from "../../constants/env.config";
import ejs from "ejs";
import path from "path";

interface renderEmailTemplate_params {
    templateName: string;
    data: Record<string, any>;
}

export interface sendEmail_params {
    to: string;
    subject: string;
    templateName: string;
    data: Record<string, any>;
}

const transporter = nodemailer.createTransport({
    host: envMailService.SMTP_HOST,
    port: envMailService.SMTP_PORT,
    service: envMailService.SMTP_SERVICE,
    auth: {
        user: envMailService.SMTP_USER,
        pass: envMailService.SMTP_PASSWORD
    }
})

export const renderEmailTemplate = async (params: renderEmailTemplate_params): Promise<string> => {
    const { templateName, data } = params;
    const templatePath = path.join(
        process.cwd(),
        "src",
        "configs",
        "utils",
        "emails",
        "templates",
        `${templateName}.ejs`,
    )
    return ejs.renderFile(templatePath, data);
}

export const sendEmail = async (params: sendEmail_params) => {
    const { to, subject, templateName, data } = params;
    const render_Params = { templateName, data };
    try {
        const html = await renderEmailTemplate(render_Params);
        await transporter.sendMail({
            from: `<${envMailService.SMTP_USER}`,
            to,
            subject,
            html
        });
        return true;
    } catch (error) {
        console.log("failed to send email", error);
        return false;
    }
}