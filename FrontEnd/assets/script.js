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
