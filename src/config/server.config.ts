process.loadEnvFile();

export default{
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    AUTH_SECRET: process.env.AUTH_SECRET==undefined ? 'DUMMY_SECRET' : process.env.AUTH_SECRET,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY==undefined ? 'DUMMY_KEY' : process.env.SENDGRID_API_KEY,
    MAIL_FROM: process.env.MAIL_FROM,
}