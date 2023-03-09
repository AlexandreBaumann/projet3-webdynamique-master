//http://localhost:5678/api/works
// localhost:5678/api-docs/
// http://127.0.0.1:5500/FrontEnd/index.html

// Bouton = gestionnaire d'événement (clic) => appel de fonction (accède à data_api)
// => filtrage du tableau (filter)
// Renvoyer le tableau filtré à la fonction displayData

var data_Api;
var filteredData;

// Affichage des filtres

function displayFiltres(filtres) {
  const H2 = document.querySelector("#portfolio H2");
  const filtresDIV = document.createElement("div");
  filtresDIV.setAttribute("id", "filtres");
  H2.after(filtresDIV);

  let filtresHTML = "";
  for (let filtre of filtres) {
    filtresHTML += `<input type="button" id="${filtres.indexOf(
      filtre
    )}" value="${filtre}">`;
  }
  filtresDIV.innerHTML = filtresHTML;

  const boutons = document.querySelectorAll("#filtres input");
  boutons.forEach((bouton) =>
    bouton.addEventListener("click", () =>
      filterData(parseInt(bouton.id))
    ));
}

// Affichage des données filtrées

function displayData(data) {
  const galleryHTML = document.getElementsByClassName("gallery");
  galleryHTML[0].innerHTML = "";
  data.forEach((element) => {
    const cardHTML = document.createElement("figure");
    const imageHTML = document.createElement("img");
    const figcaptionHTML = document.createElement("figcaption");
    imageHTML.src = element.imageUrl;
    figcaptionHTML.textContent = element.title;
    cardHTML.appendChild(imageHTML);
    cardHTML.appendChild(figcaptionHTML);
    galleryHTML[0].appendChild(cardHTML);
  });
}

// Filtrage des données récupérées par l'API

function filterData(categoryId) {
    if (categoryId == 0) {
        filteredData = data_Api; 
    }
    else {
        filteredData = data_Api.filter((data) => data.categoryId === categoryId);
    }
  displayData(filteredData);
}

// Fonction de récupération des données de l'API

async function fetchData(url) {
  const response = await fetch(url);
  data_Api = await response.json();
  displayData(data_Api);
}

// Fonction de synthèse

async function main() {
  const api_url = "http://localhost:5678/api/works";
  const filtres = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];
  await fetchData(api_url);
  displayFiltres(filtres);
  
}

main();

 /* Déroulé 
    1 - En premier, la fonction fetchData va récupérer la tableau de données de l'API.
        Le reste attend que le tableau soit apporté (await)
    2 - displayFiltres affiche les filtres (Rq: les catégories devraient être extraites de l'API au lieu d'être énumérées)
    3 - 

 */
