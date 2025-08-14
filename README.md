# CryptoCurrency Discord Bot

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/) [![Discord.js](https://img.shields.io/badge/Discord.js-14.14.1-blue.svg)](https://discord.js.org/) [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Version](https://img.shields.io/badge/Version-2.1.0-orange.svg)](package.json)

A powerful Discord bot for real-time cryptocurrency price tracking using CoinGecko API. Automatically updates bot status, nickname, and avatar with live crypto data.

## 🚀 Features

- 📊 **Real-time price tracking** - Live cryptocurrency prices from CoinGecko API
- 🔄 **Automatic updates** - Configurable update frequency (1-5 minutes)
- 👤 **Dynamic nickname** - Bot nickname shows current price on all servers
- 🎭 **Live status** - Discord status displays price changes with arrows
- 🖼️ **Auto avatar** - Automatically sets cryptocurrency logo as bot avatar
- 📈 **Price analytics** - Shows price changes for 1h, 24h, 7d, 14d, 30d periods
- 💰 **Multi-currency** - Support for USD, EUR, GBP, JPY, CNY, RUB, UAH
- 🐳 **Docker ready** - Easy deployment with Docker and Docker Compose
- ⚡ **Lightweight** - Minimal resource usage, optimized performance

## 📋 Requirements

- **Node.js** 16.0 or higher
- **Discord Bot Token** (from Discord Developer Portal)
- **Internet connection** for API access
- **Discord server** where bot has permissions

## ⚡ Quick Start

**Get running in 3 simple steps!**

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp env.example .env
# Edit .env with your Discord token and preferences

# 3. Start the bot
npm start
```

📖 **[Detailed Quick Start Guide](QUICK_START.md)**

## 🛠️ Installation

### Method 1: Manual Installation

1. **Clone the repository:**

```bash
git clone https://github.com/wannagotonorway/CryptoCurrencyDiscordBot.git
cd CryptoCurrencyDiscordBot
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure settings:**

```bash
cp env.example .env
# Edit .env file with your settings
```

4. **Start the bot:**

```bash
npm start
```

### Method 2: Docker Installation

```bash
# Using Docker Compose (recommended)
docker-compose up -d

# Or using Docker directly
docker build -t crypto-discord-bot .
docker run --env-file .env crypto-discord-bot
```

## ⚙️ Configuration

Create a `.env` file based on `env.example`:

```env
# REQUIRED: Discord Bot Token
DISCORD_TOKEN=your_discord_bot_token_here

# Cryptocurrency settings
COIN_ID=bitcoin                    # Cryptocurrency ID from CoinGecko
PREFERRED_CURRENCY=usd             # Display currency (usd, eur, gbp, etc.)
CURRENCY_SYMBOL=$                  # Currency symbol
CURRENCY_BEFORE=true               # Symbol position (true=before, false=after)
THOUSAND_SEPARATOR=,               # Number separator

# Update settings
UPDATE_FREQUENCY=1                 # Update interval in minutes (1-5 recommended)
```

### 🔧 Available Scripts

```bash
npm start              # Start the bot
npm run dev            # Start with nodemon (development)
npm test               # Run tests
npm run lint           # Check code style
npm run lint:fix       # Fix code style issues
npm run format         # Format code with Prettier
npm run docker:build   # Build Docker image
npm run docker:run     # Run with Docker
```

## 🎯 Supported Cryptocurrencies

Any cryptocurrency available in [CoinGecko API](https://api.coingecko.com/api/v3/coins/list).

### Popular Examples:

- `bitcoin` - Bitcoin (BTC)
- `ethereum` - Ethereum (ETH)
- `binancecoin` - BNB (BNB)
- `cardano` - Cardano (ADA)
- `solana` - Solana (SOL)
- `polkadot` - Polkadot (DOT)
- `dogecoin` - Dogecoin (DOGE)

## 🔧 How It Works

The bot automatically updates every configured interval:

1. **Fetches data** from CoinGecko API
2. **Updates Discord status** with price and change percentage
3. **Changes nickname** on all servers with current price
4. **Updates application description** with detailed statistics
5. **Sets cryptocurrency avatar** (once on startup)

### 📊 Example Output

**Status:** `BITCOIN +2.45% ▲`  
**Nickname:** `$43,250`  
**Description:** Detailed price change statistics with market cap

## 🐳 Docker Deployment

### Quick Docker Setup

```bash
# 1. Configure environment
cp env.example .env
# Edit .env with your settings

# 2. Start with Docker Compose
docker-compose up -d

# 3. View logs
docker-compose logs -f

# 4. Stop the bot
docker-compose down
```

### Docker Commands

```bash
# Build image
docker build -t crypto-discord-bot .

# Run container
docker run --env-file .env crypto-discord-bot

# Run in background
docker run -d --env-file .env --name crypto-bot crypto-discord-bot
```

## 🚀 Deployment Options

### VPS/Server Deployment

```bash
# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone https://github.com/wannagotonorway/CryptoCurrencyDiscordBot.git
cd CryptoCurrencyDiscordBot
npm install
cp env.example .env
# Configure .env
npm start
```

### PM2 Process Manager

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start index.js --name crypto-bot

# Monitor
pm2 monit

# Auto-restart on reboot
pm2 startup
pm2 save
```

### Heroku Deployment

```bash
# Create Heroku app
heroku create your-crypto-bot

# Set environment variables
heroku config:set DISCORD_TOKEN=your_token
heroku config:set COIN_ID=bitcoin

# Deploy
git push heroku main
```

## 🚨 Troubleshooting

### Common Issues

**❌ Bot not connecting:**

- Check Discord token is correct
- Ensure bot has proper permissions
- Verify internet connection

**❌ No price updates:**

- Check COIN_ID exists in CoinGecko
- Verify API rate limits (max 5 requests/minute)
- Check network connectivity

**❌ Permission errors:**

- Ensure bot has "Manage Nicknames" permission
- Check bot role hierarchy on servers

### Debug Mode

Enable debug logging by setting in `.env`:

```env
LOG_LEVEL=DEBUG
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Documentation

- 🚀 **[Quick Start](QUICK_START.md)** - Get running in 5 minutes
- 🛠️ **[Deployment Guide](DEPLOYMENT.md)** - Complete deployment instructions
- 📖 **[Configuration Examples](EXAMPLES.md)** - Settings for different cryptocurrencies
- 📋 **[Changelog](CHANGELOG.md)** - Version history and updates
- 🔒 **[Security Policy](SECURITY.md)** - Security guidelines
- ⚙️ **[Environment Variables](env.example)** - All configuration options

## 🆘 Support

- 📖 **Documentation:** Check the docs above
- 🐛 **Issues:** [GitHub Issues](https://github.com/wannagotonorway/CryptoCurrencyDiscordBot/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/wannagotonorway/CryptoCurrencyDiscordBot/discussions)

## ⭐ Star History

If you find this project helpful, please give it a star! ⭐

---

**Made with ❤️ for the crypto community**
