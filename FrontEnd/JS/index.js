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
  logged();
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

function logoutMenu() {
  document.querySelector("header ul li:nth-child(3)").innerHTML = "logout";
  document.querySelector("header ul li:nth-child(3)").addEventListener("click", function() {
    localStorage.removeItem("token");
    window.location.reload();
  });
}

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
  document.getElementById("divModif").addEventListener("click", modaleDisplay);
}

/* ---------------------------- Modale ---------------------------*/
/* ---------------------------- Modale ---------------------------*/
/* ---------------------------- Modale ---------------------------*/
function logged() {
  const token = localStorage.getItem("token");
  if (token) {
    barTop();
    iconDisplay();
    logoutMenu() ;
  }
} // !!! appel de la fonction en début de fichier !!!
// test de token : console.log(localStorage.getItem("token"))


function modaleItems(data) {
  data.forEach((element) => {
    document.querySelector('#galerieModale').innerHTML += `
    <figure id="modaleItem">
        <img src=${element.imageUrl}>
        <i class="fa-solid fa-trash-can" id="${element.id}"></i>
        <figcaption> Editer </figcaption>
    </figure>
    `;
  });
}

function modaleDisplay () {
  const body = document.querySelector('body');
  const modale = document.createElement('aside');
  modale.id = "modale"
  modale.innerHTML = `<div id="modaleContent">
                        <div id="modale1">
                          <button type = "button" id= "fermerModale1" value = "fermer">X</button>
                          <h3>Galerie Photo </h3>
                          <div id= "galerieModale">
                          </div>
                          <div id="boutonsModale1">
                            <button type = "button" id= "ajoutModale1" value = "ajout">Ajouter une photo</button>
                            <button type = "button" id= "suppGallerie" value = "suppGallerie">Supprimer la gallerie</button>                         
                          </div>
                        </div>
                        <div id="modale2" style="display: none;">
                          <div id="modaleTop">
                            <button type = "button" id= "retourModale" value = "retour"><i class="fa-solid fa-arrow-left"></i></button>
                            <button type = "button" id= "fermerModale2" value = "fermer">X</button>
                          </div>
                            <h3>Ajout Photo </h3>
                          <form id= "ajoutItem">
                            <label for="ajoutImage" id="modale2fichier">
                                <i class="fa-solid fa-image"></i>
                                <button type = "button">+ Ajouter Photo</button>
                                <p> jpg, png: 4mo max </p>
                              <input type = "file" accept="image/png, image/jpeg" id="ajoutImage">
                              <div id="image-preview" style="display: none;">
                                <img id="preview-img" src="" alt="Image miniature" style="max-width: 200px; max-height: 200px;"/>
                              </div>
                            </label>
                            <div class="modale2champs">
                              <label for="titre">Email</label>
                              <input type="texte" id="titre" name="Titre">
                            </div>
                            <div class="modale2champs">
                              <label for="categorySelect">Catégorie</label>
                              <select name="Categorie" id="categorySelect">
                                <option value="objet">Objet</option>
                                <option value="appartement">Appartements</option>
                                <option value="Hotel">Hôtels et restaurants</option>
                              </select>
                            </div>
                            <div id="separation"></div>
                            <button type="button"  id= "validerModale2" value = "valider">Valider</button>
                          </form>
                        </div>
                      </div>
                      `;
    body.appendChild(modale);
    modaleGalerie ();
    eventModale ();
}

// ------------------- Gallerie -----------------------------

async function modaleGalerie() {

  await fetchData("http://localhost:5678/api/works");
  modaleItems(data_Api)
  document.querySelectorAll("#modaleItem i").forEach(item => {
    item.addEventListener("click", (event) => {
      console.log(event.target.id) // remplacer par imgSupp(id)
      document.getElementById(event.target.id).parentNode.remove()
    });
  });

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

// ------------------- Gestion d'évenements -----------------------------

function eventModale () {
var modale = document.getElementById('modale');
var modaleDisplayStyle = window.getComputedStyle(modale).display;
var modale1 = document.getElementById('modale1');
var modale1DisplayStyle = window.getComputedStyle(modale1).display;
var modale2 = document.getElementById('modale2');
var modale2DisplayStyle = window.getComputedStyle(modale2).display;

  if (modaleDisplayStyle !== 'none') {
    document.getElementById("modale").addEventListener("click", (event) => {
      if (event.target === event.currentTarget) { //event.target = élément DOM sur lequel l'événement a été déclenché (=cliqué); event.currentTarget = l'élément sur lequel le gestionnaire d'événements a été attaché (dans ce cas, #modale)
        closeModale();
      }
    });
  }

  if (modale1DisplayStyle !== 'none') {
    document.getElementById("fermerModale1").addEventListener("click", closeModale);
    document.getElementById("ajoutModale1").addEventListener("click", modaleDisplay2);
  }
  if (modale2DisplayStyle !== 'none') {
    document.getElementById("fermerModale2").addEventListener("click", closeModale);
    document.getElementById("retourModale").addEventListener("click", retourModale1);
  }
}

// ------------------- Evenements -----------------------------

function closeModale (){
  document.querySelector('#modale').remove()
}
function retourModale1() {
  document.getElementById("modale2").style.display = "none";
  document.getElementById("modale1").style.display = "flex";
}


// ----------- Second écran de la modale ---------------------


function modaleDisplay2 () {
  document.getElementById("modale1").style.display = "none";
  document.getElementById("modale2").style.display = "flex"
  // document.getElementById("modale1").remove()
}



  // ajoutImage.addEventListener('change', function (event) {
  //   var input = event.target;
  //   if (input.files && input.files[0]) {
  //     var file = input.files[0];
  //     var acceptedTypes = ['image/png', 'image/jpeg'];
  //     if (!acceptedTypes.includes(file.type)) {
  //       alert('Veuillez sélectionner une image au format jpg ou png.');
  //     } else {
  //       var reader = new FileReader();
  //       reader.onload = function (e) {
  //         var previewImg = document.getElementById('preview-img');
  //         previewImg.src = e.target.result;
          
  //         var imagePreview = document.getElementById('image-preview');
  //         imagePreview.style.display = 'block';
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // });
;

// OK Display none sur le contenu de la modale
// ~ ajout de la fleche retour ne arriere
// Catégorie: champ select
// input type = "file"

// bouton valider gris et inactif (proriété disabled) tant que tous les champs ne sont pas remplis 
// quand on rajoute une photo, elle se met en dernier (rajouter dernier élément au cache ou recharger le tableau)
// En créer une et tester la fonction suppression

//vérifier la synchronicité des fonctions