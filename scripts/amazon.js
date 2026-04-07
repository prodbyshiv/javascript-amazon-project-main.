
import { products } from "../data/products.js";
import { addToCart,cartQuantity,cart} from "../data/cart.js";

 
let html = '';
products.forEach((product)=>{

   html += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars *10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-select-${product.id}" >
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart>
            <img src="images/icons/checkmark.png">
            
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" 
          data-product-id=${product.id}>
            Add to Cart
          </button>
        </div>
    `
});
document.querySelector('.js-product-grid').innerHTML
= html;

            //add to cart functionality//
cartQuantity();

document.querySelectorAll('.js-add-to-cart-button')
.forEach((button)=>{
    button.addEventListener('click',()=>{
    const productId = button.dataset.productId;
    
    const quantity = document.querySelector(`.js-select-${productId}`).value;

      addToCart(productId,quantity);
      
      console.log(cart);
      

    const cartQuantiTY = cartQuantity();
document.querySelector('.js-cart-quantity').innerHTML = cartQuantiTY;
 localStorage.setItem('cart',JSON.stringify(cart));
      
    });
})

// Update cart quantity display when page loads
document.querySelector('.js-cart-quantity').innerHTML = cartQuantity();
