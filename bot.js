const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
const WEBAPP_URL = 'https://YOUR_FRONTEND_LINK.vercel.app/?startapp=true';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'user';
  console.log(`👋 /start received from ${firstName} (ID: ${chatId})`);

  bot.sendMessage(chatId, `👋 Hey ${firstName}! Tap below to launch the game:`, {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '⚡ Play Tap Game',
          web_app: { url: WEBAPP_URL }
        }
      ]]
    }
  });
});

bot.on('web_app_data', (msg) => {
  console.log('[WebApp Data]', msg);
});

bot.on('polling_error', (err) => console.error('[Polling Error]', err.message));
bot.on('error', (err) => console.error('[Bot Error]', err.message));

// Express keep-alive
app.get('/', (req, res) => res.send('Bot is running.'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Express running on port ${PORT}`));
