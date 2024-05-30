let modal = null; // Variable qui permet de savoir quelle est la boite modal qui est ouverte (pour gerer la fermeture)
const vue1 = document.querySelector('.modal-vue1');
const vue2 = document.querySelector('.modal-vue2');


const openModal = function (e) {
    e.preventDefault(); //evite le rechargement par defaut de la page  
    const target = document.querySelector(e.target.getAttribute('href')); //selectionne les liens de modal
    // console.log(target);
    target.style.display = null; // affiche la boite modal, retire le display none,  display flex prend la relais
    vue1.style.display = null;
    target.removeAttribute('aria-hidden'); // l'element redevient visible
    target.setAttribute('aria-modal', 'true');
    modal = target // sauvegarde la boite modal ouverte
    modal.addEventListener('click', closeModal); // au click, declanche la fonction closeModal
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);// la boite modale se ferme au click (n'importe où)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);// ajout du stop propagation a l'element parent du bouton close
    modal.querySelector('.btn-go-vue2').addEventListener('click', openVue2);//passer sur la vue 2 ajouter une photo
    
}

const closeModal = function (e) { //function inverse de openModal, pour fermer la modal
    if (modal === null) return; //Si pas de modal ouverte, le code suivant n'est pas lu
    e.preventDefault(); //evite le rechargement par defaut de la page
    modal.style.display = "none"; // masque la boite modal
    vue1.style.display = "none";
    modal.setAttribute('aria-hidden', 'true'); // l'element est masqué
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal); // suprime l'event listener
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);// supprime l'event listener pour nettoyer la boite modale completement
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);// supprimer pour nettoyer boite modale au close
    modal.querySelector('.btn-go-vue2').removeEventListener('click', openVue2);//passer sur la vue 2 ajouter une photo
    modal = null // remet modal a null car fermé
    displayWorks();
}

const stopPropagation = function (e) { //fonction qui empeche la propagation de l'evenement vers les parents donc de maintenanit l'evenement du click sur la croix pour fermer la modale
    e.stopPropagation();
}
//Fermer la modale avec touche echap
window.addEventListener('keydown', function (e) {
    // console.log(e.key); // connaitre le nom de la touche tappée
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }

})
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click' , openModal);  // au click sur le lien, declanche la fonction
    
});

//Afficher 2e vue de la modale
const openVue2 = function (e) {
    e.preventDefault(); //evite le rechargement par defaut de la page
    

    vue1.classList.add("hidden");
    vue2.classList.remove("hidden");

   
    vue2.querySelector('.js-modal-return').addEventListener('click', returnToModal1);
    vue2.addEventListener('click', stopPropagation);// ajout du stop propagation a l'element parent du bouton close
    vue2.querySelector('.js-modal-close').addEventListener('click', closeModal);// la boite modale se ferme au click (n'importe où)
}

function returnToModal1() {
    vue2.classList.add("hidden");
    vue1.classList.remove("hidden");
}

// Previsualisation de l'image
const blocAddImg = document.querySelector(".bloc-add-img");
const imgPreview = document.querySelector(".bloc-add-img img");
const fileInput = document.querySelector(".bloc-add-img input");
const fileLabel = document.querySelector(".bloc-add-img label");
const fileIcon = document.getElementById("fileIcon");
const fileP = document.querySelector(".bloc-add-img p");




//précharger l'image et l'afficher dans une balise -> process

fileInput.addEventListener("change",()=>{
    const file = fileInput.files[0]; //recupère la donnée dans l'input
    // console.log(file);
    if (file) {
            
        const reader = new FileReader();
        reader.onload = function (e) {
            imgPreview.src = e.target.result;
            fileP.classList.add("hidden");
            imgPreview.classList.remove("hidden");
            fileLabel.classList.add("hidden");
            fileIcon.classList.add("visibility");
  
        }
        reader.readAsDataURL(file);
    }
})
// Créer une list de catégorie pour l'input select
async function displayCategoryModal() {
    const select = document.querySelector(".modale-content #Catégorie-select");
    const categorys = await getCategorys();
    categorys.forEach(category => {
        const option = document.createElement("option");
        // console.log(option);
        option.value = category.id;
        option.textContent = category.name
        select.appendChild(option);
    });
}
displayCategoryModal();



// Ajouter un projet en methode POST

const form = document.querySelector(".modale-content form");
const title = document.querySelector(".modale-content #img-title");
const category = document.querySelector(".modale-content #Catégorie-select");
const token = localStorage.getItem('token');
const errorMessage = document.querySelector(".modale-content .errorMessage");

// Verrifier si tous les inputs sont rempli
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    function inputsCheckUp() {
        const btnValiderForm = document.getElementById("btn-valider-ajout");
        
        form.addEventListener("input",()=>{
            console.log("Title:", title.value);
            console.log("Category:", category.value);
            console.log("File Input:", fileInput.value);
            
            if (title.value !== "" && category.value !== "" && fileInput.value !== "") {
                console.log("tous les champs sont rempli");
                btnValiderForm.classList.add("filter_active");
                btnValiderForm.disabled = false;
                
            } else {
                btnValiderForm.classList.remove("filter_active");
                btnValiderForm.disabled = true;
            }
        });
        
    }
    inputsCheckUp();
});

form.addEventListener("submit", async (e)=>{
    e.preventDefault();
     // Création d'un objet FormData et ajout des éléments du formulaire
    let formData = new FormData();

        formData.append("image", fileInput.files[0]); // Ajout de l'image
        formData.append("title", title.value); // Ajout du titre
        formData.append("category", category.value); // Ajout de la catégorie

        // console.log("FormData:", formData);
        //     for (let pair of formData.entries()) {
        //     console.log(pair[0]+ ': ' + pair[1]); 
        //     };

        // formData = {
        //     title:formData.get("title"),
        //     category:formData.get("category"),
        //     image:formData.get("image")
        // };
        // console.log("formData :",formData);

    
    // if (inputsCheckUp) {
    //     return
    // }

    if (fileInput.files[0].size > 4000000) { // Limite de 4 Mo 
        console.error("Le fichier est trop grand ! (4mo max)");
        errorMessage.innerHTML = "Le fichier est trop grand ! (4mo max)";
        return;
     }

    try {
        const response = await fetch ("http://localhost:5678/api/works",{
        method: "POST",
        headers: {
            'Authorization':`Bearer ${token}`
            // "content-Type":"application/json"
            // ChatGpt : Assurez-vous de ne pas définir le content-Type dans les en-têtes 
            //           pour les formulaires multipart/form-data. Cela sera automatiquement défini par le navigateur.
        },
        body: formData
        });  

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du projet : " + response.status);
        }

        const data = await response.json();
        console.log("Nouveau projet ajouté :",data);
        form.reset();
        imgPreview.classList.add("hidden"); // Réinitialiser l'aperçu de l'image
        imgPreview.src = ""; // Réinitialiser la source de l'image
        fileLabel.classList.remove("hidden"); // Réafficher les labels et les icônes
        fileIcon.classList.remove("visibility");
        fileP.classList.remove("hidden");
        
        gallery.innerHTML = "";
        displayModalGallery();//affiche les projets dans la modale
        
        
        
        closeModalWithoutEvent();

    } catch (error) {
        console.error("Erreur lors de l'ajout du projet :", error);
    }
    
});

// Fonction closeModal sans événement
const closeModalWithoutEvent = function () {
    if (modal === null) return;
    modal.style.display = "none"; // masque la boite modal
    vue1.style.display = "none";
    modal.setAttribute('aria-hidden', 'true'); // l'element est masqué
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal.querySelector('.btn-go-vue2').removeEventListener('click', openVue2);
    modal = null;
    displayWorks();
}


// gestion de l'affichage et supression de projet dans la modale
const modalGallery = document.querySelector('.modal-gallery');
// console.log(modalGallery);

async function displayModalGallery() {
    modalGallery.innerHTML = ""; //reset la gallerie (efface les projets)
    const modalGalleryContent = await getWorks();
    // console.log(modalGalleryContent);
    modalGalleryContent.forEach(work => {
        const figure = document.createElement("figure");
        const img =document.createElement("img");
        // const span = document.createElement("span");
        const trashContainer = document.createElement("div");
        const trash =document.createElement("i");
        // console.log(trash);

        trashContainer.classList.add("trash-container");
        trash.classList.add("fa-solid", "fa-trash-can");
        figure.classList.add("figure-modal");

        trash.id = work.id;
        img.src = work.imageUrl

        modalGallery.appendChild(figure);
        figure.appendChild(trashContainer);
        figure.appendChild(img);
        trashContainer.appendChild(trash);  
    });
    deleteWork();
}
displayModalGallery();

//Supprimer un projet dans la modale

 function deleteWork() {
    const trashAll = document.querySelectorAll(".fa-trash-can");
    trashAll.forEach(trash => {
        trash.addEventListener("click",(e)=>{
            const id = trash.id
            const token = localStorage.getItem('token');
            const init ={
                method: 'DELETE',
                headers: {'accept':'application/json',
                         'authorization':`Bearer ${token}`
            }
            
        };
             fetch(`http://localhost:5678/api/works/${id}`,init)
            .then((response)=>{
                if (!response.ok) {
                    return Promise.reject("La suppression a échoué !");
                
                }
                return response.text().then(text => text ? JSON.parse(text) : {});
            })
            .then((data)=>{
                console.log("suppression réussie :" ,data);

                gallery.innerHTML = "";
                displayModalGallery();// si réussi affiche (reactualise) la gallerie de la modale
                displayWorks();// et réactualise l'affichage des projets
            

            })
            .catch((error) => {
                console.error("Erreur lors de la suppression :", error);
            });
            

        })
    });
}

// Verrifier si tous les inputs sont rempli
function inputsCheckUp() {
    const btnValiderForm = document.getElementById("btn-valider-ajout");
    console.log(btnValiderForm);
    btnValiderForm.classList.add("filter_active");
    form.addEventListener("input",()=>{
        if (!title.value == "" && !category.value == "" && !fileInput.value == "") {
            console.log("tous les champs sont rempli");
            btnValiderForm.classList.add("filter_active");
            btnValiderForm.disable = false;

        } else {
            btnValiderForm.classList.remove("filter_active");
            btnValiderForm.disable = true;
        }
    })
    
}
inputsCheckUp()