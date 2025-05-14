

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;


    const user = {
        email: email,
        password: password,
    }

    console.log(user);
    let useremail = localStorage.getItem("email")
    let userpassword = localStorage.getItem("password")

    if (email == "" && password == "") {
        alert("Input Feild is no value")
    } else {
        if (email == useremail && password == userpassword) {
            alert(`login Successfull, Hi ${email}`)
        }
    }
// console.log();



    document.getElementById("loginForm").reset();
});