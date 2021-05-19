//          ***Cart***

// --display selected products in cart--

    //get array from localstorage
let cartTable = document.getElementById("cart")

let productsArray = JSON.parse(localStorage.getItem('cart'));

    // display cart according to array

if (productsArray){
    const displayCart = () => {
        for (cartProduct of productsArray){
            let productName = cartProduct.name;
            let productQuantity = cartProduct.quantity;
            let productPrice = cartProduct.price
            const addLignInCart = () => {
                var row = cartTable.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML += `${productName}`;
                cell2.innerHTML += `<input type="number" value="${productQuantity}" min="0" pattern="[0-9]" class="cart-quantity">`;
                cell3.innerHTML += `${productPrice}€`;
                cell4.innerHTML += `<button class="btn btn-danger" type="button">Supprimer</button>`;
              }
            addLignInCart();
            
        }
    }
    displayCart();
}
else{
    const displayEmptyCart = () =>{
        var row = cartTable.insertRow(1);
        var cell = row.insertCell(0);
        cell.innerHTML += `VOTRE PANIER EST VIDE`;
    }
    displayEmptyCart();
}

// display total

let cartTotal = 0;
let displayCartTotal = document.getElementById('cart-total-price');

for (cartProduct of productsArray){
    cartTotal += cartProduct.price * cartProduct.quantity;
}

displayCartTotal.innerHTML += `${cartTotal}€`

//  -- Modify Cart --

// Delete products

// get remove buttons
let removeFromCartButton = document.getElementsByClassName("btn-danger");

// make remove buttons remove a row

for (button of removeFromCartButton){
    button.addEventListener("click", removeItem)       
}

function removeItem(event){

    // create variable to name clicked target
    let clickedButton = event.target;
    // create variable to name the clicked product according to clicked target
    let targetedProductName = clickedButton.parentElement.parentElement.children[0].textContent;
    // extract the product that has the targeted name from array
    const found = productsArray.find(element => element.name === targetedProductName);
    // extract the targeted product's id
    let targetedProductId = found.id;
    console.log(targetedProductId);
    // delete said product from array
    productsArray = productsArray.filter((elem) => elem.id !== targetedProductId);
    console.log(productsArray);
    // set updated array in localstorage
    localStorage.setItem('cart', JSON.stringify(productsArray));
    // reload page to make changes appear
    location.reload();
}

//          ***Form***

//store data according to user input

// create contact object

