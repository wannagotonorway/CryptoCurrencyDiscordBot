# 🚀 Руководство по развертыванию

## 📋 Предварительные требования

### 1. Discord Bot Setup

1. Перейдите на [Discord Developer Portal](https://discord.com/developers/applications)
2. Создайте новое приложение
3. Перейдите в раздел "Bot"
4. Создайте бота и скопируйте токен
5. Включите необходимые интенты:
   - Server Members Intent
   - Message Content Intent (если планируете команды)

### 2. Системные требования

- **Node.js** 16.0 или выше
- **npm** или **yarn**
- **Git** для клонирования

## 🛠️ Установка

### Локальная установка

```bash
# Клонирование репозитория
git clone <your-repo-url>
cd CryptoCurrencyDiscordBot

# Установка зависимостей
npm install

# Настройка конфигурации
cp env.example .env
# Отредактируйте .env файл

# Запуск
npm start
```

### Разработка

```bash
# Установка nodemon для автоматической перезагрузки
npm install -g nodemon

# Запуск в режиме разработки
npm run dev
```

## ⚙️ Конфигурация

### Основные настройки (.env)

```env
# ОБЯЗАТЕЛЬНО
DISCORD_TOKEN=your_bot_token_here

# НАСТРОЙКИ КРИПТОВАЛЮТЫ
COIN_ID=bitcoin
PREFERRED_CURRENCY=usd
CURRENCY_SYMBOL=$

# НАСТРОЙКИ ОТОБРАЖЕНИЯ
CURRENCY_BEFORE=true
THOUSAND_SEPARATOR=,
UPDATE_FREQUENCY=1
```

### Поддерживаемые валюты

| Валюта     | Код   | Символ | Пример     |
| ---------- | ----- | ------ | ---------- |
| Доллар США | `usd` | `$`    | $43,250    |
| Евро       | `eur` | `€`    | €40,150    |
| Рубль      | `rub` | `₽`    | ₽4,125,000 |
| Гривна     | `uah` | `₴`    | ₴1,650,000 |

### Популярные криптовалюты

| Название | ID            | Описание                        |
| -------- | ------------- | ------------------------------- |
| Bitcoin  | `bitcoin`     | Первая криптовалюта             |
| Ethereum | `ethereum`    | Платформа смарт-контрактов      |
| BNB      | `binancecoin` | Токен Binance                   |
| Cardano  | `cardano`     | Научный подход к блокчейну      |
| Solana   | `solana`      | Высокопроизводительный блокчейн |

## 🚀 Развертывание на сервере

### 1. VPS/Сервер

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка PM2 для управления процессами
sudo npm install -g pm2

# Клонирование и настройка
git clone <your-repo-url>
cd CryptoCurrencyDiscordBot
npm install
cp env.example .env
# Настройка .env

# Запуск через PM2
pm2 start index.js --name "crypto-bot"
pm2 startup
pm2 save
```

### 2. Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["npm", "start"]
```

```bash
# Сборка и запуск
docker build -t crypto-bot .
docker run -d --name crypto-bot --env-file .env crypto-bot
```

### 3. Heroku

```bash
# Установка Heroku CLI
# Создание приложения
heroku create your-bot-name

# Настройка переменных окружения
heroku config:set DISCORD_TOKEN=your_token
heroku config:set COIN_ID=bitcoin
heroku config:set PREFERRED_CURRENCY=usd

# Деплой
git push heroku main
```

## 🔧 Мониторинг и логирование

### PM2 команды

```bash
# Просмотр логов
pm2 logs crypto-bot

# Перезапуск
pm2 restart crypto-bot

# Статус
pm2 status

# Мониторинг в реальном времени
pm2 monit
```

### Логирование

Бот автоматически логирует:

- ✅ Успешные операции
- ❌ Ошибки API
- ⚠️ Предупреждения
- ℹ️ Информационные сообщения

## 🚨 Устранение неполадок

### Частые проблемы

1. **Бот не подключается к Discord**
   - Проверьте токен в .env
   - Убедитесь, что бот добавлен на сервер
   - Проверьте права бота

2. **Ошибки API CoinGecko**
   - Проверьте интернет-соединение
   - Убедитесь, что COIN_ID правильный
   - Возможно, превышен лимит API

3. **Бот не обновляет статус**
   - Проверьте права на изменение никнейма
   - Убедитесь, что UPDATE_FREQUENCY >= 1

### Логи ошибок

```bash
# Просмотр последних ошибок
pm2 logs crypto-bot --err

# Просмотр всех логов
pm2 logs crypto-bot --lines 100
```

## 📊 Производительность

### Рекомендации

- **UPDATE_FREQUENCY**: 1-5 минут (CoinGecko API лимиты)
- **Таймаут API**: 10 секунд
- **Память**: Минимум 128MB RAM
- **CPU**: 1 ядро достаточно

### Мониторинг ресурсов

```bash
# Использование памяти и CPU
pm2 monit

# Системные ресурсы
htop
free -h
```

## 🔒 Безопасность

### Рекомендации

1. **Никогда не публикуйте .env файл**
2. **Используйте сильные токены**
3. **Ограничьте права бота на серверах**
4. **Регулярно обновляйте зависимости**

### Обновление зависимостей

```bash
# Проверка уязвимостей
npm audit

# Обновление зависимостей
npm update

# Обновление до последних версий
npm outdated
npm install package@latest
```

## 📞 Поддержка

Если у вас возникли проблемы:

1. Проверьте логи: `pm2 logs crypto-bot`
2. Убедитесь, что все переменные окружения настроены
3. Проверьте права бота на серверах Discord
4. Создайте Issue в репозитории

## 🎯 Следующие шаги

После успешного развертывания:

1. Добавьте бота на ваши Discord серверы
2. Настройте права и роли
3. Протестируйте функциональность
4. Настройте мониторинг
5. Рассмотрите добавление команд и функций
