///ciblage des sur le DOM ////
const gallery = document.querySelector("main");
const gallerySection = document.querySelector(".gallery");
const filter = document.querySelector(".filter");

console.log(gallerySection);
/// fonction init ///////////////////////////////////////////////////////
async function init() {
  GetWorks();
  GetCategories();
  createBouton();
  afficherTravaux();
}
init();

/// Fonction pour recuperer les travaux dans la base des données///////
async function GetWorks() {
  const respons = fetch("http://localhost:5678/api/works");
  return (await respons).json();
}
//// Récuperer les acategories /////////////////////////////////////////////////////
async function GetCategories() {
  const respons = await fetch("http://localhost:5678/api/categories");
  return await respons.json();
}
/// création des bouton dynamique///
async function createBouton() {
  const dataCategori = await GetCategories();
  console.log(dataCategori);
  dataCategori.forEach((category) => {
    const btn = document.createElement("bouton");
    btn.textContent = category.name;
    btn.id = category.id;
    filter.appendChild(btn);
  });
}

async function afficherTravaux() {
  gallerySection.innerHTML = " ";
  const travaux = await GetWorks();
  console.log(travaux);
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
