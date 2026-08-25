export interface MailingStrategy{
    sendEmail(to: string, subject: string, body: string): Promise<any>;
    sendResetPasswordEmail(to: string, subject: string, body: string): Promise<any>;
}