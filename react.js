document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();
let firstName = document.getElementById("Firstname").value ;
let lasttName = document.getElementById("lastname").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password") .value;

localStorage.setItem("firstname",firstName)
localStorage.setItem("lastName",lasttName)
localStorage.setItem("email",email)
localStorage.setItem("password",password)


 document.getElementById("signupForm").reset();
})