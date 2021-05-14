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

// pseudo code

//dans la fonction removeItem, ajouter la supression totale de l'objet dans localstorage

// Ajouter des boutons pour augmenter/diminuer la quantité 
// (ils doivent incrémenter/décrémenter le contenu d'un span qui affiche la valeur sur la page et la valeur lié à la clé quantité dans l'objet)


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

