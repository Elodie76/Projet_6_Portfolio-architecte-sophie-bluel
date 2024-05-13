
//*** Variables ***/
let index = 0;
const gallery = document.querySelector(".gallery");
gallery.classList.add("gallery");
const sectionPortfolio = document.getElementById("portfolio"); // appeler le conteneur de la section portfolio
// console.log(portfolio);
const filters = document.createElement("div"); //creer le conteneur des filtres
filters.classList.add("filter_container");
// console.log(filters);
const btnModifier = document.querySelector(".btn_modifier");
console.log(btnModifier);

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

// Affichage des Woks dans le dom

async function displayWorks() {
  const arrayWorks = await getWorks();
  arrayWorks.forEach((work) => {
    createWorks(work);
  });
}
displayWorks();

async function createWorks(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  img.src = work.imageUrl;
  figcaption.textContent = work.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

//Récupération des catégories via l'API

async function getCategorys() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

//*** affichage des bouton du filtre ***/

//**creer le bouton de reset des filtres**
const btnTous = document.createElement("button");
console.log(btnTous);
btnTous.textContent = "Tous";
btnTous.id = 0;
filters.appendChild(btnTous);
btnTous.classList.add("filter");

async function displayBtnCategory() {
  const categorys = await getCategorys(); //récupérer le tableau des categories

  //**creer un bouton filtre par catégorie**
  categorys.forEach((category) => {
    const btnCategory = document.createElement("button"); //creer un bouton pour chaque categorie
    filters.appendChild(btnCategory); //declarer que btn est enfant de filters
    btnCategory.classList.add("filter");

    btnCategory.textContent = category.name; //afficher le nom de la categorie dans le btn
    btnCategory.id = category.id; //récupérer l'id de la catégorie
  });
}
displayBtnCategory();

//***Activer les boutons des filtres categories***/

async function filterCategory() {
  const arrayWorks = await getWorks();
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    if (parseInt(button.id) === 0) {
      button.classList.add("filter_active");
    } else {
      button.classList.remove("filter_active");
    }
    button.addEventListener("click", (e) => {
      btnId = e.target.id;
      gallery.innerHTML = "";
      if (parseInt(btnId) !== 0) {
        const arrayWorksTri = arrayWorks.filter((work) => {
          return work.categoryId == btnId;
        });
        buttons.forEach((btn) => {
          btn.classList.remove("filter_active");
        });

        arrayWorksTri.forEach((work) => {
          if (parseInt(btnId) === work.categoryId);
          button.classList.add("filter_active");
          createWorks(work);
        });
      } else {
        buttons.forEach((btn) => {
          btn.classList.remove("filter_active");
        });
        button.classList.add("filter_active");
        displayWorks();
      }
      console.log(btnId);
    });
  });
}
filterCategory();


// Si utilisateur connecté

const logOutBtn = document.querySelector(".log_out");

document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  if (!token) {
      // Rediriger vers la page de login si aucun token n'est trouvé
      // window.location.href = './log_in.html';
  } else {
      // Vous pouvez également vérifier la validité du token en envoyant une requête au serveur
      console.log("vous etes connecté");
      logOutBtn.textContent = "Logout";
      btnModifier.classList.remove("loged-content");
      
  }
});