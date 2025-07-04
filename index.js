const gallerySection = document.querySelector(".gallery");
const filter = document.querySelector(".filter");
const loginBtn = document.querySelector(".btnlogin");


///recuperer les travaux ////
async function GetWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

/////les categories ///
async function GetCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

// Afficharge des bouton dynamiquement /////
async function createBouton() {
  const dataCategori = await GetCategories();

  // Bouton Tous
  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.id = "0";
  filter.appendChild(allBtn);

  dataCategori.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.id = category.id;
    filter.appendChild(btn);
  });
}
///////afficharge des travaux ////////*
async function afficherTravaux(travaux = null) {
  gallerySection.innerHTML = "";
  if (!travaux) {
    travaux = await GetWorks();
  }

  travaux.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallerySection.appendChild(figure);
  });
}
////// function pour filtre ////
async function filtrageTravaux() {
  const Trav = await GetWorks();
  console.log(Trav);

  const AllButton = document.querySelectorAll(".filter button");
  AllButton.forEach((catego) => {
    catego.addEventListener("click", (e) => {
      const btnId = e.target.getAttribute("id");

      if (btnId !== "0") {
        const filtercategorie = Trav.filter((work) => work.categoryId == btnId);
        afficherTravaux(filtercategorie);
      } else {
        afficherTravaux(Trav);
      }
    });
  });
}
///// fonction pour gerer le button de déconnexion ////////

const loggged = (window.sessionStorage.setItem.loged = true);
const modifBtn = document.querySelector(".porte-modif");
console.log(modifBtn);

function Logout() {
  if (loggged) {
    loginBtn.textContent = "Logout";
    modifBtn.style.display= "inline"
  } else {
    loginBtn.textContent = "Login";
    modifBtn.style.display= "non"
  }
  loginBtn.addEventListener("click", (e) => {
    window.sessionStorage.setItem.loged = false;
    loginBtn.textContent = "Login";
    console.log("Deconnexion en cour!");
    
  });
}
Logout();

console.log(loggged);

///fonction pour afficher les differentes fonction///////////////////////////
async function init() {
  await createBouton();
  await afficherTravaux();
  await filtrageTravaux();
}

init();
