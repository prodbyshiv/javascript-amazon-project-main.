// ========================================
// CHECKOUT PAGE CONTROLLER
// Handles displaying cart items, delivery options, and user interactions
// ========================================

// Import dependencies
import { cart, removeFromCart, cartQuantity, updateDeliveryOptions } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from "./deliveryOption.js";

// ========================================
// GENERATE HTML FOR CART ITEMS
// ========================================

let html = '';

// Loop through each item in the cart
cart.forEach((cartItem) => {
    // Find the matching product details
    let matchingProduct;
    products.forEach((product) => {
        if (cartItem.productId === product.id) {
            matchingProduct = product;
        }
    });

    // Find the selected delivery option for this cart item
    const deliveryOptionID = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionID) {
            deliveryOption = option;
        }
    });

    // Fallback to first delivery option if none found
    if (!deliveryOption) {
        deliveryOption = deliveryOptions[0];
    }

    // Calculate delivery date based on selected option
    const todayDate = dayjs();
    const deliveryDate = todayDate.add(deliveryOption.deliveryDays, 'days');
    const realTimeDeliveryDate = deliveryDate.format('ddd, MMMM D');

    // Generate HTML for this cart item
    html += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${realTimeDeliveryDate}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

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
                          data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingProduct, deliveryOption)}
            </div>
        </div>
    </div>
    `;
});

// Insert the generated HTML into the page
document.querySelector('.js-order-summary').innerHTML = html;

// ========================================
// EVENT LISTENERS
// ========================================

// Handle delete item clicks
document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            // Remove from cart and update UI
            removeFromCart(productId);
            updateCheckoutItems();

            // Remove the item from the DOM
            const deleteElement = document.querySelector(`.js-cart-item-container-${productId}`);
            deleteElement.remove();
        });
    });

// Handle delivery option changes
document.querySelectorAll('.js-delivery-option-input')
    .forEach((input) => {
        input.addEventListener('change', () => {
            const productId = input.dataset.productId;
            const deliveryId = input.dataset.deliveryId;
            const deliveryDays = Number(input.dataset.deliveryDays);

            // Update the cart with new delivery option
            updateDeliveryOptions(productId, deliveryId);

            // Update the delivery date display
            const cartItemContainer = input.closest('.cart-item-container');
            const deliveryDateLabel = cartItemContainer.querySelector('.delivery-date');
            const newDate = dayjs().add(deliveryDays, 'days').format('ddd, MMMM D');
            deliveryDateLabel.textContent = `Delivery date: ${newDate}`;
        });
    });

// ========================================
// HELPER FUNCTIONS
// ========================================

// Update the cart quantity display in the header
function updateCheckoutItems() {
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity()} items`;
}

// Initial update of cart quantity
updateCheckoutItems();

// Generate HTML for delivery options radio buttons
function deliveryOptionHTML(matchingProduct, selectedDeliveryOption) {
    let html = '';

    deliveryOptions.forEach((delivery) => {
        // Calculate date for this delivery option
        const todayDate = dayjs();
        const deliveryDate = todayDate.add(delivery.deliveryDays, 'days');
        const realTimeDeliveryDate = deliveryDate.format('ddd, MMMM D');

        // Format price display
        const priceDisplay = delivery.priceCents === 0
            ? 'FREE'
            : `$${(delivery.priceCents / 100).toFixed(2)} - `;

        // Check if this option is selected
        const isChecked = delivery.id === selectedDeliveryOption.id ? 'checked' : '';

        html += `
        <div class="delivery-option">
            <input type="radio"
                   class="delivery-option-input js-delivery-option-input"
                   name="delivery-option-${matchingProduct.id}"
                   data-product-id="${matchingProduct.id}"
                   data-delivery-id="${delivery.id}"
                   data-delivery-days="${delivery.deliveryDays}"
                   ${isChecked}>
            <div>
                <div class="delivery-option-date">
                    ${realTimeDeliveryDate}
                </div>
                <div class="delivery-option-price">
                    ${priceDisplay} Shipping
                </div>
            </div>
        </div>
        `;
    });

    return html;
}
