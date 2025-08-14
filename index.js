require("dotenv").config();
const axios = require("axios");
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

// Configuration
const CONFIG = {
  COIN_ID: process.env.COIN_ID || "bitcoin",
  PREFERRED_CURRENCY: process.env.PREFERRED_CURRENCY || "usd",
  CURRENCY_SYMBOL: process.env.CURRENCY_SYMBOL || "$",
  CURRENCY_BEFORE: process.env.CURRENCY_BEFORE === "true",
  THOUSAND_SEPARATOR: process.env.THOUSAND_SEPARATOR || ",",
  UPDATE_FREQUENCY: Math.max(1, parseInt(process.env.UPDATE_FREQUENCY) || 1),
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
};

// Check required variables
if (!CONFIG.DISCORD_TOKEN) {
  console.error("❌ ERROR: DISCORD_TOKEN not found in .env file!");
  process.exit(1);
}

// Create Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

// Utilities
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

// Main function for getting prices
async function getPrices() {
  try {
    utils.log(`Requesting data for ${CONFIG.COIN_ID}...`);

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${CONFIG.PREFERRED_CURRENCY}&ids=${CONFIG.COIN_ID}&price_change_percentage=1h,24h,7d,14d,30d`,
      { timeout: 10000 }
    );

    if (!response.data || !response.data[0]) {
      throw new Error("No coin data available");
    }

    const coinData = response.data[0];

    // Data validation
    if (!coinData.current_price && coinData.current_price !== 0) {
      throw new Error("Current price unavailable");
    }

    // Extract data
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

    // Update Discord status
    await updateDiscordStatus(priceChange24h);

    // Update avatar (only once)
    if (global.runOnce === 0 && avatar) {
      await updateAvatar(avatar);
      global.runOnce = 1;
    }

    // Update nicknames on all servers
    await updateNicknames(currentPrice);

    // Update application description
    await updateApplicationDescription({
      priceChange1h,
      priceChange24h,
      priceChange7d,
      priceChange30d,
      marketCap,
      symbol,
    });

    utils.log(`Price updated: ${CONFIG.CURRENCY_SYMBOL}${utils.formatNumber(currentPrice)}`, "SUCCESS");
  } catch (error) {
    utils.log(`Error getting data: ${error.message}`, "ERROR");

    // Set error status
    if (client.user) {
      client.user.setPresence({
        activities: [{ name: "API Error", type: ActivityType.Playing }],
        status: "dnd",
      });
    }
  }
}

// Update Discord status
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
    utils.log(`Error updating status: ${error.message}`, "WARNING");
  }
}

// Update avatar
async function updateAvatar(avatarUrl) {
  try {
    await client.user.setAvatar(avatarUrl);
    utils.log("Avatar updated", "SUCCESS");
  } catch (error) {
    utils.log(`Error updating avatar: ${error.message}`, "WARNING");
  }
}

// Update nicknames on servers
async function updateNicknames(currentPrice) {
  try {
    const guilds = client.guilds.cache;
    const nickname = CONFIG.CURRENCY_BEFORE
      ? `${CONFIG.CURRENCY_SYMBOL}${utils.formatNumber(currentPrice)}`
      : `${utils.formatNumber(currentPrice)}${CONFIG.CURRENCY_SYMBOL}`;

    for (const [guildId, guild] of guilds) {
      try {
        await guild.members.me.setNickname(nickname);
        utils.log(`Nickname updated on server: ${guild.name}`);
      } catch (error) {
        utils.log(`Failed to update nickname on server ${guild.name}: ${error.message}`, "WARNING");
      }
    }
  } catch (error) {
    utils.log(`Error updating nicknames: ${error.message}`, "WARNING");
  }
}

// Update application description
async function updateApplicationDescription(priceData) {
  try {
    const { priceChange1h, priceChange24h, priceChange7d, priceChange30d, marketCap, symbol } = priceData;

    const description =
      `**${utils.getCoinName()}** (${symbol}) price changes.\n` +
      `${utils.getPriceSymbol(priceChange1h)}${priceChange1h.toFixed(2)}% (1h) ${utils.getArrow(priceChange1h)}\n` +
      `${utils.getPriceSymbol(priceChange24h)}${priceChange24h.toFixed(2)}% (24h) ${utils.getArrow(priceChange24h)}\n` +
      `${utils.getPriceSymbol(priceChange7d)}${priceChange7d.toFixed(2)}% (7d) ${utils.getArrow(priceChange7d)}\n` +
      `${utils.getPriceSymbol(priceChange30d)}${priceChange30d.toFixed(2)}% (30d) ${utils.getArrow(priceChange30d)}\n` +
      `Market cap: ${utils.formatNumber(marketCap)} ${CONFIG.PREFERRED_CURRENCY.toUpperCase()}`;

    await client.application.edit({ description });
    utils.log("Application description updated", "SUCCESS");
  } catch (error) {
    utils.log(`Error updating description: ${error.message}`, "WARNING");
  }
}

// Discord event handlers
client.on("ready", () => {
  utils.log(`Bot ${client.user.tag} successfully connected to Discord!`, "SUCCESS");
  utils.log(`Connected to ${client.guilds.cache.size} servers`);

  // Initialization
  global.runOnce = 0;
  getPrices();

  // Set update interval
  const intervalMs = CONFIG.UPDATE_FREQUENCY * 60 * 1000;
  setInterval(getPrices, intervalMs);

  utils.log(`Auto-update set every ${CONFIG.UPDATE_FREQUENCY} minutes`);
});

client.on("error", (error) => {
  utils.log(`Discord client error: ${error.message}`, "ERROR");
});

client.on("disconnect", () => {
  utils.log("Bot disconnected from Discord", "WARNING");
});

// Process termination handling
process.on("SIGINT", () => {
  utils.log("Received SIGINT signal, shutting down...", "INFO");
  client.destroy();
  process.exit(0);
});

process.on("SIGTERM", () => {
  utils.log("Received SIGTERM signal, shutting down...", "INFO");
  client.destroy();
  process.exit(0);
});

process.on("unhandledRejection", (reason, promise) => {
  utils.log(`Unhandled promise rejection: ${reason}`, "ERROR");
});

process.on("uncaughtException", (error) => {
  utils.log(`Uncaught exception: ${error.message}`, "ERROR");
  process.exit(1);
});

// Start the bot
try {
  client.login(CONFIG.DISCORD_TOKEN);
  utils.log("Attempting to connect to Discord...", "INFO");
} catch (error) {
  utils.log(`Startup error: ${error.message}`, "ERROR");
  process.exit(1);
}
