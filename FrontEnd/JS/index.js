//http://localhost:5678/api/works
// localhost:5678/api-docs/
// http://127.0.0.1:5500/FrontEnd/index.html

var data_Api;
var filteredData;
const api_url = "http://localhost:5678/api/works";

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


// Affichage des filters
// Affichage des filters
// Affichage des filters
// Affichage des filters

function displayFilters(filters) {
  const gallery = document.querySelector("#portfolio .gallery");
  const filtersDIV = document.createElement("div");
  filtersDIV.setAttribute("id", "filters");
  gallery.before(filtersDIV);

  let filtersHTML = "";
  for (let filter of filters) {
    filtersHTML += `<input type="button" id="${filters.indexOf(filter)}" value="${filter}">`;
  }
  filtersDIV.innerHTML = filtersHTML;

  const buttons = document.querySelectorAll("#filters input");
  buttons.forEach((button) =>
    button.addEventListener("click", () =>
      filterData(parseInt(button.id))
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
  const filters = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];
  await fetchData(api_url);
  displayFilters(filters);
  isLogged();
  displayData(data_Api);
}



/* Déroulé 
   1 - En premier, la fonction fetchData va récupérer le tableau de données de l'API.
       Le reste attend que le tableau soit apporté (await)
   2 - Une fois qu'il est obtenu, la gallerie est affichée par défaut grace à displayData.
   3 - displayFilters affiche les filters (Rq: les catégories devraient être extraites de l'API au lieu d'être énumérées)
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
  topBar.setAttribute("id", "topBar");

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
  document.getElementById("divModif").addEventListener("click", displayModale);
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
function filterSupp () {
  const filters = document.querySelectorAll("#filters > *");
  filters.forEach((filter) => {
    filter.style.display = "none";
  });
  const galleryDiv = document.querySelector(".gallery")
  galleryDiv.style.marginTop = "60px";
}


/* ---------------------------- Modale ---------------------------*/
/* ---------------------------- Modale ---------------------------*/
/* ---------------------------- Modale ---------------------------*/
function isLogged() {
  const token = localStorage.getItem("token");
  if (token) {
    barTop();
    iconDisplay();
    logoutMenu() ;
    filterSupp ()
  }
} //  ! appel de la fonction en début de fichier
// test de token : console.log(localStorage.getItem("token"))


function displayModale () {
  const body = document.querySelector('body');
  const modale = document.createElement('aside');
  modale.id = "modale"
  modale.innerHTML = `<div id="modaleContent">
                        <div id="modale1">
                          <button type = "button" id= "closeModale1" value = "fermer">X</button>
                          <h3>Galerie Photo </h3>
                          <div id= "galleryModale">
                          </div>
                          <div id="boutonsModale1">
                            <button type = "button" id= "addModale1" value = "ajout">Ajouter une photo</button>
                            <button type = "button" id= "suppGallery" value = "suppGallery">Supprimer la gallerie</button>                         
                          </div>
                        </div>
                        <div id="modale2">
                          <div id="modaleTop">
                            <button type = "button" id= "backModale" value = "retour"><i class="fa-solid fa-arrow-left"></i></button>
                            <button type = "button" id= "closeModale2" value = "fermer">X</button>
                          </div>
                            <h3>Ajout Photo </h3>
                          <form id= "ajoutItem">
                            <label for="addImage" id="modale2file">
                                <i class="fa-solid fa-image"></i>
                                <button type = "button">+ Ajouter Photo</button>
                                <p> jpg, png: 4mo max </p>
                              <input type = "file" accept="image/png, image/jpeg" id="addImage">
                              <div id="image-preview">
                                <img id="preview-img" src="" alt="Image miniature"/>
                              </div>
                            </label>
                            <div class="modale2champs">
                              <label for="title">Titre</label>
                              <input type="texte" id="title" name="title">
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
                            <div id="addItemError" class="errorMessage"></div>
                            <button type="button" id= "validationModale2" value = "valider">Valider</button>
                          </form>
                        </div>
                      </div>
                      `;
    body.appendChild(modale);
    modaleGallery ();
    eventModale ();
}

// ------------------- Gallerie -----------------------------
// ------------------- Gallerie -----------------------------
// ------------------- Gallerie -----------------------------
// ------------------- Gallerie -----------------------------
// ------------------- Gallerie -----------------------------

function displayModaleItems(data) {
  data.forEach((element) => {
    document.querySelector('#galleryModale').innerHTML += `
    <figure id="modaleItem">
        <img src=${element.imageUrl}>
        <i class="fa-solid fa-trash-can" id="${element.id}"></i>
        <figcaption> Editer </figcaption>
    </figure>
    `;
  });
}

async function deleteItem(id) {
  const header = {
    Authorization: "Bearer "+ localStorage.getItem("token")
  }
  await fetch(`http://localhost:5678/api/works/${id}/`, {
    method: 'DELETE',
    headers: header,

  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur au niveau de l\'API');
    }
    return response.json();
  })
  .then(response => {
    console.log(`Element ${id} a été supprimé`);
  })
  .catch(error => {
    console.error('Il y a eu un problème dans la suppression:', error);
  });
}

async function modaleGallery() {

  await fetchData(api_url);
  displayModaleItems(data_Api)
  document.querySelectorAll("#modaleItem i").forEach(item => {
    item.addEventListener("click", async (event) => {
      event.preventDefault();
      await deleteItem(event.target.id); // Attend la fin de l'exécution de la fonction deleteItem avant de continuer
      var retrait = document.getElementById(event.target.id).parentNode.remove();
      retrait.preventDefault();
    });
  });
} 


// ------------------- Gestion d'évenements -----------------------------
// ------------------- Gestion d'évenements -----------------------------
// ------------------- Gestion d'évenements -----------------------------
// ------------------- Gestion d'évenements -----------------------------
// ------------------- Gestion d'évenements -----------------------------

function eventModale () {

    document.getElementById("modale").addEventListener("click", (event) => {
      if (event.target === event.currentTarget) { //event.target = élément DOM sur lequel l'événement a été déclenché (=cliqué); event.currentTarget = l'élément sur lequel le gestionnaire d'événements a été attaché (dans ce cas, #modale)
        closeModale();
      }
    });
    document.getElementById("closeModale1").addEventListener("click", closeModale);
    document.getElementById("addModale1").addEventListener("click", displayModale2);
    document.getElementById("closeModale2").addEventListener("click", closeModale);
    document.getElementById("backModale").addEventListener("click", returnToModale1);
    document.getElementById('addImage').addEventListener('change', validateForm);
    document.getElementById('title').addEventListener('input', validateForm);
    document.getElementById('categorySelect').addEventListener('change', validateForm);
    addImage ()
    clickableButton()
  }
  
  function clickableButton() {
    const addImageInput = document.getElementById("addImage");
    const addImageButton = document.querySelector("#modale2file button");
    addImageButton.addEventListener("click", function() {
      addImageInput.click();
    });
  }
// ------------------- Evenements -----------------------------
// ------------------- Evenements -----------------------------
// ------------------- Evenements -----------------------------
// ------------------- Evenements -----------------------------

function closeModale (){
  document.querySelector('#modale').remove()
}
function returnToModale1() {
  document.getElementById("modale2").style.display = "none";
  document.getElementById("modale1").style.display = "flex";
}

function displayModale2 () {
  document.getElementById("modale1").style.display = "none";
  document.getElementById("modale2").style.display = "flex"
}

function addImage () {
  const addImage = document.getElementById('addImage');
  const preview = document.getElementById('preview-img');
  const validate = document.getElementById('validationModale2')

  addImage.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
          preview.src = e.target.result;
          document.getElementById('image-preview').style.display = 'flex';
      };
      reader.readAsDataURL(file);
      const notLastChildren = document.querySelectorAll('#modale2file > *:not(:last-child)');
        notLastChildren.forEach(child => { child.style.display = 'none';  });
      ;
  });


  validate.addEventListener('click', function (event) {
    event.preventDefault();
    
    var addImage = document.getElementById('addImage').files.length > 0;
    var title = document.getElementById('title').value.trim() !== '';
    var categorySelect = document.getElementById('categorySelect').value !== '';
        if (addImage && title && categorySelect) {
          addNewItem();
        }
        if (!addImage || !title || !categorySelect) {
          document.getElementById('addItemError').innerHTML= `Veuillez renseigner tous les champs`
        }
  })
}

async function addNewItem() {
  const tokenData = localStorage.getItem("token");
  const title = document.getElementById("title").value;
  const categorie = document.getElementById("categorySelect").value;
  const newImage = document.getElementById("addImage");

  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', categorie);
  formData.append('image', newImage.files[0])
  
  const header = {
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
 

function validateForm() {
  var addImage = document.getElementById('addImage').files.length > 0;
  var title = document.getElementById('title').value.trim() !== '';
  var categorySelect = document.getElementById('categorySelect').value !== '';

  if (addImage && title && categorySelect) {
    document.getElementById('validationModale2').style.backgroundColor = "#1D6154";
  }
  if (!addImage || !title || !categorySelect) {
    document.getElementById('validationModale2').style.backgroundColor = "#A7A7A7";
  }
}
 
main();
 