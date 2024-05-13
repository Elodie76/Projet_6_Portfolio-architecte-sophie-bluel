let modal = null; // Variable qui permet de savoir quelle est la boite modal qui est ouverte (pour gerer la fermeture)

const openModal = function (e) {
    e.preventDefault(); //evite le rechargement par defaut de la page
    const target = document.querySelector(e.target.getAttribute('href')); //selectionne les liens de modal
    console.log(target);
    target.style.display = null; // affiche la boite modal, retire le display none,  display flex prend la relais
    target.removeAttribute('aria-hidden'); // l'element redevient visible
    target.setAttribute('aria-modal', 'true');
    modal = target // sauvegarde la boite modal ouverte
    modal.addEventListener('click, closerModal'); // au click, declanche la fonction closeModal
}

const closeModal = function (e) { //function inverse de openModal, pour fermer la modal
    if (modal === null) return; //Si pas de modal ouverte, le code suivant n'est pas lu
    e.preventDefault(); //evite le rechargement par defaut de la page
    modal.style.display = "none"; // masque la boite modal
    modal.setAttribute('aria-hidden', 'true'); // l'element est masqué
    target.removeAttribute('aria-modal');
    modal.removeEventListener('click, closerModal'); // suprime l'event listener
    modal = null // remet modal a null car fermé
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click' , openModal);  // au click sur le lien, declanche la fonction
    
});

