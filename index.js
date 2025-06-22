const gallerySection = document.querySelector(".gallery");
const filter = document.querySelector(".filter");

async function GetWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

async function GetCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

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

async function filtrageTravaux() {
  const Trav = await GetWorks();

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
///fonction pour afficher les differentes fonction///////////////////////////
async function init() {
  await createBouton();
  await afficherTravaux();
  await filtrageTravaux();
}

init();
