import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

// import '../data/cart-class.js'

// import '../data/backend-practice.js'
// promise.all let us run multiple promises at the same time.

//async makes a function return a promise
// if we return something in async like return 'value2' it will become resolve('value2')
// so y do we use async because it lets us use await.
// await: let us wait for a promise to finish before going to the nect line.
// instead of using .then() we can just add  //await loadProductsFetch();// it wll wait for loadProductsFetch to finsih then 
// we can onlu use await when we are inside an await function.
// async await doesnot works with callbacks.

async function loadPage() {

    try{
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ]);

    } catch(error){
        console.log('unexpected eeeeerror.please try 100 times');
    }

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();
/*

Promise.all([
        loadProductsFetch(), //here fetch return the products from backend so we get the products array

        new Promise((resolve)=>{ // then what is this create a new promise-->loadthecart-->resolve to tell that promise is finished. so why not fetch here?
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
*/

// we can also give resolve a value;







// loadProducts(()=>{
//     loadCart(()=>{
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//     });
    
// });



// loadCartFetch();


