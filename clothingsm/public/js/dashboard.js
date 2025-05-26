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

    const productcontainer = document.querySelector(".productcontent");

    // Show "Add Item" Modal
    additem.addEventListener("click", function () {
        add.style.display = "grid";
        productcontainer.style.pointerEvents = "none"
        productcontainer.style.filter = "auto";
    });

    close1.addEventListener("click", function () {
        add.style.display = "none";
        productcontainer.style.pointerEvents = "auto"
        productcontainer.style.filter = "none";
    });

    edititem.forEach(button => {
        button.addEventListener("click", function () {
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');
            const productType = button.getAttribute('data-type');
            const productPrintType = button.getAttribute('data-printtype');
            const productImg = button.getAttribute('data-productImg');
            const productStatus = button.getAttribute('data-status');
            const prodcutviewStatus = button.getAttribute('data-viewStatus')
            console.log(productPrintType); // Check this output

            document.getElementById("editProductImage1").src = productImg;
            document.getElementById("editId").value = productId;
            document.getElementById("editName").value = productName;
            document.getElementById("editPrice").value = productPrice;
            document.getElementById("editCategory").value = productType;
            document.getElementById("editprintType").value = productPrintType;
            document.getElementById("add-status").value = productStatus;
            document.getElementById('approveProductId').value = productId
            if(prodcutviewStatus === 'pending'){
                document.getElementById('approveMessage').style.display = 'block';
                document.getElementById('editimg').disabled= true
                document.getElementById('editName').disabled= true
                document.getElementById('editPrice').disabled= true
                document.getElementById('editCategory').disabled= true
                document.getElementById('editprintType').disabled= true
                document.getElementById('add-status').disabled= true
                
                document.getElementById('editimg').value= ''
                document.getElementById('editName').value= ''
                document.getElementById('editPrice').value= ''
                document.getElementById('editCategory').value= ''
                document.getElementById('editprintType').value= ''
                document.getElementById('add-status').value= ''
                const checkboxes = document.querySelectorAll('input[name="sizes[]"]');

                checkboxes.forEach(checkbox => {
                    checkbox.disabled = true;
                });

            }
            if(prodcutviewStatus === 'approved'){
                document.getElementById('approveMessage').style.display = 'none';

                 document.getElementById('editimg').disabled= false
                document.getElementById('editName').disabled= false
                document.getElementById('editPrice').disabled= false
                document.getElementById('editCategory').disabled= false
                document.getElementById('editprintType').disabled= false
                document.getElementById('add-status').disabled= false
                const checkboxes = document.querySelectorAll('input[name="sizes[]"]');

                checkboxes.forEach(checkbox => {
                    checkbox.disabled = false;
                });
            }
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

    //edit a design ajax
    document.querySelectorAll(".editProduct").forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/product", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: formData,
            })
            .then(res => {
                if (res.ok) {
                    const overlay = form.closest(".additem");
                    if (overlay) {
                        overlay.style.display = "none";
                    }
                    product();
                } else {
                    alert("Failed to add order.");
                }
            })
            .catch(err => {
                console.error("Error:", err);
            });
        });
    });

    //add a design ajax
    document.querySelectorAll(".addProductForm").forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/adddesign", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: formData,
            })
            .then(res => {
                if (res.ok) {
                    const overlay = form.closest(".edititem");
                    if (overlay) {
                        overlay.style.display = "none";
                    }  
                    product();
                } else {
                    alert("Failed to edit order.");
                }
            })
            .catch(err => {
                console.error("Error:", err);
            });
        });
    });
     //approve a design ajax
    document.querySelectorAll(".approve").forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/approve", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: formData,
            })
            .then(res => {
                if (res.ok) {
                    const overlay = form.closest(".additem");
                    if (overlay) {
                        overlay.style.display = "none";
                    }
                    product();
                } else {
                    alert("Failed to add order.");
                }
            })
            .catch(err => {
                console.error("Error:", err);
            });
        });
    });
    //delete a design ajax
    document.querySelectorAll(".deleteProduct").forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/deletedesign", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: formData,
            })
            .then(res => {
                if (res.ok) {
                    const overlay = form.closest(".deleteitem");
                    if (overlay) {
                        overlay.style.display = "none";
                    }
                    product();
                } else {
                    alert("Failed to delete order.");
                }
            })
            .catch(err => {
                console.error("Error:", err);
            });
        });
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

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("buttonorders").addEventListener("click", orders);
});
function sortorders() {
    const sort = document.getElementById('sortStatus').value;
  
    const pendingList = document.getElementById('pendingOrders');
    const shipList = document.getElementById('shippedOrders');
    const completeList = document.getElementById('completedOrders')
  
    if (sort === 'pending') {
        pendingList.style.display = 'block';
        shipList.style.display = 'none';
        completeList.style.display='none';
    } else if (sort === 'shipped') {
        pendingList.style.display = 'none';
        shipList.style.display = 'block';
        completeList.style.display='none'
    }else if(sort === 'delivered'){
        pendingList.style.display = 'none';
        shipList.style.display = 'none';
        completeList.style.display='block' 
    }
  }
function orders(){
    fetch("/orders?_t=" + new Date().getTime())
    .then(res => res.text())
    .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const dashboardContent = doc.querySelector(".ordercontainer");

        if (dashboardContent) {
            document.getElementById("title1").innerHTML = "<div>Orders</div>";
            const content = document.getElementById("body1");
            content.innerHTML = "";

            content.appendChild(dashboardContent.cloneNode(true));
            document.getElementById('sortStatus').addEventListener('change', sortorders);
            const overlays = doc.querySelectorAll(".overlay");
            overlays.forEach(overlay => {
                content.appendChild(overlay.cloneNode(true));
            });

            attachOverlayEvents();

            document.getElementById('body1').style.display = 'grid';
        } else {
            const emptyOrder = doc.querySelector('.emptyOrder')
            if(emptyOrder){
                const content = document.getElementById('body1')
                content.innerHTML=""
                content.appendChild(emptyOrder.cloneNode(true))
            }
        }
    })
    .catch((err) => console.error("Failed to load orders content:", err));
}
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
            const emptyProduct = doc.querySelector('.emptyProduct')
            if(emptyProduct){
                const content = document.getElementById('body1')
                content.innerHTML=""
                content.appendChild(emptyProduct.cloneNode(true))
            }
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
    const orderElements = document.querySelectorAll(".order");
    const overlayElements = document.querySelectorAll(".overlay");

    orderElements.forEach((orderEl, index) => {
        const overlayEl = overlayElements[index];

        if (overlayEl) {
            orderEl.addEventListener("click", function () {
                overlayEl.style.display = "grid";
                orderEl.classList.add("blurred");
            });

            const rejectBtn = overlayEl.querySelector(".reject01");
            if (rejectBtn) {
                rejectBtn.addEventListener("click", function () {
                    overlayEl.style.display = "none";
                    orderEl.classList.remove("blurred");
                });
            }
        }
    });
    document.querySelectorAll(".accept-form").forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/acceptorder", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: formData,
            })
            .then(res => {
                if (res.ok) {
                    const overlay = form.closest(".overlay");
                    if (overlay) {
                        overlay.style.display = "none";
                    }
                    const blurredOrder = document.querySelector(".order.blurred");
                    if (blurredOrder) {
                        blurredOrder.classList.remove("blurred");
                    }
                    
                    orders();
                } else {
                    alert("Failed to accept order.");
                }
            })
            .catch(err => {
                console.error("Error:", err);
            });
        });
    });
    //ship
    document.querySelectorAll(".accept-form2").forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

            fetch("/completeorder", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: formData,
            })
            .then(res => {
                if (res.ok) {
                    const overlay = form.closest(".overlay");
                    if (overlay) {
                        overlay.style.display = "none";
                    }
                    const blurredOrder = document.querySelector(".order.blurred");
                    if (blurredOrder) {
                        blurredOrder.classList.remove("blurred");
                    }
                    
                    orders();
                } else {
                    alert("Failed to accept order.");
                }
            })
            .catch(err => {
                console.error("Error:", err);
            });
        });
    });
}   