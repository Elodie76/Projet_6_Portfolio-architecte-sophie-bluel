let modal = null; // Variable qui permet de savoir quelle est la boite modal qui est ouverte (pour gerer la fermeture)
const vue1 = document.querySelector('.modal-vue1');
const vue2 = document.querySelector('.modal-vue2');


const openModal = function (e) {
    e.preventDefault(); //evite le rechargement par defaut de la page  
    const target = document.querySelector(e.target.getAttribute('href')); //selectionne les liens de modal
    console.log(target);
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
const imgPreview = document.querySelector(".bloc-add-img img");
const fileInput = document.querySelector(".bloc-add-img input");
const fileLabel = document.querySelector(".bloc-add-img label");
const fileIcon = document.querySelector(".bloc-add-img .fa-image");
const fileP = document.querySelector(".bloc-add-img p");

fileInput.addEventListener("change",()=>{
    const file = fileInput.files[0]; //recupère la donnée dans l'input
    console.log(file);
})





// gestion de l'affichage et supression de projet dans la modale
const modalGallery = document.querySelector('.modal-gallery');
console.log(modalGallery);

async function displayModalGallery() {
    modalGallery.innerHTML = ""; //reset la gallerie (efface les projets)
    const modalGalleryContent = await getWorks();
    console.log(modalGalleryContent);
    modalGalleryContent.forEach(work => {
        const figure = document.createElement("figure");
        const img =document.createElement("img");
        // const span = document.createElement("span");
        const trashContainer = document.createElement("div");
        const trash =document.createElement("i");
        console.log(trash);

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

//Supprimer un projet dans la maodale

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

                displayModalGallery();// si réussi affiche (reactualise) la gallerie de la modale
                displayWorks();// et réactualise l'affichage des projets
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression :", error);
            });
            

        })
    });
}
