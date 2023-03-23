//http://localhost:5678/api/works
// localhost:5678/api-docs/
// http://127.0.0.1:5500/FrontEnd/index.html


var data_Api;
var filteredData;

// Fonction de récupération des données de l'API

async function fetchData(url) {
  const response = await fetch(url);
  data_Api = await response.json();
}

// Affichage des données (filtrées ou non)

function displayData(data) {
  const galleryHTML = document.getElementsByClassName("gallery");
  galleryHTML[0].innerHTML = "";
  data.forEach((element) => {
    galleryHTML[0].innerHTML += `
        <figure>
            <img src=${element.imageUrl}>
            <figcaption>${element.title}</figcaption>
        </figure>
        `;
  });
}


// Affichage des filtres

function displayFiltres(filtres) {
  const gallery = document.querySelector("#portfolio .gallery");
  const filtresDIV = document.createElement("div");
  filtresDIV.setAttribute("id", "filtres");
  gallery.before(filtresDIV);

  let filtresHTML = "";
  for (let filtre of filtres) {
    filtresHTML += `<input type="button" id="${filtres.indexOf(filtre)}" value="${filtre}">`;
  }
  filtresDIV.innerHTML = filtresHTML;

  const boutons = document.querySelectorAll("#filtres input");
  boutons.forEach((bouton) =>
    bouton.addEventListener("click", () =>
      filterData(parseInt(bouton.id))
    ));
}
// Filtrage des données récupérées par l'API

function filterData(ID) {
  if (ID === 0) {
    filteredData = data_Api;
  }
  else {
    filteredData = data_Api.filter((data) => data.categoryId === ID);
  }
  displayData(filteredData);
}

// Fonction de synthèse

async function main() {
  const api_url = "http://localhost:5678/api/works";
  const filtres = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];
  await fetchData(api_url);
  displayData(data_Api);
  displayFiltres(filtres);
}

main();

/* Déroulé 
   1 - En premier, la fonction fetchData va récupérer le tableau de données de l'API.
       Le reste attend que le tableau soit apporté (await)
       
   2 - Une fois qu'il est obtenu, la gallerie est affichée par défaut grace à displayData.

   3 - displayFiltres affiche les filtres (Rq: les catégories devraient être extraites de l'API au lieu d'être énumérées)

   4 - Une fois affichés, un "eventListener" est appliqué à chaque bouton. Il faut transformer l'ID en nombre grâceà parseInt.
       Le clic appelle la fonction filterData et lui envoyer l'ID, transformé en nombre, comme paramètre.

   5 - Si le paramètre est 0, tout est affiché, sinon sont affichées les entrées dont la categoryId est égale au paramètre.   

*/

//changement dans le menu quand on est connecté
function logoutMenu () {
  document.querySelector("header ul li:nth-child(3)").innerHTML = "logout";
  document.querySelector("header ul li:nth-child(3)").addEventListener("click", localStorage.removeItem("token"))
}

//affichage de la barre supérieure quand on est connecté
function barTop() {
  const body = document.querySelector("body");
  const topBar = document.createElement('div');
  const html = document.querySelector('html');
  topBar.innerHTML = `<button type = "button" id="topButton">
                        <i class="fa-regular fa-pen-to-square"></i> 
                        <p id="mode" > Mode édition </p>
                      </button>
                      <p id="publication" > Publier les changements </p>
                      `;
  topBar.setAttribute("id", "barre_superieure");

  html.insertBefore(topBar, body);
}

//affichage de l'icône modifier' quand on est connecté
function iconDisplay() {
  const portfolio = document.querySelector('#portfolio');

  portfolio.innerHTML = `<div id=projetModif>
                            <h2 id="h2modif">Mes Projets</h2>
                            <button type=button id="divModif">
                              <i class="fa-regular fa-pen-to-square" ></i>
                              <p id="iconModif"> Modifier </p>
                            </button>
                          </div>
                          <div class="gallery">
                          </div>
                          `
  // document.querySelector("#filtres").style.display = 'none'; ne marche pas
  document.getElementById("divModif").addEventListener("click", modaleDisplay1);
  // eventlistener sur l'icone-texte modifier --------- OK
  // Appeler une fonction pour afficher la modale --------- OK
}

//affichage des éléments du back dans la modale
function modaleItems(data) {
  data.forEach((element) => {
    document.querySelector('#galerieModale').innerHTML += `
    <figure id="modaleItem">
        <img src=${element.imageUrl}>
        <i class="fa-solid fa-trash-can"></i>
        <figcaption> Editer </figcaption>
    </figure>
    `;
  });
}

async function modaleDisplay1() {
  const body = document.querySelector('body');
  const modale = document.createElement('aside');
  modale.id = "modale"
  modale.innerHTML = `<div id="modaleContent">
                        <button type = "button" id= "fermerModale" value = "fermer">X</button>
                        <h3>Galerie Photo </h3>
                        <div id= "galerieModale"></div>
                        <button type = "button" id= "ajoutModale" value = "ajout">Ajouter une photo</button>
                        <button type = "button" id= "suppModale" value = "suppGalerie">Supprimer la gallerie</button>                         
                      </div>`;
  body.appendChild(modale)
  const api_url = "http://localhost:5678/api/works";
  await fetchData(api_url);
  modaleItems(data_Api)
  // document.getElementById("fermerModale").addEventListener("click", imgSupp()); 

  // OK récupérer le tableau généré plus tôt ou en regénérer par fetch
  // OK générer l'affichage
  // ~ gestionnaire d'événement sur supprimer => fonction passant en paramètre l'index et l'ID (fonction splice) ; distinguer suppression du tableau et du back

}

async function imgSupp(id) {
  await fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur au niveau de l\'API');
    }
    return response.json();
  })
  .then(data => {
    console.log(`Element ${id} a été supprimé`);
  })
  .catch(error => {
    console.error('Il y a eu un problème dans la suppression:', error);
  });
}
// console.log(localStorage.getItem("token"))



function logged() {
  const token = localStorage.getItem("token");
  if (token) {
    barTop();
    iconDisplay();
    logoutMenu() ;
  }
}
window.addEventListener('load', logged);