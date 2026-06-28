import TelegramBot from "node-telegram-bot-api";
import env from "../../../config/env";

class TelegramService {

    private bot: TelegramBot;

    constructor() {

        this.bot = new TelegramBot(
            env.TELEGRAM_BOT_TOKEN,
            {
                polling: false
            }
        );

    }

    async sendMessage(message: string) {

        try {

            await this.bot.sendMessage(

                env.TELEGRAM_CHAT_ID,

                message,

                {
                    parse_mode: "Markdown"
                }

            );

            console.log("📩 Telegram Notification Sent");

        } catch (error: any) {

            console.error("❌ Telegram Error");

            console.error(error?.response?.body || error.message);

        }

    }

    async sendIncidentCreated(

        projectName: string,

        monitorName: string,

        url: string,

        reason: string

    ) {

        const message = `
🚨 *INCIDENT CREATED*

📁 *Project:* ${projectName}

🖥 *Monitor:* ${monitorName}

🌐 *URL:*
${url}

❌ *Reason:*
${reason}

🕒 ${new Date().toLocaleString()}
`;

        await this.sendMessage(message);

    }

    async sendIncidentResolved(

        projectName: string,

        monitorName: string,

        url: string

    ) {

        const message = `
✅ *INCIDENT RESOLVED*

📁 *Project:* ${projectName}

🖥 *Monitor:* ${monitorName}

🌐 *URL:*
${url}

🎉 Service is Healthy Again

🕒 ${new Date().toLocaleString()}
`;

        await this.sendMessage(message);

    }

}

export const telegramService = new TelegramService();