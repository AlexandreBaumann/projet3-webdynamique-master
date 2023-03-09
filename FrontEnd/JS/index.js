//http://localhost:5678/api/works
// localhost:5678/api-docs/
// http://127.0.0.1:5500/FrontEnd/index.html

// Bouton = gestionnaire d'événement (clic) => appel de fonction (accède à data_api)
// => filtrage du tableau (filter)
// Renvoyer le tableau filtré à la fonction displayData

var data_Api ; 

function displayFiltres(filtres) {
    const H2 = document.querySelector('#portfolio H2');
    const filtresDIV = document.createElement("div");
    filtresDIV.setAttribute("id", "filtres")
    H2.after(filtresDIV);
  
    let filtresHTML = "";
    for (let filtre of filtres) {
      filtresHTML += `<input type="button" id="${filtre}" value="${filtre}">`;
    }
    filtresDIV.innerHTML = filtresHTML;
  }

  function filterData(event) {
    const buttonId = event.target.id;
    console.log(`Button clicked: ${buttonId}`);
  }
  
  const tousButton = document.getElementById("Tous");
  const objetsButton = document.getElementById("Objets");
  const appartementsButton = document.getElementById("Appartements");
  const hotelsButton = document.getElementById("Hôtels & restaurants");
  
  tousButton.addEventListener("click", handleClick);
  objetsButton.addEventListener("click", handleClick);
  appartementsButton.addEventListener("click", handleClick);
  hotelsButton.addEventListener("click", handleClick);
  

// const boutons = document.querySelector('#filtres input');
// boutons.addEventListener("click", filterData)



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
    const filtres = ['Tous','Objets','Appartements','Hôtels & restaurants'];
    await fetchData(api_url);
    await displayFiltres (filtres) ;
}


main()





// interpolation
 