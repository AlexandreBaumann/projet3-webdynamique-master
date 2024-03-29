
document.getElementById("formulaire").addEventListener("submit", login);

function login(event) {
  event.preventDefault()
    const username = document.getElementById("email").value;
    const password = document.getElementById("mdp").value;
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
        const errorMessage = `<p class="errorMessage">Erreur dans l’identifiant ou le mot de passe </p>`;
        document.getElementById("erreur").innerHTML = errorMessage;
      }
    })
    .then (data => {
      const token = data.token; // Récupère le token dans la propriété "token" de l'objet "data"
      localStorage.setItem("token", token);
      window.location.href = "/FrontEnd/index.html";
    })
    .catch(error => console.error("Erreur :", error));
  }
 