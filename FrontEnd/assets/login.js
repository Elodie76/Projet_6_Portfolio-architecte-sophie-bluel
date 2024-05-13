//Global Var
const baliseEmail = document.querySelector("form #email");
const balisePassword = document.querySelector("form #password");
const form = document.querySelector("form");
const errorMessage = document.querySelector(".login p");





async function fetchUsers() {

  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Votre email ou votre mot de passe est incorrect');
      }
      return response.json();
    })
    .then(data => {
      console.log('Logged in successfully:', data);
      // Vous pouvez stocker le token reçu dans localStorage pour des requêtes futures
      localStorage.setItem('token', data.token);
      // Redirection ou mise à jour de l'interface utilisateur si authentification valide
      window.location.href = './index.html';
    })
    .catch((error) => {
      console.error('Error:', error);
      errorMessage.textContent = error.message;  // Afficher le message d'erreur sous le formulaire
      
    

  });
} 


//Verrification champs
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return regex.test(password);
}


 function login() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // On fait la vérification.
    const userEmail = baliseEmail.value;
    const userPwd = balisePassword.value;
    console.log(userEmail, userPwd);

  //    if (!validateEmail(userEmail)) {
  //     errorMessage.textContent = "L'adresse mail n'est pas valide.";
  //     return;
  //     baliseEmail.classList.add("input_error");
      
  // }
  //   if (!validatePassword(userPwd)) {
  //     errorMessage.textContent = 'Le mot de passe ne correspond pas.';
  //     return;
  //     balisePassword.classList.add("input_error");

  //   }else{
      const responseBody = await fetchUsers();
      console.log(responseBody);
  // }
    
    

  });
}

login();

//Si utilisateur connecté

const logOutBtn = document.querySelector(".log_out");
console.log(logOutBtn);


document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  
  
  if (!token) {
      // Rediriger vers la page de login si aucun token n'est trouvé
      window.location.href = '/login';
  } else {
      // Vous pouvez également vérifier la validité du token en envoyant une requête au serveur
      console.log("Vous êtes déja connecté");
      logOutBtn.textContent = "Logout";
      


  }
});

function logOut() {
  logOutBtn.classListadd("log_out");
  
}