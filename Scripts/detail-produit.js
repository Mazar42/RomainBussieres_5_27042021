//acquire HTML elements

let productDisplay = document.getElementById("product-display")


//acquire current page URL

let currentUrl = window.location.href

//extract product ID from current page's URL and display accordingly

const extractAndDisplay = () => {
    let cutUrl = currentUrl.split("=")
    let currentProductId = cutUrl[1]
    

    // request product from API
    const fetchCameras = async() => {
            await fetch (`http://localhost:3000/api/cameras/${currentProductId}`)
            .then(res => res.json()).then(currentProduct => 
                {

                    productDisplay.innerHTML += `
                    <div class="row">
                            <div class="col-lg-1"></div>
                            <div class="col-lg-10">
                                <h1 id="camera-name">${currentProduct.name}</h1>
                            </div>
                            <div class="col-lg-1"></div>
                        </div>
                    <div class="row product-detail">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-6 product-detail-img" >
                            <img src="${currentProduct.imageUrl}" alt="appareil vintage"></a>
                        </div>
                        <div class="col-lg-4">
                            <div class="container product-options"></div>
                                <div class="row lense-selection">
                                    <div class="col-lg-3"></div>
                                    <div class="col-lg-9">
                                        <p >Choix de l'objectif :</p>
                                        <div class="dropdown">
                                        <button class="lenses-dropdown" id="toggle-button">Sélectionnez un objectif</button>
                                            <ul class="dropdown-child" id="lense-choice">
                                            </ul>
                                        </div>
                                
                                    </div>
                                </div> 
                        </div>
                        <div class="col-lg-1"></div>
                    </div>    
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-10"><p>${currentProduct.description}</p> </div>
                        <div class="col-lg-1"></div>
                    </div> 
                    <div class="row" id="price-cart">
                        
                    </div>`

                    // Inject relevant options according to current product

                    let lenseChoice = document.getElementById("lense-choice")



                    for (let lense of currentProduct.lenses)
                    if (lense !== undefined){
                        lenseChoice.innerHTML += `<li> ${lense} </li>`
                    }


                            //Call lenses menu

                        let toggleButton = document.getElementById('toggle-button')

                        toggleButton.addEventListener('click', show);

                        function show(){
                            lenseChoice.classList.toggle("active")
                        }

                

                    // Convert and inject price unit

                    let priceCart = document.getElementById("price-cart")

                    let priceInEuros = currentProduct.price / 100

                    priceCart.innerHTML += `
                    <div class="col-lg-1"></div>
                    <div class="col-lg-2"><p><strong>${priceInEuros}€</strong></p></div>
                    <div class="col-lg-1"></div>  
                    `


                    // ----Fill cart----

                    //create click event listener for add-to-cart button
                    
                    const addToCartBtn = document.getElementById("add-to-cart");

                    const manageCart = () => {
                        // créer un objet product
                        let product = { id: currentProduct._id, image: currentProduct.imageUrl, name: currentProduct.name, price: currentProduct.price / 100, quantity: 1 }
    
                        // recupération du tableau de produits dans le localstorage 
                        const productsArray = JSON.parse(localStorage.getItem('cart') || "[]");
    
                          const found = productsArray.find((element) => element.id === product.id);
                          // found ? found.quantity++ : productsArray.push(product)
                          if(found) {
                            found.quantity++;
                          } else {
                            productsArray.push(product)
                          }
                          localStorage.setItem('cart', JSON.stringify(productsArray));
                          alert("Ce produit a été ajouté dans votre panier")
                    }
    

                    addToCartBtn.addEventListener("click", manageCart);

                    
                })
                

                // inject relevant HTML according to current product

                

                        

                        // document.getElementById("add-to-cart").addEventListener("click", manageCart);

                        // function manageCart(){

                        //     localStorage.setItem("added-product-name", currentProduct.name);
                        //     localStorage.setItem("added-product-price", priceInEuros);

                        // }

                        // function manageCart(){

                        //     //gets products already in storage

                        //     // const getData = () => {
                        //     //     let firstAddedProductName = localStorage.getItem("added-product-name");
                        //     //     let firstAddedProductPrice = localStorage.getItem("added-product-price");
                        //     // }

                        //     // getData();

                        //     let addedProductQuantity = 1;

                        //     if ((firstAddedProductName === undefined) && (firstAddedProductPrice === undefined)){

                        //         localStorage.setItem("added-product-name", currentProduct.name);
                        //         localStorage.setItem("added-product-price", priceInEuros);
                        //         localStorage.setItem("added-product-quantity", addedProductQuantity);

                        //     }

                        //     else{
                        //         addedProductQuantity++;
                        //     }

                        
            
                        // };

                    

                    

                    
                

        

    }

    fetchCameras()

}
extractAndDisplay();





