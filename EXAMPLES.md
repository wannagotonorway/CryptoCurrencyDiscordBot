# 📊 Примеры конфигурации

## 🪙 Bitcoin (Bitcoin)

### USD

```env
COIN_ID=bitcoin
PREFERRED_CURRENCY=usd
CURRENCY_SYMBOL=$
CURRENCY_BEFORE=true
THOUSAND_SEPARATOR=,
UPDATE_FREQUENCY=1
```

**Результат:**

- Статус: `BITCOIN +2.45% ▲`
- Никнейм: `$43,250`
- Описание: Детальная статистика в USD

### EUR

```env
COIN_ID=bitcoin
PREFERRED_CURRENCY=eur
CURRENCY_SYMBOL=€
CURRENCY_BEFORE=true
THOUSAND_SEPARATOR=.
UPDATE_FREQUENCY=1
```

**Результат:**

- Статус: `BITCOIN +2.45% ▲`
- Никнейм: `€40.150`
- Описание: Детальная статистика в EUR

### RUB

```env
COIN_ID=bitcoin
PREFERRED_CURRENCY=rub
CURRENCY_SYMBOL=₽
CURRENCY_BEFORE=false
THOUSAND_SEPARATOR=
UPDATE_FREQUENCY=1
```

**Результат:**

- Статус: `BITCOIN +2.45% ▲`
- Никнейм: `4 125 000₽`
- Описание: Детальная статистика в RUB

## 🔷 Ethereum (Ethereum)

### USD

```env
COIN_ID=ethereum
PREFERRED_CURRENCY=usd
CURRENCY_SYMBOL=Ξ
CURRENCY_BEFORE=false
THOUSAND_SEPARATOR=,
UPDATE_FREQUENCY=2
```

**Результат:**

- Статус: `ETHEREUM +1.23% ▲`
- Никнейм: `2,450Ξ`
- Описание: Детальная статистика в USD

### EUR

```env
COIN_ID=ethereum
PREFERRED_CURRENCY=eur
CURRENCY_SYMBOL=€
CURRENCY_BEFORE=true
THOUSAND_SEPARATOR=.
UPDATE_FREQUENCY=2
```

**Результат:**

- Статус: `ETHEREUM +1.23% ▲`
- Никнейм: `€2.280`
- Описание: Детальная статистика в EUR

## 🟡 BNB (Binance Coin)

### USD

```env
COIN_ID=binancecoin
PREFERRED_CURRENCY=usd
CURRENCY_SYMBOL=BNB
CURRENCY_BEFORE=false
THOUSAND_SEPARATOR=,
UPDATE_FREQUENCY=3
```

**Результат:**

- Статус: `BINANCECOIN +0.87% ▲`
- Никнейм: `320BNB`
- Описание: Детальная статистика в USD

### USDT

```env
COIN_ID=binancecoin
PREFERRED_CURRENCY=usdt
CURRENCY_SYMBOL=USDT
CURRENCY_BEFORE=false
THOUSAND_SEPARATOR=,
UPDATE_FREQUENCY=3
```

**Результат:**

- Статус: `BINANCECOIN +0.87% ▲`
- Никнейм: `320USDT`
- Описание: Детальная статистика в USDT

## 🟣 Cardano (ADA)

### USD

```env
COIN_ID=cardano
PREFERRED_CURRENCY=usd
CURRENCY_SYMBOL=₳
CURRENCY_BEFORE=false
THOUSAND_SEPARATOR=,
UPDATE_FREQUENCY=2
```

**Результат:**

- Статус: `CARDANO +3.21% ▲`
- Никнейм: `0.45₳`
- Описание: Детальная статистика в USD

### EUR

```env
COIN_ID=cardano
PREFERRED_CURRENCY=eur
CURRENCY_SYMBOL=€
CURRENCY_BEFORE=true
THOUSAND_SEPARATOR=.
UPDATE_FREQUENCY=2
```

**Результат:**

- Статус: `CARDANO +3.21% ▲`
- Никнейм: `€0.42`
- Описание: Детальная статистика в EUR

## 🟠 Solana (SOL)

### USD

```env
COIN_ID=solana
PREFERRED_CURRENCY=usd
CURRENCY_SYMBOL=◎
CURRENCY_BEFORE=false
THOUSAND_SEPARATOR=,
UPDATE_FREQUENCY=2
```

**Результат:**

- Статус: `SOLANA +5.67% ▲`
- Никнейм: `98.50◎`
- Описание: Детальная статистика в USD

## 🟢 Polkadot (DOT)

### USD

```env
COIN_ID=polkadot
PREFERRED_CURRENCY=usd
CURRENCY_SYMBOL=DOT
CURRENCY_BEFORE=false
THOUSAND_SEPARATOR=,
UPDATE_FREQUENCY=2
```

**Результат:**

- Статус: `POLKADOT +1.89% ▲`
- Никнейм: `7.25DOT`
- Описание: Детальная статистика в USD

## 🔴 Chainlink (LINK)

### USD

```env
COIN_ID=chainlink
PREFERRED_CURRENCY=usd
CURRENCY_SYMBOL=LINK
CURRENCY_BEFORE=false
THOUSAND_SEPARATOR=,
UPDATE_FREQUENCY=2
```

**Результат:**

- Статус: `CHAINLINK +2.34% ▲`
- Никнейм: `15.80LINK`
- Описание: Детальная статистика в USD

## 🟡 Dogecoin (DOGE)

### USD

```env
COIN_ID=dogecoin
PREFERRED_CURRENCY=usd
CURRENCY_SYMBOL=Ð
CURRENCY_BEFORE=false
THOUSAND_SEPARATOR=,
UPDATE_FREQUENCY=1
```

**Результат:**

- Статус: `DOGECOIN +8.90% ▲`
- Никнейм: `0.078Ð`
- Описание: Детальная статистика в USD

## 🌐 Мультивалютные конфигурации

### Bitcoin в разных валютах

#### USD (по умолчанию)

```env
COIN_ID=bitcoin
PREFERRED_CURRENCY=usd
CURRENCY_SYMBOL=$
CURRENCY_BEFORE=true
```

#### EUR

```env
COIN_ID=bitcoin
PREFERRED_CURRENCY=eur
CURRENCY_SYMBOL=€
CURRENCY_BEFORE=true
```

#### GBP

```env
COIN_ID=bitcoin
PREFERRED_CURRENCY=gbp
CURRENCY_SYMBOL=£
CURRENCY_BEFORE=true
```

#### JPY

```env
COIN_ID=bitcoin
PREFERRED_CURRENCY=jpy
CURRENCY_SYMBOL=¥
CURRENCY_BEFORE=false
```

#### CNY

```env
COIN_ID=bitcoin
PREFERRED_CURRENCY=cny
CURRENCY_SYMBOL=¥
CURRENCY_BEFORE=false
```

#### RUB

```env
COIN_ID=bitcoin
PREFERRED_CURRENCY=rub
CURRENCY_SYMBOL=₽
CURRENCY_BEFORE=false
```

#### UAH

```env
COIN_ID=bitcoin
PREFERRED_CURRENCY=uah
CURRENCY_SYMBOL=₴
CURRENCY_BEFORE=false
```

## ⚡ Настройки производительности

### Высокая частота обновления

```env
UPDATE_FREQUENCY=1
```

- Обновление каждую минуту
- Максимальная актуальность
- Высокая нагрузка на API

### Средняя частота обновления

```env
UPDATE_FREQUENCY=5
```

- Обновление каждые 5 минут
- Хороший баланс актуальности и нагрузки
- Рекомендуется для большинства случаев

### Низкая частота обновления

```env
UPDATE_FREQUENCY=15
```

- Обновление каждые 15 минут
- Минимальная нагрузка на API
- Подходит для долгосрочного мониторинга

## 🎨 Кастомизация отображения

### Разделители тысяч

#### Запятая (английский стиль)

```env
THOUSAND_SEPARATOR=,
```

Результат: `$43,250.00`

#### Точка (европейский стиль)

```env
THOUSAND_SEPARATOR=.
```

Результат: `$43.250,00`

#### Пробел (международный стиль)

```env
THOUSAND_SEPARATOR=
```

Результат: `$43 250.00`

### Позиция символа валюты

#### Символ перед ценой

```env
CURRENCY_BEFORE=true
```

Результат: `$43,250`

#### Символ после цены

```env
CURRENCY_BEFORE=false
```

Результат: `43,250$`

## 🔧 Продвинутые настройки

### Таймаут API

```env
API_TIMEOUT=15000
```

- Увеличивает таймаут до 15 секунд
- Полезно для медленных соединений

### Логирование

```env
LOG_LEVEL=DEBUG
```

- Включает детальное логирование
- Полезно для отладки

### Обработка ошибок

```env
RETRY_ATTEMPTS=3
RETRY_DELAY=5000
```

- Повторные попытки при ошибках API
- Задержка между попытками

---

## 📝 Примечания

1. **Частота обновления**: CoinGecko API имеет лимиты, не устанавливайте UPDATE_FREQUENCY меньше 1 минуты
2. **Символы валют**: Используйте Unicode символы для лучшего отображения
3. **Разделители**: Выбирайте в соответствии с локалью пользователей
4. **Тестирование**: Всегда тестируйте конфигурацию перед продакшеном

## 🚀 Следующие шаги

После настройки конфигурации:

1. Перезапустите бота
2. Проверьте логи на ошибки
3. Убедитесь, что статус обновляется
4. Проверьте отображение цены в никнейме
