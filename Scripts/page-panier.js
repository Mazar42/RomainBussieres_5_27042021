//          ***Cart***

// get remove buttons
let removeFromCartButton = document.getElementsByClassName("btn-danger")

// make remove buttons remove a row

for (button of removeFromCartButton){
    button.addEventListener("click", removeItem)       
}

function removeItem(event){
    let clickedButton = event.target
    clickedButton.parentElement.parentElement.remove()
}

// for (input of quantityInputs){
//     input.addEventListener('change', updateQuantity)
// }

// function updateQuantity(event){
//     let input = event.target
//     if (isNaN(input.value) || input.value <= 0){
//         input.value = 1
//     }
//     updateCartTotal()
// }


// make the cart values appear in real time

// const updateCartTotal = () => {
//     let cartItems = document.getElementsByClassName('table')[0]
//     let cartRows = cartItems.getElementsByClassName('cart-row')
//     let totalPrice = 0
//     for (cartRow of cartRows){
//         let priceElement = cartRow.getElementsByClassName("cart-price")[0]
//         let quantityElement = cartRow.getElementsByClassName("cart-quantity")[0]
//         console.log(priceElement, quantityElement);
//         let unitPrice = priceElement.innerText.split("€")[0]
//         console.log(unitPrice);
//         let quantity = quantityElement.value
//         totalPrice = totalPrice + (unitPrice * quantity)
//         console.log(totalPrice);
//     }
//     document.getElementById("cart-total-price").innerText = totalPrice + "€"


// }
// updateCartTotal();


//          ***Form****

//store data according to user input

function setData (){
    let firstName = document.getElementById("fname").value;
    localStorage.setItem("prenom", firstName);

    let lastName = document.getElementById("lname").value;
    localStorage.setItem("nom", lastName);

    let emailAdress = document.getElementById("email").value;
    localStorage.setItem("email", emailAdress);

    let postAdressFirstLine = document.getElementById("postaddress").value;
    localStorage.setItem("adresse", postAdressFirstLine);

    let postAdressSecondLine = document.getElementById("postaddress2").value;
    localStorage.setItem("adrese-suite", postAdressSecondLine);

    let zipCode = document.getElementById("zipcode").value;
    localStorage.setItem("zipcode", zipCode);

    let city = document.getElementById("city").value;
    localStorage.setItem("city", city);
};

//get data from storage (might be useful later on)

// const getData = () => {
//     let firstNameStorage = localStorage.getItem("prenom");
//     let lastNameStorage = localStorage.getItem("nom");
//     let emailStorage = localStorage.getItem("email");
//     let adressFirstLineStorage = localStorage.getItem("adresse");
//     let adressSecondLineStorage = localStorage.getItem("adresse-suite");
//     let zipCodeStorage = localStorage.getItem("zipcode");
//     let cityStorage = localStorage.getItem("city");

// }



// getData();

