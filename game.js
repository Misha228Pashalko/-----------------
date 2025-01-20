let balance = 1000;  // Початковий баланс гравця
let cryptoAmount = 0;  // Кількість крипти у гравця
let cryptoPrice = 0;  // Поточна ціна крипти
let statusMessage = document.getElementById('statusMessage');
let balanceElement = document.getElementById('balance');
let cryptoAmountElement = document.getElementById('cryptoAmount');
let cryptoPriceElement = document.getElementById('cryptoPrice');

// Налаштування для графіка
let priceHistory = [];  // Масив для зберігання історії цін
let maxHistoryLength = 20;  // Максимальна кількість точок на графіку

// Ініціалізація графіка
const ctx = document.getElementById('priceChart').getContext('2d');
const priceChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],  // Часові мітки
    datasets: [{
      label: 'Ціна крипти (USD)',
      data: [],  // Дані для графіка
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    }]
  },
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Час'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Ціна (USD)'
        }
      }
    }
  }
});

// Функція для оновлення ціни крипти
function updateCryptoPrice() {
  const priceChange = (Math.random() - 0.5) * 50;  // Рандомна зміна ціни
  cryptoPrice = Math.max(1, cryptoPrice + priceChange);  // Ціна не може бути від'ємною
  cryptoPriceElement.textContent = `Ціна крипти: ${cryptoPrice.toFixed(2)} USD`;

  // Додаємо нову ціну до історії графіка
  if (priceHistory.length >= maxHistoryLength) {
    priceHistory.shift();  // Видаляємо перший елемент, якщо довжина більше maxHistoryLength
  }
  priceHistory.push(cryptoPrice);

  // Оновлюємо графік
  priceChart.data.labels.push(new Date().toLocaleTimeString());
  priceChart.data.datasets[0].data = priceHistory;
  if (priceChart.data.labels.length > maxHistoryLength) {
    priceChart.data.labels.shift();  // Видаляємо найстарішу мітку часу
  }
  priceChart.update();
}

// Купити крипту
document.getElementById('buyButton').addEventListener('click', () => {
  if (balance >= cryptoPrice) {
    const amountToBuy = Math.floor(balance / cryptoPrice);  // Скільки крипти можна купити
    balance -= amountToBuy * cryptoPrice;
    cryptoAmount += amountToBuy;
    balanceElement.textContent = balance.toFixed(2);
    cryptoAmountElement.textContent = cryptoAmount;
    statusMessage.textContent = `Ви купили ${amountToBuy} BTC!`;
  } else {
    statusMessage.textContent = 'У вас недостатньо грошей для покупки!';
  }
});

// Продати крипту
document.getElementById('sellButton').addEventListener('click', () => {
  if (cryptoAmount > 0) {
    balance += cryptoAmount * cryptoPrice;
    statusMessage.textContent = `Ви продали ${cryptoAmount} BTC за ${cryptoAmount * cryptoPrice.toFixed(2)} USD!`;
    cryptoAmount = 0;
    cryptoAmountElement.textContent = cryptoAmount;
    balanceElement.textContent = balance.toFixed(2);
  } else {
    statusMessage.textContent = 'У вас немає крипти для продажу!';
  }
});

// Оновлювати ціну кожні 2 секунди
setInterval(() => {
  updateCryptoPrice();
}, 2000);

// Початкове оновлення ціни
updateCryptoPrice();