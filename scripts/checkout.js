import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// import '../data/cart-class.js'

// import '../data/backend-practice.js'
// promise.all let us run multiple promises at the same time.
   
async function loadPage() {
    console.log('load pahge');
}

loadPage().then(()=>{
    console.log('next step');
    
})

Promise.all([
        loadProductsFetch(),

        new Promise((resolve)=>{
            loadCart(()=>{
                resolve('values2');
            });
        })

    ]).then((values)=>{
        // resolve ko jo parameter dete hai usko then me access kar sakte hai
        console.log(values);
        
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });
    /*
    new Promise((resolve)=>{
        

        loadProducts(()=>{
            
            resolve('value1');
            
        });
        
    }).then((value)=>{
        console.log(value);
        
        return new Promise((resolve)=>{
            loadCart(()=>{
                resolve();
            });
        }); 

    }).then(()=>{
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });


// we can also give resolve a value;







// loadProducts(()=>{
//     loadCart(()=>{
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//     });
    
// });

*/




