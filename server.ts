const express = require("express");
const next = require("next");
const BotService = require("./services/bot/bot.service");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const botService = new BotService();

  server.all("*", (req: any, res: any) => {
    return handle(req, res);
  });

  server.listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Ready on ${port}`);
  });
});
