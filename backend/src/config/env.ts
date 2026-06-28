import dotenv from "dotenv";

dotenv.config();

const env = {
    PORT: Number(process.env.PORT) || 5000,

    DATABASE_URL: process.env.DATABASE_URL!,

    JWT_SECRET: process.env.JWT_SECRET!,

    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN!,

    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID!
};

export default env;