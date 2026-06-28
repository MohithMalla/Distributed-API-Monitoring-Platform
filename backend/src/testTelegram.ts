import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(
    process.env.TELEGRAM_BOT_TOKEN!,
    {
        polling: false
    }
);

async function test() {

    try {

        await bot.sendMessage(
            process.env.TELEGRAM_CHAT_ID!,
            "✅ Telegram Integration Working!"
        );

        console.log("✅ Message Sent Successfully");

    } catch (error) {

        console.error(error);

    }

}

test();