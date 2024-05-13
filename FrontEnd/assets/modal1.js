let modal = null; // Variable qui permet de savoir quelle est la boite modal qui est ouverte (pour gerer la fermeture)

const openModal = function (e) {
    e.preventDefault(); //evite le rechargement par defaut de la page
    const target = document.querySelector(e.target.getAttribute('href')); //selectionne les liens de modal
    console.log(target);
    target.style.display = null; // affiche la boite modal, retire le display none,  display flex prend la relais
    target.removeAttribute('aria-hidden'); // l'element redevient visible
    target.setAttribute('aria-modal', 'true');
    modal = target // sauvegarde la boite modal ouverte
    modal.addEventListener('click', closeModal); // au click, declanche la fonction closeModal
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);// la boite modale se ferme au click (n'importe où)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);// ajout du stop propagation a l'element parent du bouton close
}

const closeModal = function (e) { //function inverse de openModal, pour fermer la modal
    if (modal === null) return; //Si pas de modal ouverte, le code suivant n'est pas lu
    e.preventDefault(); //evite le rechargement par defaut de la page
    modal.style.display = "none"; // masque la boite modal
    modal.setAttribute('aria-hidden', 'true'); // l'element est masqué
    target.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal); // suprime l'event listener
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);// supprime l'event listener pour nettoyer la boite modale completement
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);// supprimer pour nettoyer boite modale au close
    modal = null // remet modal a null car fermé
}

const stopPropagation = function (e) { //fonction qui empeche la propagation de l'evenement vers les parents donc de maintenanit l'evenement du click sur la croix pour fermer la modale
    e.stopPropagation();
}
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click' , openModal);  // au click sur le lien, declanche la fonction
    
});

//Fermer la modale avec touche echap
window.addEventListener('keydown', function (e) {
    // console.log(e.key); // connaitre le nom de la touche tappée
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }

})