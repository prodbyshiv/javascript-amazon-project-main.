import { cart,removeFromCart,cartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOption } from "./deliveryOption.js";
const a = dayjs();
const b = a.add(7,'days');
const c = b.format('ddd,MMMM D');

console.log(c);


let html = '';

// generate html for each item in the cart
cart.forEach((cartItem) => {
    let matchingProduct;
    products.forEach((product) => {
        if (cartItem.productId === product.id) {
            matchingProduct = product;
        }
    });
    
    html += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}> 

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link"
                  data-product-id = ${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingProduct)}
              </div>
            </div>
          </div>
    `;
});
document.querySelector('.js-order-summary').innerHTML = html;
document.querySelectorAll('.js-delete-quantity-link')
.forEach((link)=>{
  link.addEventListener('click',()=>{
   const productId = link.dataset.productId;
    
    removeFromCart(productId);
    updateCheckoutItems();
  const deleteElement = document.querySelector(`.js-cart-item-container-${productId}`);
  deleteElement.remove();
  // localStorage.setItem('cart', JSON.stringify(cart));

  })
})

function updateCheckoutItems(params) {
  return document.querySelector('.js-return-to-home-link').innerHTML
 = `${cartQuantity()} items`;
}
updateCheckoutItems();


function deliveryOptionHTML(matchingProduct) {
  let html = '';

  deliveryOption.forEach((delivery, index)=>{

  const todayDate = dayjs();
  const deliveryDate = todayDate.add(delivery.deliveryDays,'days');
  const realTimeDeliveryDate = deliveryDate.format('ddd, MMMM D');

  const priceKya = delivery.priceCents 
  === 0
  ? 'FREE'
  : `$${delivery.priceCents / 100} - `;
  
    html += `
      <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                    ${index === 0 ? 'checked' : ''}>
                  <div>
                    <div class="delivery-option-date">
                      ${realTimeDeliveryDate}
                    </div>
                    <div class="delivery-option-price">
                      ${priceKya} Shipping
                    </div>
                  </div>
                </div>
    `
  })
  return html;
}