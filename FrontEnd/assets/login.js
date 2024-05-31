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
    const responseBody = await fetchUsers();
  });
}

login();





