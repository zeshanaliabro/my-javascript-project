document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let firstName = document.getElementById("Firstname").value;
  let lasttName = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const alreadyExist = users.find((user) => user.email === email)
  if (alreadyExist) {
    alert("In this email already exist, kindly provide an other email")
  }
  else {
    users.push({ firstName, lasttName, email, password });
    alert("Sign Up Sucessfully!")
    window.location.href = "http://127.0.0.1:5500/log-in.html"
  }

  localStorage.setItem("users", JSON.stringify(users));


  document.getElementById("signupForm").reset();
})