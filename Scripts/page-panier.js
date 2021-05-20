//          ***Cart***

// --display selected products in cart--

    //declare what to send eventually
    let dataToSend ={}

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
                cell2.innerHTML += `${productQuantity}`;
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

// --Confirm Cart--

//create order array
let confirmCart = document.getElementById("send-data");
let orderArray = [];
// create an object to count occurences of the same id
let amountOfSameProduct = {};
let orderId

const createOrderArray = () =>{
        // push the id of any element of productsArray to orderArray
        const pushId = () => {
        for (cartProduct of productsArray){
            if ((orderId === undefined) || (amountOfSameProduct[orderId] < cartProduct.quantity))
            orderArray.push(cartProduct.id);  
            }

        // keep track of how many of each id has been pushed

        for (orderId of orderArray){
            if (amountOfSameProduct[orderId] === undefined ){
                amountOfSameProduct[orderId] = 1
            }else{
                amountOfSameProduct[orderId]++;
                }
        }
        }
        pushId();
        
        // check if quantity matches occurences in orderArry, if not pushId again. 
        for (cartProduct of productsArray){
            if (amountOfSameProduct[orderId] < cartProduct.quantity){
                pushId();
            }
        }
        
}

confirmCart.addEventListener('click', createOrderArray)


//          ***Form***


// create form object

    //get form
let myForm = document.getElementById('form');
    //declare an object to hold the form data
let formInfo ={}
    //extract data from form and fill object
const sendData = async (e) =>{
    e.preventDefault();
    //extract data
    let name = document.getElementById('fname').value;
    let surname = document.getElementById('lname').value;
    let postAddress = document.getElementById('postaddress').value;
    let cityName = document.getElementById('city').value;
    let eMail = document.getElementById('email').value;
    //fill object
    formInfo = {firstName: name, lastName: surname, address: postAddress, city: cityName, email: eMail};
    //finally regroup both the order array and the form object in one array to be sent
    dataToSend = {productArray : orderArray, contactObject: formInfo}
    console.log(dataToSend);
    //send data
    try {
        const response = 
        fetch('http://localhost:3000/api/cameras/order', {
        method:'post',
        body: JSON.stringify(dataToSend),
        headers : {
            'Content-Type' : 'application/json'
        }
    });
    } catch (e) {
        console.error(e);
        alert ("une erreur s'est produite")
    }
    
}

myForm.addEventListener('submit', sendData)
