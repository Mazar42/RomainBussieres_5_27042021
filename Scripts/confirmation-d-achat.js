// display cart
let cartTable = document.getElementById("cart")

let productsArray = JSON.parse(localStorage.getItem('cart'));

if (productsArray){
    const displayCart = () => {
        for (cartProduct of productsArray){
            let productName = cartProduct.name;
            let productQuantity = cartProduct.quantity;
            let productPrice = cartProduct.price
            //create and fill rows in cart, according to selected products
            const addRowInCart = () => {
                var row = cartTable.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML += `${productName}`;
                cell2.innerHTML += `${productQuantity}`;
                cell3.innerHTML += `${productPrice}€`;
              }
            addRowInCart();    
        }
    }
    displayCart();
}

// display total
let cartTotal = 0;
let displayCartTotal = document.getElementById('cart-total-price');
// do price times quantity and add results to get total
for (cartProduct of productsArray){
    cartTotal += cartProduct.price * cartProduct.quantity;
}

displayCartTotal.innerHTML += `${cartTotal}€`

// display order Id on user end
let orderId = localStorage.getItem('Order');

let displayOrderId = document.getElementById("order");

displayOrderId.innerHTML += `${orderId}`;

//clear local storage

localStorage.removeItem('cart');
localStorage.removeItem('Order');