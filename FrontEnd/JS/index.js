//http://localhost:5678/api/works
// localhost:5678/api-docs/
// http://127.0.0.1:5500/FrontEnd/index.html

// appel à l'API en cliquant sur se connecter ; envoi de la saisie en paramètre
// stocker la réponse (token) grace à localStorage
// Vérifier ce qui est renvoyé grâce à un console log
// GET renvoie les paramètres dans l'URL et POST dans un objet spécifique
// Faire apparaitre les boutons modifier IF l'utilisateur est authentifié (=consulter localStorage pour voir si le token est présent)

// synthaxe ES6 avec les modules pour intégrer plusieurs fichiers

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
  const H2 = document.querySelector("#portfolio H2");
  const filtresDIV = document.createElement("div");
  filtresDIV.setAttribute("id", "filtres");
  H2.after(filtresDIV);

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
