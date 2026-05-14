import { orders } from '../data/order.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadTrackingPage() {
  await loadProductsFetch();

  // Read orderId and productId from URL parameters
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('orderId');
  const productId = params.get('productId');

  // Find the matching order
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  // Find the matching product details inside the order
  let matchingProductDetails;
  if (matchingOrder) {
    matchingOrder.products.forEach((productDetails) => {
      if (productDetails.productId === productId) {
        matchingProductDetails = productDetails;
      }
    });
  }

  // Get the product info
  const product = getProduct(productId);

  if (!matchingOrder || !matchingProductDetails || !product) {
    document.querySelector('.order-tracking').innerHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
      <p style="margin-top: 20px; color: red;">Could not find the order or product. Please go back and try again.</p>
    `;
    return;
  }

  // Render product info
  const deliveryTime = matchingProductDetails.estimatedDeliveryTime;
  const deliveryDateString = dayjs(deliveryTime).format('dddd, MMMM D');

  document.querySelector('.js-delivery-date').innerHTML =
    `Arriving on ${deliveryDateString}`;

  document.querySelector('.js-product-name').innerHTML = product.name;

  document.querySelector('.js-product-quantity').innerHTML =
    `Quantity: ${matchingProductDetails.quantity}`;

  document.querySelector('.js-product-image').src = product.image;

  // 18o: Calculate delivery progress
  const currentTime = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime);
  const deliveryDayjs = dayjs(deliveryTime);

  // progress = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100
  const progressPercent =
    ((currentTime - orderTime) / (deliveryDayjs - orderTime)) * 100;

  // Clamp between 0 and 100 for the visual bar
  const clampedPercent = Math.min(100, Math.max(0, progressPercent));

  // Set the progress bar width
  document.querySelector('.js-progress-bar').style.width = `${clampedPercent}%`;

  // Set the correct status label to green
  const preparingLabel = document.querySelector('.js-label-preparing');
  const shippedLabel   = document.querySelector('.js-label-shipped');
  const deliveredLabel = document.querySelector('.js-label-delivered');

  // Remove any existing current-status class
  preparingLabel.classList.remove('current-status');
  shippedLabel.classList.remove('current-status');
  deliveredLabel.classList.remove('current-status');

  if (progressPercent >= 100) {
    deliveredLabel.classList.add('current-status');
  } else if (progressPercent >= 50) {
    shippedLabel.classList.add('current-status');
  } else {
    preparingLabel.classList.add('current-status');
  }
}

loadTrackingPage();
