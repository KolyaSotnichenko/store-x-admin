import { Context, Markup } from "telegraf";

export class TelegrafService {
  static async startBot(bot: any, appUrl: string, storeId: string) {
    bot.command("start", (ctx: Context) => {
      ctx.replyWithHTML(
        this.getHelloHtml(ctx),
        this.getActionButtons(
          `${process.env.FRONTEND_STORE_URL}?storeId=${storeId}`
        )
      );
    });

    bot.launch();
  }

  static async stopBot(bot: any) {
    bot.stop();
  }

  static async tryBot(bot: any) {
    try {
      const { username } = await bot.telegram.getMe();
      return { botName: username };
    } catch (e) {
      throw e;
    }
  }

  static getActionButtons(url: string) {
    return Markup.keyboard([Markup.button.webApp("Open Shop", url, false)]);
  }

  static getHelloHtml(ctx: any) {
    const { first_name, last_name, username } = ctx.update.message.from;
    const user =
      first_name && last_name ? `${first_name} ${last_name}` : username;

    const response_message = `
    <strong>Привет, ${user} ✌</strong> 
    \n
    <b>Ты попал к одному из тестовых script ботов.</b> 
    \n
    <b>Я представляю собой интернет-магазин, встроенный в ТГ.</b> 
    `;

    return response_message;
  }
}
