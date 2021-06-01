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
            let productId = cartProduct.id;
            let productName = cartProduct.name;
            let productQuantity = cartProduct.quantity;
            // let productPrice = cartProduct.price
            //fetch price
            const fetchCameras = async() => {
                await fetch (`http://localhost:3000/api/cameras/${productId}`)
                .then(res => res.json()).then(currentProduct => {
                    console.log(currentProduct.price)
                    let productPrice = currentProduct.price / 100;
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
                        cell4.innerHTML += `<button class="btn btn-danger" type="button">Supprimer</button>`;
                    }
                    addRowInCart();
                })
            }
            fetchCameras();      
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
// do price times quantity and add results to get total
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

//          *** Confirm Cart and Form***

// --Form Validation--
//get form
let myForm = document.querySelector('form');
//check form inputs
    // check first name 
    // listen to first name change
form.fname.addEventListener('change', function (){
    validFirstName (this)
});

const validFirstName = function (inputFirstName) {
    //create first name checking RegEx
    let firstNameRegEx = new RegExp(
        '^[a-zA-Z- ]+$', 'g'
    );
    
    testFirstName = firstNameRegEx.test(inputFirstName.value);
    
    if(testFirstName){
        return true
    }
    else{
        return false
    }
    
}

//check last name
// listen to last name change
form.lname.addEventListener('change', function () {
    validLastName (this)
});

const validLastName = function (inputLastName) {
    // create last name checking RegEx
    let lastNameRegEx = new RegExp(
        '^[a-zA-Z- ]+$', 'g'
    );

    testLastName = lastNameRegEx.test(inputLastName.value);

    if(testLastName){
        return true
    }
    else{
        return false
    }

};

//check email
    //listen to email change
form.email.addEventListener('change', function(){
     validEmail (this)
 });

const validEmail = function (inputEmail) {
    // create email checking RegEx
    let emailRegEx = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.][a-z]{2,10}$',
        'g'
    );

    testEmail = emailRegEx.test(inputEmail.value);
    let small = document.getElementById('emailHelp')
    if (testEmail) {
        small.innerHTML = "Adresse Valide";
        small.classList.add('text-success');
        small.classList.remove('text-danger');
        return true
    } else {
        small.innerHTML = 'Adresse Non Valide';
        small.classList.add('text-danger');
        small.classList.remove('text-success');
        return false
    }
 };

// check address
 //listen to address change
form.postaddress.addEventListener('change', function(){
     validPostAddress (this)
});

const validPostAddress = function (inputPostAddress){
    let postAddressRegEx = new RegExp(
         '^[0-9a-t-,]{1,9}[a-zA-Z0-9- ]+$', 'g'
    )

    testPostAddress = postAddressRegEx.test(inputPostAddress.value);

    if(testPostAddress){
        return true
    }
    else{
        return false
    }

};

// check address
 //listen to address change

form.city.addEventListener('change', function(){
    validCity (this)
});

const validCity = function (inputCity){
    let cityRegEx = new RegExp(
        '^[a-zA-Z- ]+$', 'g'
    )

    testCity = cityRegEx.test(inputCity.value);

    if(testCity){
        return true
    }
    else{
        return false
    }

};

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(validFirstName(form.fname) && validLastName(form.lname) && validEmail(form.email) && validPostAddress(form.postaddress) && validCity(form.city)){
        sendData();
    }
    else{
        alert("Assurez-vous que tous les champs sont correctement remplis avant de poursuivre.")
    }
})


// create form object
    
    //declare an object to hold the form data
let formInfo ={}
    //extract data from page and fill object
const sendData = async () =>{

    //extract id from each element in productsArray
    const productsIdArray = productsArray.map(product => product.id)
    
    console.log(productsIdArray);

    //extract data
    let name = document.getElementById('fname').value;
    let surname = document.getElementById('lname').value;
    let postAddress = document.getElementById('postaddress').value;
    let cityName = document.getElementById('city').value;
    let eMail = document.getElementById('email').value;
    //fill object
    formInfo = {firstName: name, lastName: surname, address: postAddress, city: cityName, email: eMail};
    //regroup both the order array and the form object in one array to be sent
    dataToSend = {products: productsIdArray, contact: formInfo}
    console.log(dataToSend);
    //send data
    fetch('http://localhost:3000/api/cameras/order', {
        method: 'post',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let currentOrder = JSON.stringify(data.orderId)
        localStorage.setItem('Order', currentOrder)
        window.location.href = './confirmation-d-achat.html';
    })
    .catch(error => console.error(error));
    
}