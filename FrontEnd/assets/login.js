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
      localStorage.setItem('token', data.token);
      window.location.href = './index.html';
    })
    .catch((error) => {
      console.error('Error:', error);
      errorMessage.textContent = error.message;
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

    const userEmail = baliseEmail.value;
    const userPwd = balisePassword.value;
    const responseBody = await fetchUsers();
  });
}
login();





