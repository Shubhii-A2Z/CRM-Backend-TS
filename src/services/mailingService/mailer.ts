export class Mailer{
    static signInEmail(name: string) {
    const currentYear = new Date().getFullYear();
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Ticket Management System</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      
      <!-- 100% width background table -->
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7f6; padding: 40px 0;">
        <tr>
          <td align="center">
            
            <!-- Main Content Container (Max width 600px) -->
            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; max-width: 600px; width: 100%; margin: 0 auto;">
              
              <!-- Header Section -->
              <tr>
                <td style="background-color: #2563eb; padding: 30px 40px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">
                    Ticket Management System
                  </h1>
                </td>
              </tr>
              
              <!-- Body Section -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="color: #1f2937; margin-top: 0; font-size: 20px; font-weight: 600;">Welcome aboard, ${name}! 👋</h2>
                  <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                    We are thrilled to have you here. Your account has been successfully created and you are all set to start organizing, tracking, and resolving your tickets efficiently.
                  </p>
                  
                  <!-- Call to Action Button -->
                  <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-top: 30px; margin-bottom: 30px;">
                    <tr>
                      <td align="center" style="border-radius: 6px; background-color: #2563eb;">
                        <!-- Make sure to replace the href with your actual login URL -->
                        <a href="https://your-app-url.com/login" target="_blank" style="font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 14px 28px; display: inline-block; border-radius: 6px;">
                          Go to Dashboard
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 0;">
                    If you have any questions or need help getting started, simply reply to this email. We're here to help!
                  </p>
                </td>
              </tr>
              
              <!-- Footer Section -->
              <tr>
                <td style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 24px 40px; text-align: center;">
                  <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                    © ${currentYear} Ticket Management System. All rights reserved.
                  </p>
                  <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0 0;">
                    This is an automated message, please do not reply directly to this email unless you need support.
                  </p>
                </td>
              </tr>
              
            </table>
            
          </td>
        </tr>
      </table>
      
    </body>
    </html>
    `;
}

    static ticketCreatedEmail(title: string){
        return `
        <h1>Ticket Created</h1>
        <p>Ticket ${title} has been created successfully</p>
        `
    }
}