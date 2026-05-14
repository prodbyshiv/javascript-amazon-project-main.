import {cart, addToCart, saveToStorage} from '../data/cart.js';
import {products, loadProductsFetch} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

// 18p / 18q: Read search param from URL and filter products
function getSearchQuery() {
  const params = new URLSearchParams(window.location.search);
  return (params.get('search') || '').trim().toLowerCase();
}

function filterProducts(searchQuery) {
  if (!searchQuery) return products;

  return products.filter((product) => {
    // 18q: case-insensitive name match
    const nameMatch = product.name.toLowerCase().includes(searchQuery);

    // 18q: case-insensitive keyword match
    const keywordMatch = product.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchQuery)
    );

    return nameMatch || keywordMatch;
  });
}

loadProductsFetch(renderProductsGrid);

function renderProductsGrid() {
  const searchQuery = getSearchQuery();
  const filteredProducts = filterProducts(searchQuery);

  let productsHTML = '';

  if (filteredProducts.length === 0) {
    productsHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; font-size: 18px; color: #555;">
        No products found for "<strong>${searchQuery}</strong>". Try a different search.
      </div>
    `;
  } else {
    filteredProducts.forEach((product) => {
      productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
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

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    });
  }

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    saveToStorage();
  }

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });

  updateCartQuantity();

  // Show active search query in search bar (18r bonus UX)
  if (searchQuery) {
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) searchBar.value = searchQuery;
  }
}

// 18p: Search button navigates to amazon.html?search=...
function setupSearch() {
  const searchButton = document.querySelector('.search-button');
  const searchBar = document.querySelector('.search-bar');

  function doSearch() {
    const query = searchBar.value.trim();
    window.location.href = `amazon.html?search=${encodeURIComponent(query)}`;
  }

  if (searchButton) {
    searchButton.addEventListener('click', doSearch);
  }

  // 18r bonus: pressing Enter also triggers search
  if (searchBar) {
    searchBar.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        doSearch();
      }
    });
  }
}

setupSearch();