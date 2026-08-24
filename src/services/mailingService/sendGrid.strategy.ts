import sendgrid from "@sendgrid/mail";

import { MailingStrategy } from "./mailer.strategy.interface";
import serverConfig from "@/config/server.config";

export class SendGrid implements MailingStrategy{

    constructor(){
        sendgrid.setApiKey(serverConfig.SENDGRID_API_KEY);
    }
    
    async sendEmail(to: string, subject: string, body: any) {
        const message={
            to: to,
            from: {
                name: 'Ticket Management System',
                email: serverConfig.MAIL_FROM || ' '
            },
            subject: subject,
            html: body
        };

        const response=await sendgrid.send(message);
        return {
            message: 'Email Sent',
            data: response
        };
    }
}