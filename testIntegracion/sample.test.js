Feature('My First Test');

Scenario('test something', ({ I }) => {
  I.amOnPage('https://frontending-2a5106696ee9.herokuapp.com/');
  I.see('Producto');
  I.see('Cantidad');
});