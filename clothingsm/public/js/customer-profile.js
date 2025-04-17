document.addEventListener("DOMContentLoaded", function () {
    const profile = document.getElementById("customerProfile");
    const password = document.getElementById("customerPassword");
    const location = document.getElementById("customerLocation")

    const profcus = document.querySelector(".profcus");
    const profileInfo = document.querySelector(".profileInfo");
    const changepass = document.querySelector(".changepass");
    const locationSection = document.querySelector(".location");
    const profaddress = document.querySelector(".profaddress")

    function hideAllSections() {
        profcus.style.display = "none";
        changepass.style.display = "none";
        locationSection.style.display = "none";
        profileInfo.style.display="none"
        profaddress.style.display = "none"
    }

    profile.addEventListener("click", function () {
        hideAllSections();
        profcus.style.display = "grid";
        profileInfo.style.display = "grid";
        profaddress.style.display = "grid"

    });

    password.addEventListener("click", function () {
        hideAllSections();
        changepass.style.display = "grid";
    });

    location.addEventListener("click", function () {
        hideAllSections();
        locationSection.style.display = "grid";
    });

    // Initialize with only the profile section visible
    hideAllSections();
    profcus.style.display = "grid";
    profaddress.style.display = "grid"
    profileInfo.style.display = "grid"
});

let profilePic = document.getElementById("profile-pic");
let inputFile = document.getElementById("input-file");

inputFile.onchange = function (){
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
}