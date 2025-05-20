function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");
    const nav = document.querySelector(".nav");
    nav.classList.toggle("expanded");
}


function swiper(){
    var swiper = new Swiper(".slide-content", {
        slidesPerView: 3,
        spaceBetween: 25,
        loop: true,
        centerSlide: 'true',
        fade: 'true',
        grabCursor: 'true',
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints:{
            0: {
                slidesPerView: 1,
            },
            520: {
                slidesPerView: 2,
            },
            950: {
                slidesPerView: 3,
            },
        },
    });
}
function loadCharts() {
    const barchart = document.getElementById("barchart");
    const doughnut = document.getElementById("doughnut");

    if (barchart) {
        new Chart(barchart.getContext("2d"), {
            type: "bar",
            data: {
                labels: ['Product A', 'Product B', 'Product C'],
                datasets: [{
                    label: 'Sales',
                    data: [12, 19, 3],
                    backgroundColor: ['red', 'blue', 'green']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    if (doughnut) {
        new Chart(doughnut.getContext("2d"), {
            type: "doughnut",
            data: {
                labels: ['Red', 'Blue', 'Green'],
                datasets: [{
                    label: 'Sales',
                    data: [10, 20, 30],
                    backgroundColor: ['red', 'blue', 'green']
                }]
            },
            options: {
                responsive: true
            }
        });
    }
}
function profilepic(){
    const inputFile = document.getElementById("addimg");
    const profilePic = document.getElementById("newimg");

    inputFile.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}
function profilepic1(){
    const inputFile = document.getElementById("editimg");
    const profilePic = document.querySelector(".img2");

    inputFile.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}
function optionitem() {
    const additem = document.querySelector(".addbutton");
    const deleteitem = document.querySelectorAll(".deletebutton");
    const edititem = document.querySelectorAll(".editbutton");

    const add = document.querySelector(".additem");
    const close1 = document.querySelector(".reject button");

    const edit = document.querySelector(".edititem");
    const close2 = document.querySelector("#closeEditModal");

    const delete2 = document.querySelector(".deleteitem");
    const close3 = document.querySelector(".reject3 button");

    const productcontainer = document.querySelector(".productcontainer");

    // Show "Add Item" Modal
    additem.addEventListener("click", function () {
        add.style.display = "grid";
    });

    close1.addEventListener("click", function () {
        add.style.display = "none";
    });

    // Show "Edit Item" Modal
    edititem.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');
            const productType = button.getAttribute('data-type');
            const productPrintType = button.getAttribute('data-printtype');
            const productImg = button.getAttribute('data-productImg');
            const productStatus = button.getAttribute('data-status');
            console.log(productPrintType); // Check this output

            document.getElementById("editProductImage1").src = productImg;
            document.getElementById("editId").value = productId;
            document.getElementById("editName").value = productName;
            document.getElementById("editPrice").value = productPrice;
            document.getElementById("editCategory").value = productType;
            document.getElementById("editprintType").value = productPrintType;
            document.getElementById("add-status").value = productStatus;
            console.log(productType)

            edit.style.display = "grid";
        });
    });

    close2.addEventListener("click", function () {
        edit.style.display = "none";
        productcontainer.style.filter = "none";
        productcontainer.style.pointerEvents = "auto";
    });

    // Show "Delete Item" Modal
    deleteitem.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');
            const productType = button.getAttribute('data-type');
            const productPrintType = button.getAttribute('data-printtype');
            const productImg = button.getAttribute('data-productImg');

            document.getElementById("deleteProductImage").src = productImg;
            document.getElementById("deleteId").value = productId;
            document.getElementById("deleteName").value = productName;
            document.getElementById("deletePrice").value = productPrice;
            document.getElementById("deleteType").value = productType;
            document.getElementById("deletePrintType").value = productPrintType;

            delete2.style.display = "grid";
            productcontainer.style.filter = "blur(10px)";
            productcontainer.style.pointerEvents = "none";
        });
    });

    close3.addEventListener("click", function () {
        delete2.style.display = "none";
        productcontainer.style.filter = "none";
        productcontainer.style.pointerEvents = "auto";
    });
}

function loaddashboard(){
        fetch("/dashboarddisplay")
        .then(res => res.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const dashboardContent = doc.querySelector(".main-container");
            if(dashboardContent){
                document.getElementById("title1").innerHTML =`
                <div>Home</div>`
                console.log('haaha')
                const content = document.getElementById("body1");
                content.innerHTML = "";
                content.appendChild(dashboardContent)
                swiper()
                loadCharts()
                document.getElementById('body1').style.display = 'flex'
            }else{
                console.log("Errorz")
            }
        })
            .catch((err) => console.error("Failed to load dashboard content:", err))

}

document.addEventListener("DOMContentLoaded", ()=>{
    loaddashboard();
    document.getElementById("buttondashboard").addEventListener("click",loaddashboard)
})

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("buttonorders").addEventListener("click", function() {
        fetch("/orders")
            .then(res => res.text())
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                const dashboardContent = doc.querySelector(".ordercontainer");
                const overlay = doc.querySelector(".overlay");
                
                if (dashboardContent) {
                    document.getElementById("title1").innerHTML = "<div>Orders</div>";
                    const content = document.getElementById("body1");
                    content.innerHTML = "";
                    content.appendChild(dashboardContent.cloneNode(true));
                    
                    if (overlay) {
                        content.appendChild(overlay.cloneNode(true));
                        attachOverlayEvents();
                    }
                    
                    document.getElementById('body1').style.display = 'grid';
                } else {
                    console.log("Error loading orders content");
                }
            })
            .catch((err) => console.error("Failed to load orders content:", err));
    });
});

function product(){
    fetch("/product")
    .then((res) => res.text())
    .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const dashboardContent = doc.querySelector(".productcontent");
        const deleteitem = doc.querySelector(".deleteitem");
        const edititem = doc.querySelector(".edititem");
        const additem = doc.querySelector(".additem")

        if (dashboardContent) {
            document.getElementById("title1").innerHTML =`
            <div>Products</div>`
            const content = document.getElementById("body1");
            content.innerHTML = "";
            content.appendChild(dashboardContent);
            content.appendChild(deleteitem);
            content.appendChild(edititem);
            content.appendChild(additem);
            optionitem();
            profilepic()
            profilepic1()
            document.getElementById('body1').style.display = 'grid'
        } else {
            console.error("The element .productscontainer was not found.");
            console.log(dashboardContent)
            console.log(deleteitem)
        }
    })
    .catch((err) => console.error("Failed to load dashboard content:", err));
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("buttonproducts").addEventListener("click", product);

});



//
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("buttonreport").addEventListener("click", function () {
        fetch("/report")
            .then((res) => res.text())
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                console.log(doc);

                const dashboardContent = doc.querySelector(".reportcontent");

                if (dashboardContent) {
                    document.getElementById("title1").innerHTML =`
                    <div>Reports</div>`
                    const content = document.getElementById("body1");
                    content.innerHTML = "";
                    content.appendChild(dashboardContent);
                } else {
                    console.error("The element .productscontainer was not found.");
                }
            })
            .catch((err) => console.error("Failed to load dashboard content:", err));
    });
});
function attachOverlayEvents() {
    document.querySelector(".ordercontent").addEventListener("click", function () {
        document.querySelector(".overlay").style.display = "grid";
        document.querySelector(".ordercontainer").style.pointerEvents = "none";
        document.querySelector(".ordercontainer").style.filter = "blur(10px)";
    })

    document.querySelector(".reject01").addEventListener("click", function () {
        document.querySelector(".overlay").style.display = "none";
        document.querySelector(".ordercontainer").style.pointerEvents = "auto";
        document.querySelector(".ordercontainer").style.filter = "blur(0)"
    })

    document.querySelector(".accept-button").addEventListener("click", function () {
        document.querySelector(".overlay").style.display = "none";
        document.querySelector(".ordercontainer").style.pointerEvents = "auto";
        document.querySelector(".ordercontainer").style.filter = "blur(0)"
    })

}