let modal = null; // Variable qui permet de savoir quelle est la boite modal qui est ouverte (pour gerer la fermeture)
const vue1 = document.querySelector('.modal-vue1');
const vue2 = document.querySelector('.modal-vue2');


const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    vue1.style.display = null;
    vue2.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target 
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    modal.querySelector('.btn-go-vue2').addEventListener('click', openVue2);
    
}

const closeModal = function (e) {
    if (modal === null) return; 
    e.preventDefault(); 
    vue2.classList.add("hidden");
    vue1.classList.remove("hidden");
    modal.style.display = "none"; 
    vue1.style.display = "none";
    vue2.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal.querySelector('.btn-go-vue2').removeEventListener('click', openVue2);
    modal = null
    displayWorks();
}

const stopPropagation = function (e) { //fonction qui empeche la propagation de l'evenement vers les parents donc de maintenanit l'evenement du click sur la croix pour fermer la modale
    e.stopPropagation();
}
//Fermer la modale avec touche echap
window.addEventListener('keydown', function (e) {
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

//retour de modale 2 a modale 1
function returnToModal1() {
    vue2.classList.add("hidden");
    vue1.classList.remove("hidden");
    displayWorks();
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
    function inputsCheckUp() {
        const btnValiderForm = document.getElementById("btn-valider-ajout");
        
        form.addEventListener("input",()=>{           
            if (title.value !== "" && category.value !== "" && fileInput.value !== "") {
                btnValiderForm.classList.add("filter_active");
                btnValiderForm.classList.add("hover-effect");
                btnValiderForm.disabled = false;
                
            } else {
                btnValiderForm.classList.remove("filter_active");
                btnValiderForm.classList.remove("hover-effect");
                btnValiderForm.disabled = true;
            }
        });
        
    }
    inputsCheckUp();
});

form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    
    let formData = new FormData();

        formData.append("image", fileInput.files[0]);
        formData.append("title", title.value);
        formData.append("category", category.value);

    if (fileInput.files[0].size > 4000000) {
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
        imgPreview.classList.add("hidden");
        imgPreview.src = ""; 
        fileLabel.classList.remove("hidden");
        fileIcon.classList.remove("visibility");
        fileP.classList.remove("hidden");
        
        gallery.innerHTML = "";
        displayModalGallery();
        
        
        
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

async function displayModalGallery() {
    modalGallery.innerHTML = "";

    const modalGalleryContent = await getWorks();

    modalGalleryContent.forEach(work => {
        const figure = document.createElement("figure");
        const img =document.createElement("img");
        const trashContainer = document.createElement("div");
        const trash =document.createElement("i");

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
    btnValiderForm.classList.add("filter_active");
    form.addEventListener("input",()=>{
        if (!title.value == "" && !category.value == "" && !fileInput.value == "") {
            btnValiderForm.classList.add("filter_active");
            btnValiderForm.disable = false;

        } else {
            btnValiderForm.classList.remove("filter_active");
            btnValiderForm.disable = true;
        }
    })
    
}
inputsCheckUp()