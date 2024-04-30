// fetch("http://localhost:5678/api/works")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//*** Variables ***/
const gallery = document.querySelector(".gallery");
gallery.classList.add("gallery");
const sectionPortfolio = document.getElementById("portfolio"); // appeler le conteneur de la section portfolio
console.log(portfolio);
const filters = document.createElement("filters"); //creer le conteneur des filtres
console.log(filters);

portfolio.appendChild(filters);
portfolio.insertBefore(filters, gallery); //place l'élément filtres avant la galerie du conteneur portfolio

//appel a l'API pour récupéerer dynamiquement les projets de l'architecte (les Works).
async function getWorks() {
  //promesse de réponse, je deùande l'info a l'API
  const response = await fetch("http://localhost:5678/api/works");
  //le body n'est pas lisible, je demande a obtenir la réponse en .json. avec un await pour attendre quil ai bien finit la demande avant de continuer .
  return (responseJson = await response.json());
}
getWorks();

// Affichage des Woks
async function affichageWorks() {
  //je créér une variable de mon tableau des works en appellant la fonction getWorks
  const arrayWorks = await getWorks();
  console.log(arrayWorks);
  arrayWorks.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}
affichageWorks();

//Récupération des catégories via l'API

async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  // console.log(responseCaegorie);
  return await response.json();
  console.log(responseJson);
}

//*** affichage des bouton du filtre ***/

async function afficherBtnCategorie() {
  const categories = await getCategories(); //récupérer le tableau des categories
  console.log(categories);

  //**creer le bouton de reset des filtres**
  const btnTous = document.createElement("button");
  btnTous.textContent = "Tous";
  filters.appendChild(btnTous);

  //**creer un bouton filtre par catégorie**
  categories.forEach((categorie) => {
    const btn = document.createElement("button"); //creer un bouton pour chaque categorie
    btn.textContent = categorie.name; //afficher le nom de la categorie dans le btn
    btn.id = categorie.id; //récupérer l'id de la catégorie
    filters.appendChild(btn); //declarer que btn est enfant de filters
  });
}
afficherBtnCategorie();
