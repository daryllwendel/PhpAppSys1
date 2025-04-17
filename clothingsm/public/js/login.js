function login() {
    event.preventDefault()
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "password123") {
        alert("Login successful!");
        window.location.href = "../../../dashboard";
    }else if(user === "" && pass === ""){
        alert("Customer Login successful!")
        window.location.href ="../../../CustomerHome";
    } else {
        document.getElementById("message").innerText = "Invalid username or password";
    }
}

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});