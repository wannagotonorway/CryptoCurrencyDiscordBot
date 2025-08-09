# 🚀 Быстрый запуск CryptoCurrency Discord Bot

## ⚡ 5 минут до запуска

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка конфигурации

```bash
cp env.example .env
# Отредактируйте .env файл, добавив ваш DISCORD_TOKEN
```

### 3. Запуск

```bash
npm start
```

## 🎯 Минимальная конфигурация (.env)

```env
DISCORD_TOKEN=your_bot_token_here
COIN_ID=bitcoin
PREFERRED_CURRENCY=usd
CURRENCY_SYMBOL=$
```

## 🐳 Docker запуск

```bash
# Сборка и запуск
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

## 🪟 Windows запуск

Просто дважды кликните на `btc.bat` файл!

## ✅ Проверка работы

1. Бот должен появиться онлайн в Discord
2. Статус покажет текущую цену Bitcoin
3. Никнейм изменится на цену
4. Аватар установится автоматически

## 🚨 Если что-то не работает

1. Проверьте `.env` файл
2. Убедитесь, что токен правильный
3. Проверьте права бота на сервере
4. Посмотрите логи в консоли

## 📱 Добавление бота на сервер

1. Перейдите в [Discord Developer Portal](https://discord.com/developers/applications)
2. Выберите ваше приложение
3. Скопируйте OAuth2 URL
4. Добавьте бота на сервер с правами:
   - Manage Nicknames
   - Change Nickname
   - View Channels

## 🔧 Полезные команды

```bash
# Режим разработки (автоперезагрузка)
npm run dev

# Обновление зависимостей
npm update

# Проверка уязвимостей
npm audit

# Просмотр версий
npm list
```

## 📊 Настройка других криптовалют

```env
# Ethereum
COIN_ID=ethereum
CURRENCY_SYMBOL=Ξ

# BNB
COIN_ID=binancecoin
CURRENCY_SYMBOL=BNB

# Cardano
COIN_ID=cardano
CURRENCY_SYMBOL=₳
```

## 🎨 Кастомизация

```env
# Другие валюты
PREFERRED_CURRENCY=eur
CURRENCY_SYMBOL=€

# Позиция символа
CURRENCY_BEFORE=false

# Частота обновления (минуты)
UPDATE_FREQUENCY=5
```

## 🆘 Нужна помощь?

- 📖 Полное руководство: [DEPLOYMENT.md](DEPLOYMENT.md)
- 🐛 Проблемы: Создайте Issue в репозитории
- 💬 Вопросы: Discord сервер разработчиков

---

**🎉 Готово! Ваш бот отслеживает цены криптовалют!**
