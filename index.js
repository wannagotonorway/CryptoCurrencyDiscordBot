require("dotenv").config();
const axios = require("axios");
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

// Конфигурация
const CONFIG = {
  COIN_ID: process.env.COIN_ID || "bitcoin",
  PREFERRED_CURRENCY: process.env.PREFERRED_CURRENCY || "usd",
  CURRENCY_SYMBOL: process.env.CURRENCY_SYMBOL || "$",
  CURRENCY_BEFORE: process.env.CURRENCY_BEFORE === "true",
  THOUSAND_SEPARATOR: process.env.THOUSAND_SEPARATOR || ",",
  UPDATE_FREQUENCY: Math.max(1, parseInt(process.env.UPDATE_FREQUENCY) || 1),
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
};

// Проверка обязательных переменных
if (!CONFIG.DISCORD_TOKEN) {
  console.error("❌ ОШИБКА: DISCORD_TOKEN не найден в .env файле!");
  process.exit(1);
}

// Создание Discord клиента
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

// Утилиты
const utils = {
  formatNumber: (number) => {
    if (typeof number !== "number" || isNaN(number)) return "0";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, CONFIG.THOUSAND_SEPARATOR);
  },

  getPriceSymbol: (change) => (change >= 0 ? "+" : ""),

  getArrow: (change) => (change >= 0 ? "▲" : "▼"),

  getCoinName: () => {
    return CONFIG.COIN_ID.charAt(0).toUpperCase() + CONFIG.COIN_ID.slice(1);
  },

  log: (message, type = "INFO") => {
    const timestamp = new Date().toISOString();
    const emoji = {
      INFO: "ℹ️",
      SUCCESS: "✅",
      ERROR: "❌",
      WARNING: "⚠️",
    };
    console.log(`${emoji[type]} [${timestamp}] ${message}`);
  },
};

// Основная функция получения цен
async function getPrices() {
  try {
    utils.log(`Запрос данных для ${CONFIG.COIN_ID}...`);

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${CONFIG.PREFERRED_CURRENCY}&ids=${CONFIG.COIN_ID}&price_change_percentage=1h,24h,7d,14d,30d`,
      { timeout: 10000 }
    );

    if (!response.data || !response.data[0]) {
      throw new Error("Нет данных о монете");
    }

    const coinData = response.data[0];

    // Валидация данных
    if (!coinData.current_price && coinData.current_price !== 0) {
      throw new Error("Текущая цена недоступна");
    }

    // Извлечение данных
    const {
      current_price: currentPrice = 0,
      price_change_percentage_24h: priceChange24h = 0,
      price_change_percentage_1h_in_currency: priceChange1h = 0,
      price_change_percentage_7d_in_currency: priceChange7d = 0,
      price_change_percentage_14d_in_currency: priceChange14d = 0,
      price_change_percentage_30d_in_currency: priceChange30d = 0,
      symbol = "?",
      market_cap: marketCap = 0,
      image: avatar = "",
    } = coinData;

    // Обновление статуса Discord
    await updateDiscordStatus(priceChange24h);

    // Обновление аватара (только один раз)
    if (global.runOnce === 0 && avatar) {
      await updateAvatar(avatar);
      global.runOnce = 1;
    }

    // Обновление никнейма на всех серверах
    await updateNicknames(currentPrice);

    // Обновление описания приложения
    await updateApplicationDescription({
      priceChange1h,
      priceChange24h,
      priceChange7d,
      priceChange30d,
      marketCap,
      symbol,
    });

    utils.log(`Цена обновлена: ${CONFIG.CURRENCY_SYMBOL}${utils.formatNumber(currentPrice)}`, "SUCCESS");
  } catch (error) {
    utils.log(`Ошибка при получении данных: ${error.message}`, "ERROR");

    // Установка статуса ошибки
    if (client.user) {
      client.user.setPresence({
        activities: [{ name: "Ошибка API", type: ActivityType.Playing }],
        status: "dnd",
      });
    }
  }
}

// Обновление статуса Discord
async function updateDiscordStatus(priceChange) {
  try {
    const statusText = `${CONFIG.COIN_ID.toUpperCase()} ${utils.getPriceSymbol(priceChange)}${priceChange.toFixed(2)}% ${utils.getArrow(
      priceChange
    )}`;

    client.user.setPresence({
      activities: [{ name: statusText, type: ActivityType.Watching }],
      status: "online",
    });
  } catch (error) {
    utils.log(`Ошибка обновления статуса: ${error.message}`, "WARNING");
  }
}

// Обновление аватара
async function updateAvatar(avatarUrl) {
  try {
    await client.user.setAvatar(avatarUrl);
    utils.log("Аватар обновлен", "SUCCESS");
  } catch (error) {
    utils.log(`Ошибка обновления аватара: ${error.message}`, "WARNING");
  }
}

// Обновление никнеймов на серверах
async function updateNicknames(currentPrice) {
  try {
    const guilds = client.guilds.cache;
    const nickname = CONFIG.CURRENCY_BEFORE
      ? `${CONFIG.CURRENCY_SYMBOL}${utils.formatNumber(currentPrice)}`
      : `${utils.formatNumber(currentPrice)}${CONFIG.CURRENCY_SYMBOL}`;

    for (const [guildId, guild] of guilds) {
      try {
        await guild.members.me.setNickname(nickname);
        utils.log(`Никнейм обновлен на сервере: ${guild.name}`);
      } catch (error) {
        utils.log(`Не удалось обновить никнейм на сервере ${guild.name}: ${error.message}`, "WARNING");
      }
    }
  } catch (error) {
    utils.log(`Ошибка обновления никнеймов: ${error.message}`, "WARNING");
  }
}

// Обновление описания приложения
async function updateApplicationDescription(priceData) {
  try {
    const { priceChange1h, priceChange24h, priceChange7d, priceChange30d, marketCap, symbol } = priceData;

    const description =
      `**${utils.getCoinName()}** (${symbol}) изменения цены.\n` +
      `${utils.getPriceSymbol(priceChange1h)}${priceChange1h.toFixed(2)}% (1ч) ${utils.getArrow(priceChange1h)}\n` +
      `${utils.getPriceSymbol(priceChange24h)}${priceChange24h.toFixed(2)}% (24ч) ${utils.getArrow(priceChange24h)}\n` +
      `${utils.getPriceSymbol(priceChange7d)}${priceChange7d.toFixed(2)}% (7д) ${utils.getArrow(priceChange7d)}\n` +
      `${utils.getPriceSymbol(priceChange30d)}${priceChange30d.toFixed(2)}% (30д) ${utils.getArrow(priceChange30d)}\n` +
      `Рыночная капитализация: ${utils.formatNumber(marketCap)} ${CONFIG.PREFERRED_CURRENCY.toUpperCase()}`;

    await client.application.edit({ description });
    utils.log("Описание приложения обновлено", "SUCCESS");
  } catch (error) {
    utils.log(`Ошибка обновления описания: ${error.message}`, "WARNING");
  }
}

// Обработчики событий Discord
client.on("ready", () => {
  utils.log(`Бот ${client.user.tag} успешно подключен к Discord!`, "SUCCESS");
  utils.log(`Подключен к ${client.guilds.cache.size} серверам`);

  // Инициализация
  global.runOnce = 0;
  getPrices();

  // Установка интервала обновления
  const intervalMs = CONFIG.UPDATE_FREQUENCY * 60 * 1000;
  setInterval(getPrices, intervalMs);

  utils.log(`Автообновление установлено каждые ${CONFIG.UPDATE_FREQUENCY} минут`);
});

client.on("error", (error) => {
  utils.log(`Ошибка Discord клиента: ${error.message}`, "ERROR");
});

client.on("disconnect", () => {
  utils.log("Бот отключен от Discord", "WARNING");
});

// Обработка завершения процесса
process.on("SIGINT", () => {
  utils.log("Получен сигнал SIGINT, завершение работы...", "INFO");
  client.destroy();
  process.exit(0);
});

process.on("SIGTERM", () => {
  utils.log("Получен сигнал SIGTERM, завершение работы...", "INFO");
  client.destroy();
  process.exit(0);
});

process.on("unhandledRejection", (reason, promise) => {
  utils.log(`Необработанное отклонение промиса: ${reason}`, "ERROR");
});

process.on("uncaughtException", (error) => {
  utils.log(`Необработанное исключение: ${error.message}`, "ERROR");
  process.exit(1);
});

// Запуск бота
try {
  client.login(CONFIG.DISCORD_TOKEN);
  utils.log("Попытка подключения к Discord...", "INFO");
} catch (error) {
  utils.log(`Ошибка при запуске: ${error.message}`, "ERROR");
  process.exit(1);
}
