// web/script.test.js
const { sumLastThreePrices } = require('./script');


const prices = [
    { price: '3' },
    { price: '8' },
    { price: '6' }
];

// Test para la función sumLastThreePrices
test('sumLastThreePrices suma correctamente los últimos tres precios', () => {
    const result = sumLastThreePrices(prices);
    expect(result).toBe(17); // Ajusta este valor según la suma esperada
});
