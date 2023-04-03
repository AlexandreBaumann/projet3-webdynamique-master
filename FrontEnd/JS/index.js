//http://localhost:5678/api/works
// localhost:5678/api-docs/
// http://127.0.0.1:5500/FrontEnd/index.html


var data_Api;
var filteredData;

// Fonction de récupération des données de l'API
// Fonction de récupération des données de l'API
// Fonction de récupération des données de l'API

async function fetchData(url) {
  const response = await fetch(url);
  data_Api = await response.json();
}

// Affichage des données (filtrées ou non)
// Affichage des données (filtrées ou non)
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
// Affichage des filtres
// Affichage des filtres
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
// Filtrage des données récupérées par l'API
// Filtrage des données récupérées par l'API
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
  const introduction = document.querySelector('#introduction');
  introduction.innerHTML = 
                          `<section id="introduction">
                            <figure>
                              <img src="./assets/images/sophie-bluel.png" alt="">
                              <figcaption> <i class="fa-regular fa-pen-to-square" ></i><p> Modifier </p> </figcaption>
                            </figure>
                            <article>
                              <div> <i class="fa-regular fa-pen-to-square" ></i><p> Modifier </p> </div>
                              <h2>Designer d'espace</h2>
                              <p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p>
                              <p>Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p>
                              <p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>
                            </article>
                          </section>`

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
} //  ! appel de la fonction en début de fichier
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
                          <form action="http://localhost:5678/api/works/" enctype="multipart/form-data" method="post" id= "ajoutItem">
                            <label for="ajoutImage" id="modale2fichier">
                                <i class="fa-solid fa-image"></i>
                                <button type = "button">+ Ajouter Photo</button>
                                <p> jpg, png: 4mo max </p>
                              <input type = "file" accept="image/png, image/jpeg" id="ajoutImage">
                              <div id="image-preview" style="display: none;">
                                <img id="preview-img" src="" alt="Image miniature"/>
                              </div>
                            </label>
                            <div class="modale2champs">
                              <label for="titre">Titre</label>
                              <input type="texte" id="titre" name="Titre">
                            </div>
                            <div class="modale2champs">
                              <label for="categorySelect">Catégorie</label>
                              <select name="Categorie" id="categorySelect">
                                <option value=""> -- Choisissez la catégorie -- </option>
                                <option value="1">Objet</option>
                                <option value="2">Appartements</option>
                                <option value="3">Hôtels et restaurants</option>
                              </select>
                            </div>
                            <div id="separation"></div>
                            <button type="button" disabled="true" id= "validerModale2" value = "valider">Valider</button>
                          </form>
                        </div>
                      </div>
                      `;
    body.appendChild(modale);
    modaleGalerie ();
    eventModale ();
}

// ------------------- Gallerie -----------------------------
// ------------------- Gallerie -----------------------------
// ------------------- Gallerie -----------------------------
// ------------------- Gallerie -----------------------------
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
// ------------------- Gestion d'évenements -----------------------------
// ------------------- Gestion d'évenements -----------------------------
// ------------------- Gestion d'évenements -----------------------------
// ------------------- Gestion d'évenements -----------------------------

function eventModale () {
var modale = document.getElementById('modale');
var modaleDisplayStyle = window.getComputedStyle(modale).display;
var modale1 = document.getElementById('modale1');
var modale1DisplayStyle = window.getComputedStyle(modale1).display;
var modale2 = document.getElementById('modale2');
var modale2DisplayStyle = window.getComputedStyle(modale2).display;

    document.getElementById("modale").addEventListener("click", (event) => {
      if (event.target === event.currentTarget) { //event.target = élément DOM sur lequel l'événement a été déclenché (=cliqué); event.currentTarget = l'élément sur lequel le gestionnaire d'événements a été attaché (dans ce cas, #modale)
        closeModale();
      }
    });
    document.getElementById("fermerModale1").addEventListener("click", closeModale);
    document.getElementById("ajoutModale1").addEventListener("click", modaleDisplay2);
    document.getElementById("fermerModale2").addEventListener("click", closeModale);
    document.getElementById("retourModale").addEventListener("click", retourModale1);

    document.getElementById('ajoutImage').addEventListener('change', validateForm);
    document.getElementById('titre').addEventListener('input', validateForm);
    document.getElementById('categorySelect').addEventListener('change', validateForm);
    ajoutImage ()
  }

// ------------------- Evenements -----------------------------
// ------------------- Evenements -----------------------------
// ------------------- Evenements -----------------------------
// ------------------- Evenements -----------------------------

function closeModale (){
  document.querySelector('#modale').remove()
}
function retourModale1() {
  document.getElementById("modale2").style.display = "none";
  document.getElementById("modale1").style.display = "flex";
}

function modaleDisplay2 () {
  document.getElementById("modale1").style.display = "none";
  document.getElementById("modale2").style.display = "flex"
}

function ajoutImage () {
  const ajoutImage = document.getElementById('ajoutImage');
  const preview = document.getElementById('preview-img');
  const valider = document.getElementById('validerModale2')

  ajoutImage.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
          preview.src = e.target.result;
          document.getElementById('image-preview').style.display = 'flex';
      };
      reader.readAsDataURL(file);
      const notLastChildren = document.querySelectorAll('#modale2fichier > *:not(:last-child)');
        notLastChildren.forEach(child => { child.style.display = 'none';  });
      ;
  });
  valider.addEventListener('click', function (event) {
    event.preventDefault();
    envoiImage();});
}

async function envoiImage() {
  const tokenData = localStorage.getItem("token");
  const titre = document.getElementById("titre").value;
  const categorie = document.getElementById("categorySelect").value;
  const newImage = document.getElementById("ajoutImage");

  // const highestId = Math.max(...data_Api.map((work) => work.id));
  // const newId = highestId + 1;


  const formData = new FormData();
  formData.append('title', titre);
  formData.append('categoryId', parseInt(categorie, 10));
  formData.append('image', newImage.files[0])
  
  const header = {
    // "Content-Type": "multipart/form-data",
    Authorization: "Bearer "+ tokenData
  }

  fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: header,
    body: formData,

  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      alert("Incorrect.");
    }
  })
  .catch(error => console.error("Erreur :", error));
}


// async function envoiImage() {
//   event.preventDefault()
//   const titre = document.getElementById("titre").value;
//   const categorie = document.getElementById("categorySelect").value;
//   const newImage = document.getElementById("modale2fichier").files[0];

//   await fetchData("http://localhost:5678/api/works/");
//   const highestId = Math.max(...data_Api.map((work) => work.id));
//   const newId = highestId + 1;

//   const formData = new FormData();
//   formData.append('id', newId);
//   formData.append('title', titre);
//   formData.append('imageUrl', newImage);
//   formData.append('categoryId', categorie);
//   formData.append('userId', 1);
//   // console.log(localStorage.getItem("token"))
//   // console.log("token")

//   fetch("http://localhost:5678/api/works/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: "Bearer " + token,
//       //     Authorization: "Bearer" + tokenData.access_token
//     },
//     body: formData,

//   })
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       alert("Incorrect.");
//     }
//   })
//   .catch(error => console.error("Erreur :", error));
// }


function validateForm() {
  var ajoutImage = document.getElementById('ajoutImage').files.length > 0;
  var titre = document.getElementById('titre').value.trim() !== '';
  var categorySelect = document.getElementById('categorySelect').value !== '';

  if (ajoutImage && titre && categorySelect) {
    document.getElementById('validerModale2').disabled = false;
  }
}
 

// ajouter le token d'autorisation

//  Si marche pas : convertir l'image en blob => ajouter application json

// ajouter un message d'erreur à la place de l'alerte sur l'erreur de login ; 


// quand on rajoute une photo, elle se met en dernier (rajouter dernier élément au cache ou recharger le tableau)
// En créer une et tester la fonction suppression
 