const { Telegraf, Markup } = require("telegraf");

const { PrismaClient } = require("@prisma/client");

const prismadb = new PrismaClient();

let counter = 0;

module.exports = class BotService {
  constructor() {
    this.init();
    counter += 1;
  }

  async init() {
    if (counter > 0) return;
    const stores = await prismadb.store.findMany();
    for (const store of stores) {
      const newBot = new Telegraf(store.botToken);
      newBot.command("start", (ctx: any) => {
        ctx.replyWithHTML(
          BotService.getHelloHtml(ctx),
          BotService.getActionButtons(
            `${process.env.FRONTEND_STORE_URL}?storeId=${store.id}`
          )
        );
      });

      newBot.launch();
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
};
