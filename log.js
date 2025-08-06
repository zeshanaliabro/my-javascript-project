document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const validUser = users.find(
    (user) => user.email === email && user.password === password
  );
  console.log("validuser", validUser);

  if (validUser) {
    alert("Login Sucessfully");
    localStorage.setItem("currentuser", JSON.stringify(validUser, null, 2));
    window.location.href = "http://127.0.0.1:5500/index.html";
  } else {
    alert("Kindly prvide a correct value");
  }

  document.getElementById("loginForm").reset();
});
