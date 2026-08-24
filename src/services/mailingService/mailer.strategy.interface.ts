export interface MailingStrategy{
    sendEmail(to: string, subject: string, body: string): Promise<any>;
}