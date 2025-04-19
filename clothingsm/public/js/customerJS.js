function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");
    const nav = document.querySelector(".nav");
    nav.classList.toggle("expanded");
}

function profileset(){
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
    
        hideAllSections();
        profcus.style.display = "grid";
        profaddress.style.display = "grid"
        profileInfo.style.display = "grid"
}


function sortTable(column) {
    const table = document.querySelector('.table');
    const header = table.querySelector('.header');
    const rows = Array.from(table.querySelectorAll('.row:not(.header)'));

    const sortedRows = rows.sort((a, b) => {
        const aCell = a.querySelector(`.cell[data-column="${column}"]`);
        const bCell = b.querySelector(`.cell[data-column="${column}"]`);

        if (!aCell || !bCell) {
            console.error('Cell not found for column:', column);
            return 0;
        }

        const aText = aCell.textContent.trim();
        const bText = bCell.textContent.trim();
        const aIsNumeric = !isNaN(Number(aText));
        const bIsNumeric = !isNaN(Number(bText));

        // Determine if the column is numeric or string
        if (column === 'Order No.') {
            return Number(aText) - Number(bText); // Numeric comparison for age
        }else if(column === 'Quantity'){
            return Number(aText) - Number(bText);
        } else {
            return aText.localeCompare(bText); // String comparison for name and country
        }
    });

    // Clear the table and append sorted rows
    // Instead of appending, we will insert before the header
    sortedRows.forEach(row => {
        table.insertBefore(row, header.nextSibling);
        table.style.overflow = 'auto';
        header.style.position = 'sticky';
        header.style.zIndex = '1';
        header.style.top = '0';
        header.style.background = 'white';
        header.style.borderBottom = '1px solid black'
        // Insert after the header
    });

}
function sortTable1(column) {
    const table1 = document.querySelector('.table1');
    const header1 = table1.querySelector('.header1');
    const rows1 = Array.from(table1.querySelectorAll('.row1:not(.header1)'));

    const sortedRows = rows1.sort((a, b) => {
        const aCell = a.querySelector(`.cell1[data-column="${column}"]`);
        const bCell = b.querySelector(`.cell1[data-column="${column}"]`);

        if (!aCell || !bCell) {
            console.error('Cell not found for column:', column);
            return 0; // Skip sorting if cell is not found
        }

        const aText = aCell.textContent.trim();
        const bText = bCell.textContent.trim();

        // Determine if the column is numeric or string
        if (column === 'Order No.' || column === 'Quantity') {
            return Number(aText) - Number(bText); // Numeric comparison for age
        } else {
            return aText.localeCompare(bText); // String comparison for name and country
        }
    });

    // Clear the table and append sorted rows
    // Instead of appending, we will insert before the header
    sortedRows.forEach(row => {
        table1.insertBefore(row, header1.nextSibling);
        table1.style.overflow = 'auto';
        header1.style.position = 'sticky';
        header1.style.zIndex = '1';
        header1.style.top = '0';
        header1.style.background = 'white';
        header1.style.borderBottom = '1px solid black'
        // Insert after the header
    });

}
function swipe(){
    new Swiper('.card-wrapper', {
        loop: true,
        spaceBetween: 30,
    
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
    
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints:{
            0:{
                slidesPerView: 1
            },
            768:{
                slidesPerView: 2
            },
            1024:{
                slidesPerView: 3
            }
        }
    
    });
}
function initCartListeners() {
    document.addEventListener("click", function (e) {
      const cart = document.getElementById("addtocart");
      const overlay = document.getElementById("overlay");
  
      // Show cart and overlay
      if (e.target.id === "cartbutton") {
        if (cart && overlay) {
          cart.style.display = "grid";
        }
      }

      if(e.target.closest(".confirm")){
        if(cart && overlay){
            cart.style.display = "none"
            overlay.style.display = "grid"
        }
      }
  
      // Close cart with "x" button
      if (e.target.id== "reject") {
        if (cart && overlay) {
          cart.style.display = "none";
          overlay.style.display = "none";
        }
      }
  
      // Optional: Close on "Place Order"
      if (e.target.closest(".accept")) {
        if (cart && overlay) {
          cart.style.display = "none";
          overlay.style.display = "none";
        }
      }

      if(e.target.closest(".view button")){
        if(cart && overlay){
            overlay.style.display="none"
        }
      }
    });
  }
  
  function loadcustomerdashboard() {
    fetch('/CustomerHome')
      .then(res => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
  
        const dashboardContent = doc.querySelector(".customerdashboard");
        const cart = doc.querySelector("#addtocart");
        const overlay = doc.querySelector("#overlay");
  
        if (dashboardContent) {
          console.log('Loading customer dashboard...');
          document.getElementById("title").innerHTML = `<div>Home</div>`;
          
          const content = document.getElementById("change-container");
          content.innerHTML = "";
          content.appendChild(dashboardContent);
  
          // Append cart and overlay to the DOM body or main-container
          if (cart && overlay) {
            cart.style.display = "none";
            overlay.style.display = "none";
  
            // Optional: only append if they don't exist already
            if (!document.getElementById("addtocart")) {
              document.body.appendChild(cart);
            }
            if (!document.getElementById("overlay")) {
              document.body.appendChild(overlay);
            }
          }
  
          swipe(); // Initialize Swiper or any other functions
          initCartListeners(); // Init the cart popup functionality
        } else {
          console.log('Failed to find dashboard content in response.');
        }
      })
      .catch((err) => console.error("Failed to load dashboard content:", err));
  }
  

function loaddesigns(){
    fetch('/CustomerNewDesigns')
    .then(res => res.text())
    .then((html)=>{
        const parser = new DOMParser()
        const doc = parser.parseFromString(html,"text/html")

        const designdisplay = doc.querySelector(".main-container")
        if(designdisplay){
            console.log('haxaha')
            document.getElementById("title").innerHTML=`
            <div>Designs</div>`
            const content = document.getElementById("change-container");
            content.innerHTML = "";
            content.appendChild(designdisplay)

            document.getElementById("new").addEventListener('click', function(){
                fetch('/CustomerNewOrder-display')
                .then(res => res.text())
                .then((html)=>{
                    const parser1 = new DOMParser()
                    const doc1 = parser1.parseFromString(html,"text/html")

                    const designdisplay1 = doc1.querySelector(".customerNewOrder-container")
                        if(designdisplay1){
                            console.log('haxasdadaha')
                            document.getElementById("subTitle1").innerHTML=`
                            <div>New Designs</div>
                            <img src="{{ asset('images/sampleimg.png')}}" alt="">`
                            const content1 = document.getElementById("subTitle2");
                            content1.innerHTML = "";
                            content1.appendChild(designdisplay1)
                    }else{
                        console.log('okay')
                    }
                })
            })


            document.getElementById("my").addEventListener('click', function(){
                fetch('/CustomerMyDesignOrder-display')
                .then(res => res.text())
                .then((html)=>{
                    const parser2 = new DOMParser()
                    const doc2 = parser2.parseFromString(html,"text/html")

                    const designdisplay2 = doc2.querySelector(".customermyorder-container")
                        if(designdisplay2){
                            console.log('haxasdadaha')
                            document.getElementById("subTitle1").innerHTML=`
                            <div>My Designs</div>
                            <img src="{{ asset('images/sampleimg.png')}}" alt="">`
                            const content2 = document.getElementById("subTitle2");
                            content2.innerHTML = "";
                            content2.appendChild(designdisplay2)
                    }else{
                        console.log('okay')
                    }
                })
            })


        }else{
            console.log('okayss')
        }
    })
}
function loadprofile(){
    fetch('/CustomerProfile')
    .then(res => res.text())
    .then((html)=>{
        const parser = new DOMParser()
        const doc = parser.parseFromString(html,"text/html")

        const profledisplay = doc.querySelector(".profilecontainer")
        if(profledisplay    ){
            console.log('haxaha')
            document.getElementById("title").innerHTML=`
            <div>Profile</div>`
            const content = document.getElementById("change-container");
            content.innerHTML = "";
            content.appendChild(profledisplay)
            profileset()
        }else{
            console.log('okay')
        }
    })
}

function loadorders(){
    fetch('/CustomerOrder-display')
    .then(res => res.text())
    .then((html)=>{
        const parser = new DOMParser()
        const doc = parser.parseFromString(html,"text/html")

        const orderdisplay = doc.querySelector(".orderscont")
        if(orderdisplay){
            console.log('haxaha')
            document.getElementById("title").innerHTML=`
            <div>Orders</div>`
            const content = document.getElementById("change-container");
            content.innerHTML = "";
            content.appendChild(orderdisplay)
            document.getElementById('sortButton').addEventListener('click', () => {
                const selectedOption = document.getElementById('sortOptions').value;
                sortTable(selectedOption);
            });
            document.getElementById('sortButton1').addEventListener('click', () => {
                const selectedOption = document.getElementById('sortOptions1').value;
                sortTable1(selectedOption);
            });
        }else{
            console.log('okay')
        }
    })
}

function adddesign(){
    fetch('/CustomerAddADesign-display')
    .then(res => res.text())
    .then((html)=>{
        const parser = new DOMParser()
        const doc = parser.parseFromString(html,"text/html")

        const addadesign = doc.querySelector(".completed-container")
        if(addadesign){
            console.log('haxaha')
            document.getElementById("title").innerHTML=`
            <div>Add A Design </div>`
            const content = document.getElementById("change-container");
            content.innerHTML = "";
            content.appendChild(addadesign)
        }else{
            console.log('okay')
        }
    })
}

document.addEventListener("DOMContentLoaded", ()=>{
    loadcustomerdashboard();
    document.getElementById("home").addEventListener("click",loadcustomerdashboard)
})

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("design").addEventListener("click", loaddesigns)
})

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("profile").addEventListener("click", loadprofile)
})
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("order").addEventListener("click", loadorders)
})
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("add").addEventListener("click", adddesign)
})