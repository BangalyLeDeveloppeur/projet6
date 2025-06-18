///ciblage des sur le DOM ////
const gallery = document.querySelector("main");
const gallerySection = document.querySelector(".gallery");
const filter = document.querySelector(".filter");

console.log(gallerySection);
/// fonction init ///////////////////////////////////////////////////////
async function init(work) {
  //gallerySection.innerHTML = " ";
  GetWorks();
  GetCategories();
  createBouton();
}
init();

/// Fonction pour recuperer les travaux dans la base des données///////
async function GetWorks() {
  const respons = fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => console.log(data));
}
//// Récuperer les acategories /////////////////////////////////////////////////////
async function GetCategories() {
  const respons = await fetch("http://localhost:5678/api/categories");
  return await respons.json();
}
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
