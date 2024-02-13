import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { Telegraf } from "telegraf";

import prismadb from "@/lib/prismadb";
import { TelegrafService } from "@/services/telegraf/telegraf.service";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { appUrl, botToken } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!appUrl) {
      return new NextResponse("App url is required", { status: 400 });
    }

    if (!botToken) {
      return new NextResponse("Bot token is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const bot = new Telegraf(botToken);

    const validBotToken = await TelegrafService.tryBot(bot);

    if (!validBotToken) {
      return new NextResponse("Bot token is not valid", { status: 400 });
    }

    await TelegrafService.startBot(bot, appUrl, params.storeId);

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        appUrl,
        botToken,
        botName: validBotToken.botName,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
