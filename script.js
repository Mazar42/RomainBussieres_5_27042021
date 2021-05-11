let cameras;
let productsHTML = document.getElementById("products");


//API request
const fetchCameras = async() => {
    cameras = await fetch ('http://localhost:3000/api/cameras').then(res => res.json())

    for(const camera of cameras) {
        console.log(camera);
        productsHTML.innerHTML += `
        <div class="row product">
                                <div class="col-lg-4 product-img">
                                    <img src="${camera.imageUrl}" alt="appareil vintage">
                                </div>
                                <div class="col-lg-8">
                                    <h3>${camera.name}</h3>
                                    <p>${camera.description}</p>
                                    <div class="button"><a href="./pages/detail-produit.html?id=${camera._id}" class="btn btn-dark">Détails du produit</a></div>
                                </div>          
                            </div>
        `
    }
}

fetchCameras()