import { renderOrderSummary } from "../../scripts/checkout/ordersummary.js";
import { loadFromStorage } from "../../data/cart.js";
import { products } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll(() => {
    products.length = 0;
    products.push(
      {
        id: productId1,
        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        priceCents: 1090,
        getPrice() {
          return '$10.90';
        }
      },
      {
        id: productId2,
        image: 'images/products/intermediate-composite-basketball.jpg',
        name: 'Intermediate Size Basketball',
        priceCents: 2095,
        getPrice() {
          return '$20.95';
        }
      }
    );
  });

  afterEach(() => {
    if (localStorage.getItem.and && localStorage.getItem.and.callThrough) {
      localStorage.getItem.and.callThrough();
    }
  });

  function setupCartSpy() {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }
    ]));
    loadFromStorage();
  }

  it('displays the cart', () => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
    `;

    setupCartSpy();
    renderOrderSummary();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
  });

  it('removes a product', () => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="checkout-header js-checkout-header"></div>
    `;

    setupCartSpy();
    renderOrderSummary();

    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
  });
});
