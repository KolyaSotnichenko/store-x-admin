import { Telegraf } from "telegraf";
import prismadb from "./lib/prismadb";
import { TelegrafService } from "./services/telegraf/telegraf.service";

interface IStore {
  id: string;
  name: string;
  botToken: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export async function register() {
  try {
    const res = await prismadb.store.findMany();

    res.forEach(async (store) => {
      const newBot = new Telegraf(store.botToken);

      const liveBot = await TelegrafService.tryBot(newBot);

      if (liveBot) {
        await TelegrafService.stopBot(newBot);
      }

      await TelegrafService.startBot(
        newBot,
        process.env.FRONTEND_STORE_URL!,
        store.id
      );
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
