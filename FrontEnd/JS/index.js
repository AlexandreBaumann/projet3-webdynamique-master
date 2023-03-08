//http://localhost:5678/api/works
// localhost:5678/api-docs/
// http://127.0.0.1:5500/FrontEnd/index.html

// Bouton = gestionnaire d'événement (clic) => appel de fonction (accède à data_api)
// => filtrage du tableau (filter)
// Renvoyer le tableau filtré à la fonction displayData

var data_Api ; 


function displayData (data) {

    const galleryHTML = document.getElementsByClassName('gallery')
    data.forEach (element => {
        const cardHTML = document.createElement('figure')
        const imageHTML = document.createElement('img')
        const figcaptionHTML = document.createElement('figcaption')
        imageHTML.src = element.imageUrl
        figcaptionHTML.textContent = element.title
        cardHTML.appendChild(imageHTML)
        cardHTML.appendChild(figcaptionHTML)
        galleryHTML[0].appendChild(cardHTML)
        // const cardHTML = '<figure><img src = ${element.imageUrl}></img><figcaption>${element.title}</figcaption></figure>'
        // galleryHTML[0].appendChild(cardHTML)  
    });
}


  
async function fetchData(url) {
    const response = await fetch(url);
    data_Api = await response.json();
    displayData(data_Api);
}

    
async function main  () {
    const api_url = "http://localhost:5678/api/works";
    await fetchData(api_url);
}


main()

// interpolation





// function createCard (object) {
//     const gallery = document.getElementsByClassName('gallery')
//     const card = document.createElement('figure')
//     card.classname = 'card'


//     gallery.card;
//     card.append(image);
//     image.src= object.imageUrl;
//     card.append (figcaption);
//     figcaption.innerText = object.title;
//     return card;
// }





// console.log (donnnees[1]) erreur "donnees is undefined"
// console.log(donnees.length);

// function extraction (object) {
//     for (let item in object)
//     console.log (item.title)
// }
// extraction (donnees)
