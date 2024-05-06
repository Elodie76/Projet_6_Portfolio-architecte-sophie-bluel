//Global Var
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const errorMessage = document.querySelector(".login p");

//Creer et sauvegarder les log

async function createUsers() {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: '{"userId":"" , "token":""}',
  });
}
createUsers();
console.log(createUsers);

async function login() {
  const users = await createUsers();
}
form.addEventListener("submit"),
  (e) => {
    e.preventDefault();
    const userEmail = email.ariaValue;
    const userPwd = password.ariaValueMax;
    console.log(userEmail, userPwd);
  };
