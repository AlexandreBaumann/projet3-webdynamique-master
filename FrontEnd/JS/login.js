// appel à l'API en cliquant sur se connecter ; envoi de la saisie en paramètre
// stocker la réponse (token) grace à localStorage
// Vérifier ce qui est renvoyé grâce à un console log
// GET renvoie les paramètres dans l'URL et POST dans un objet spécifique

// Faire apparaitre les boutons modifier IF l'utilisateur est authentifié 
//(=consulter localStorage pour voir si le token est présent)

// synthaxe ES6 avec les modules pour intégrer plusieurs fichiers


formulaire = document.getElementById("formulaire")
email = document.getElementById("email")
mdp = document.getElementById("mdp")
document.getElementById("login").addEventListener("click", login);

// Créer un gestionnaire d'événement onclick
function login() {
    const username = document.getElementById("email").value;
    const password = document.getElementById("mdp").value;
    preventDefault()
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: username,
        password: password,
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
      }
    })
    .then (data => {
      const token = data.token; // Récupère le token dans la propriété "token" de l'objet "data"
      localStorage.setItem("token", token);
      window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";

    })
    .catch(error => console.error("Erreur :", error));
  }
  // console.log(localStorage.getItem("token"))
 