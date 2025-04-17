let defaultTshirt = document.getElementById("default-tshirt");
let inputFile = document.getElementById("input-file");

inputFile.onchange = function (){
    defaultTshirt.src = URL.createObjectURL(inputFile.files[0]);
}