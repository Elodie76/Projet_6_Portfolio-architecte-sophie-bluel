let index = 0;
const gallery = document.querySelector(".gallery");
const sectionPortfolio = document.getElementById("portfolio"); // appeler le conteneur de la section portfolio
const filters = document.createElement("div"); //creer le conteneur des filtres
const btnModifier = document.querySelector(".btn_modifier");

gallery.classList.add("gallery");
filters.classList.add("filter_container");

portfolio.appendChild(filters);

document.addEventListener('DOMContentLoaded', () => {
  if (sectionPortfolio && filters && gallery) {
    // Insérer le conteneur de filtre entre le titre et la galerie
    sectionPortfolio.insertBefore(filters, gallery);
} else {
    console.error('Un ou plusieurs éléments sont introuvables dans le DOM');
    } 
  });


// **weight menu buttons**
function menuBtnStyle() {
  const menuBtn = document.querySelectorAll("nav a");
  menuBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
  })
});
}
menuBtnStyle();




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
  arrayWorks.innerHTML = "";
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
      
    });
  });
}
filterCategory();


// Si utilisateur connecté

const logOutBtn = document.querySelector(".log_out");
const logInBtn = document.querySelector(".log_in");
const editionModeBanner = document.querySelector(".edition-mode-banner");

document.addEventListener('DOMContentLoaded', function() {

  if(localStorage.getItem('token') !=null) {
    // Mise à jour du visuel du site
    filters.classList.remove('filter_container');

    logOutBtn.style.display = null;
    editionModeBanner.style.display = null;

    logInBtn.style.display = "none";
    btnModifier.style.display = null;
    filters.classList.add('hidden');

  } else {
    
  }
});

function logOut() {

  logOutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    logOutBtn.style.display = "none";
    editionModeBanner.style.display = "none";
    btnModifier.style.display = "none";
    
    
    logInBtn.style.display = "flex";
    
    filters.classList.add('filter_container');
    filters.classList.remove('hidden');
  });
};
logOut();

