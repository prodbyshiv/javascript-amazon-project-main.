# JavaScript Amazon Clone

A responsive front-end e-commerce project inspired by Amazon, built using HTML, CSS, and Vanilla JavaScript.  
This project focuses on practicing real-world front-end development concepts such as modular JavaScript, DOM manipulation, cart management, local storage, and testing.

---

## Features

- Browse products on the storefront
- Add products to cart
- Update cart quantity dynamically
- Persistent cart using Local Storage
- Checkout page with:
  - Order summary
  - Delivery options
  - Payment summary
- Orders page with sample order history
- Tracking page UI
- Modular JavaScript architecture using ES Modules
- Responsive design for multiple screen sizes
- Jasmine testing setup

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Jasmine (Testing)

---

## Project Structure

```bash
javascript-amazon-project/
│
├── amazon.html              # Main storefront page
├── checkout.html            # Checkout page
├── orders.html              # Orders page
├── tracking.html            # Tracking page
│
├── scripts/                 # Application logic
├── styles/                  # Shared and page-specific CSS
├── data/                    # Product/cart data modules
├── images/                  # Product images and assets
├── backend/                 # Mock backend JSON data
│
├── tests/                   # Basic test pages
├── tests-jasmine/           # Jasmine test setup
│
└── README.md
```

---

## Getting Started

### Run Directly in Browser

1. Download or clone the project
2. Open `amazon.html`

Some browsers may block ES Modules when opened directly.

---

### Run Using Local Server (Recommended)

If Python is installed:

```bash
cd javascript-amazon-project-main
python3 -m http.server 8000
```

Open:

```bash
http://localhost:8000/amazon.html
```

---

## Pages

### Home Page (`amazon.html`)
- Displays products
- Add-to-cart functionality
- Cart quantity updates

### Checkout Page (`checkout.html`)
- Displays cart items
- Delivery options
- Payment summary

### Orders Page (`orders.html`)
- Shows sample previous orders

### Tracking Page (`tracking.html`)
- Displays sample package tracking UI

---

## Testing

Run the test pages in browser:

```bash
tests/tests.html
```

or

```bash
tests-jasmine/tests.html
```

The project includes sample Jasmine tests for:
- Cart functionality
- Local storage behavior
- Utility functions

---

## Concepts Practiced

- DOM Manipulation
- JavaScript Modules
- Event Handling
- MVC-style separation
- Local Storage
- Async JavaScript basics
- Testing with Jasmine
- Responsive UI Design

---

## Notes

- This is a front-end only project.
- No real payment gateway or backend is connected.
- Product and cart data are managed locally.

---

## Future Improvements

- Backend integration
- User authentication
- Real database support
- Search functionality
- Product filtering and sorting
- Mobile navigation menu
- Stripe/Razorpay integration

---

## License

This project is made for learning and practice purposes only.