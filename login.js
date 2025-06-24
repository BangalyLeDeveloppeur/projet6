// Ciblage des éléments du DOM
const loginBtn = document.querySelector(".login");
const email = document.querySelector("#email");
const motPasse = document.querySelector("#password");
const form = document.querySelector("form");
const messageErreur = document.querySelector(".message-erreur");
console.log(email, motPasse);

// Création des options de la requête POST
const posUser = (userInfo) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userInfo),
});

// Fonction pour envoyer la requête POST à l'API
async function userPost(userInfo) {
  try {
    const response = await fetch(
      "http://localhost:5678/api/users/login",
      posUser(userInfo)
    );

    if (!response.ok) {
      return null; // Mauvais identifiants, renverra null
    }

    const data = await response.json();
    console.log("Réponse du serveur :", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return null;
  }
}

// Ajout de l'écouteur sur le formulaire
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userEmail = email.value;
  const userPassword = motPasse.value;
  console.log(userEmail);
  console.log(userPassword);

  const userData = await userPost({ email: userEmail, password: userPassword });

  if (userData) {
    localStorage.setItem("authToken", userData.token);
    sessionStorage.setItem("loged", "true");
    ///window.location.href = "./FrontEn/index.html";
  } else {
    // Affichage du message d'erreur
    email.classList.add("inputErrorLogin");
    motPasse.classList.add("inputErrorLogin");
    if (messageErreur) {
      messageErreur.textContent =
        "Votre email ou votre mot de passe est incorrect !";
    } else {
      alert("Identifiants incorrects !");
    }
  }
});
