

export let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Local copyexport let cart = [];

export function addToCart(productId, quantity) {
    quantity = Number(quantity);  // Convert string to number
    // ... rest of codeexport function addToCart(productId,quantity){
    
    
    let matchingItem;
    cart.forEach((cartItem)=>{

        

        if (productId===cartItem.productId) {
        matchingItem = cartItem;
    }
    });

    if (matchingItem) {
        matchingItem.quantity += quantity;
    }
    else{
        cart.push({
        productId:productId,
        quantity: quantity,
        deliveryOptionId: '1'
    });
    }
    
    
}

export function cartQuantity(){
    let cartQ = 0;
    cart.forEach((cartItem)=>{
        cartQ += +cartItem.quantity;
    })
    return cartQ;
}

export function removeFromCart(productId){
    let newCart  = [];
    cart.forEach((cartItem)=>{
        if (productId !== cartItem.productId) {  // Fixed: was cartItem.id
            newCart.push(cartItem);
        }
        
    });
    cart = newCart;  // Fixed: Actually update the cart

    
        localStorage.setItem('cart', JSON.stringify(cart));
    
      // Save to localStorage
    console.log(newCart);
    
}