export const orders =JSON.parse( localStorage.getItem('orders')) || [];

export function addOrders(order) {
    orders.unshift(order); //this will add order to the front of the array instead of back
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders',JSON.stringify(orders));
}