import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { TelegrafService } from "@/services/telegraf/telegraf.service";
import { Telegraf } from "telegraf";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, botToken } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!botToken) {
      return new NextResponse("Bot token is required", { status: 400 });
    }

    const bot = new Telegraf(botToken);

    const validBotToken = await TelegrafService.tryBot(bot);

    if (!validBotToken) {
      return new NextResponse("Bot token is not valid", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        botToken,
        userId,
      },
    });

    const newBot = new Telegraf(botToken);

      await TelegrafService.startBot(
        newBot,
        process.env.FRONTEND_STORE_URL!,
        store.id
      );

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await prismadb.store.findMany();

    return NextResponse.json(data);
  } catch (error) {
    console.log("[STORES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
