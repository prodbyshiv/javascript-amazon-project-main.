export let cart;

loadFromStorage();

 export function loadFromStorage(params) {
  cart = JSON.parse(localStorage.getItem('cart'));


  if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}
}

 export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'

    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOption){
      let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      matchingItem.deliveryOptionId = deliveryOption;


      saveToStorage();
}

// export function loadCart(fun) {
//  const xhr = new XMLHttpRequest(); // generate a new req object

//   xhr.addEventListener('load',()=>{
    
//     console.log(xhr.response);
//     // Save the fetched cart to localStorage so it persists across sessions
//     try {
//       const fetchedCart = JSON.parse(xhr.response);
//       if (Array.isArray(fetchedCart) && fetchedCart.length > 0) {
//         cart = fetchedCart;
//         saveToStorage();
//       }
//     } catch(error) {
//       console.log('Could not parse cart from backend');
//     }
//     fun();
      
//   })

//  xhr.open('GET','https://supersimplebackend.dev/cart');
//  xhr.send();

 
// }


export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}
