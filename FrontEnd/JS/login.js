formulaire = document.getElementById("formulaire")
email = document.getElementById("email")
mdp = document.getElementById("mdp")

function login() {
    const username = document.getElementById("email").value;
    const password = document.getElementById("mdp").value;
  
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "email",
        password: "mdp",
      })
    })
    .then(response => {
      if (response.ok) {
        // redirection vers une page après la connexion réussie
        window.location.href = "http://localhost:5678/home";
      } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
      }
    })
    .catch(error => console.error("Erreur :", error));
  }

// formulaire.addEventListener("submit", function(e) {
	 
//     var erreur;
 
//     var inputs = this.getElementsByTagName("input");
 
//     for (var i = 0; i < inputs.length; i++) {
//         console.log(inputs[i]);
//         if (!inputs[i].value) {
//             erreur = "Veuillez renseigner tous les champs";
//         }
//     }
 
//     if (erreur) {
//         e.preventDefault();
//         document.getElementById("erreur").innerHTML = erreur;
//         return false;
//     } else {
//         alert('Formulaire envoyé !');
//     }
// });