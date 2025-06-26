// Ciblage des éléments du DOM
const loginBtn = document.querySelector(".loginbtn");
const email = document.querySelector("#email");
console.log(email);
const motPasse = document.querySelector("#password");
const form = document.querySelector("form");
console.log(form);
const messageErreur = document.querySelector(".message-erreur");

console.log(loginBtn);

// Fonction pour envoyer la requête POST à l'API
async function PostUser(user) {
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("eche de connexion");
  {
    return response.json();
  }
}

// Ajout de l'écouteur sur le formulaire
async function login() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userEmail = email.value;
    const userPassword = motPasse.value;
    try {
      const userData = await PostUser({
        email: userEmail,
        password: userPassword,
      });
      console.log(userData);

      if (userData && userData.token) {
        console.log(userData.token);
        window.localStorage.setItem("authantoken", userData.token);
        window.sessionStorage.setItem.loged = true;
        window.location.href = "./FrontEnd/index.html";
        console.log("vous etes connecté !");
      } else {
        console.log("Votre email ou votre mot de passe est incorrect !");
      }
    } catch (Error) {
      console.log("message Error:", Error.message);
      window.sessionStorage.setItem("logged", "false");
    }
  });
}
login();
