//http://localhost:5678/api/works
// localhost:5678/api-docs/
// http://127.0.0.1:5500/FrontEnd/index.html
function main () {
    // utiliser la méthode fetch pour récupérer les informations tu back
    // stock les infos du back dans une variable de type tableau
    // boucler sur le tableau
    // dans chaque itération du tableau, créer en JS un élément html qui aura le contenu de la ligne du tableau
    // injecter cet element html au contenu de la page
}
//________________________________________________

// function main () {
//     fetch("http://localhost:5678/api/works")
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(error => alert("Erreur : " + error));
// }

// let donnees =( main ())
// console.log(donnees);

//________________________________________________


// api url

const api_url = "http://localhost:5678/api/works";


function createCard (object) {
    const gallery = document.getElementsByClassName('gallery')
    const card = document.createElement('figure')
    card.classname = 'card'
    const image = document.createElement('img')
    const figcaption = document.createElement('figcaption')

    gallery.card;
    card.append(image);
    image.src= object.imageUrl;
    card.append (figcaption);
    figcaption.innerText = object.title;
}

async function getapi(url) {
    const response = await fetch(url);
    const data = await response.json();
    data.forEach (element => createCard(element));
}

const donnees = [getapi(api_url)];


// console.log (donnnees[1]) erreur "donnees is undefined"
// console.log(donnees.length);

// function extraction (object) {
//     for (let item in object)
//     console.log (item.title)
// }
// extraction (donnees)
