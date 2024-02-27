import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // if (!botToken) {
    //   return new NextResponse("Bot token is required", { status: 400 });
    // }

    // const bot: Telegraf<Context<Update>> = new Telegraf(botToken);

    // const validBotToken = await TelegrafService.tryBot(bot);

    // if (!validBotToken) {
    //   return new NextResponse("Bot token is not valid", { status: 400 });
    // }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
        botName: "",
        botToken: "",
        botWelcomeText: "",
        appUrl: `https://${name}${process.env.FRONTEND_STORE_URL!}`,
      },
    });

    // const newBot = new Telegraf(botToken);

    // await TelegrafService.startBot(
    //   newBot,
    //   process.env.FRONTEND_STORE_URL!,
    //   store.id
    // );

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: any) {
  const { storeId } = (await req.query) || {};

  if (storeId) {
    try {
      const data = await prismadb.store.findUnique({
        where: {
          id: String(storeId),
        },
      });

      return NextResponse.json(data);
    } catch (error) {
      console.log("[STORES_GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }

  try {
    const data = await prismadb.store.findMany();

    return NextResponse.json(data);
  } catch (error) {
    console.log("[STORES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { storeId } = req.query;

//     if (storeId) {
//       const data = await prismadb.store.findUnique({
//         where: {
//           id: String(storeId),
//         },
//       });

//       if (data) {
//         return res.json(data);
//       } else {
//         return res.status(404).json({ error: "Store not found" });
//       }
//     } else {
//       const data = await prismadb.store.findMany();
//       return res.json(data);
//     }
//   } catch (error) {
//     console.error("[STORES_GET]", error);
//     return res.status(500).json({ error: "Internal error" });
//   }
// }
