


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
                const input = document.getElementById('editPrice');

                input.readOnly = false; // NOT readonly

                // Prevent typing and pasting
                input.addEventListener('keydown', (e) => {
                e.preventDefault(); // block key input
                });
                input.addEventListener('paste', (e) => {
                e.preventDefault(); // block paste
                });

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
            loadloading()
            fetch("/products    ", {
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
                clearLoading()
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

            loadloading()   
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
                clearLoading()
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
            loadloading()
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
                clearLoading()
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
            loadloading()
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
                clearLoading()
                console.error("Error:", err);
            });
        });
    });
}
function loadloading(){
    fetch('/loading')
    .then(res => res.text())
    .then((html)=>{
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const loading = doc.querySelector('.loader-wrapper')
        if(loading){
           const content =document.getElementById('body1')
            content.innerHTML=''
            content.appendChild(loading)
        }else{
            console.log('error loading')
        }
    }).catch((err) => console.error("Failed to load dashboard content:", err))
}
function clearLoading() {
    const body = document.getElementById('body1');
    const loader = body.querySelector('.loader-wrapper');
    if (loader) {
        loader.remove();
    }
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
     document.addEventListener('click', function(event) {
            const nav = document.querySelector('.nav');
            const menu = document.getElementById('menu');
            const hamburger = document.querySelector('.hamburger');
            
            if (!nav.contains(event.target) && menu.classList.contains('active')) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
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
            const overlays = doc.querySelectorAll(".checkout-container-layout2");
            overlays.forEach(overlay => {
                content.appendChild(overlay.cloneNode(true));
            });

            attachOverlayEvents();

            document.getElementById('body1').style.display = 'grid';
            
            bouncesearchorders()
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

function bouncesearch() {
    // Debounce utility
    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    const searchInput = document.querySelector('.searchbars');
    const resultsContainer = document.querySelector('.items-3');

    // Fetch and render search results
    const fetchResults = debounce(function () {
        const query = searchInput.value;

        if (query.trim() === '') {
            product(); // fallback function
            return;
        }

        fetch(`/search-products?query=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(products => {
                resultsContainer.innerHTML = '';

                if (products.length === 0) {
                    resultsContainer.innerHTML = '<p>No results found.</p>';
                    return;
                }

                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');

                    productCard.innerHTML = `
                        <input type="hidden" name="productId" value="${product.productId}">
                        <img src="/storage/${product.productImg}" alt="${product.name}">
                        <div class="product-info">
                            <div class="product-name">${product.name}
                                <div class="status1">${product.viewStatus}</div>
                            </div>
                            <div class="product-type">Type: ${product.printType}
                                <p>View: ${product.status}</p>
                            </div>
                        </div>
                        <div class="product-actions">
                            <button class="edit-btn editbutton" 
                                data-id="${product.productId}" 
                                data-name="${product.name}" 
                                data-price="${product.price}" 
                                data-type="${product.type}" 
                                data-printtype="${product.printType}" 
                                data-productimg="/storage/${product.productImg}" 
                                data-status="${product.status}" 
                                data-viewstatus="${product.viewStatus}">
                                EDIT
                            </button>
                            <button class="delete-btn deletebutton" 
                                data-id="${product.productId}" 
                                data-name="${product.name}" 
                                data-price="${product.price}" 
                                data-type="${product.type}" 
                                data-printtype="${product.printType}" 
                                data-productimg="/storage/${product.productImg}">
                                DELETE
                            </button>
                        </div>
                    `;

                    resultsContainer.appendChild(productCard);
                });
            });
    }, 300);

    // Start listening to search input
    searchInput.addEventListener('input', fetchResults);

    // Delegate edit/delete button events
    resultsContainer.addEventListener('click', function (e) {
        const target = e.target;

        // EDIT BUTTON HANDLER
        if (target.classList.contains('editbutton')) {
            const btn = target;
            document.getElementById('editId').value = btn.dataset.id;
            document.getElementById('editName').value = btn.dataset.name;
            document.getElementById('editPrice').value = btn.dataset.price;
            document.getElementById('editCategory').value = btn.dataset.type;
            document.getElementById('editprintType').value = btn.dataset.printtype;
            document.getElementById('editProductImage1').src = btn.dataset.productimg;
            document.getElementById('add-status').value = btn.dataset.status;

            document.getElementById('editModal').style.display = 'block';
        }

        // DELETE BUTTON HANDLER
        if (target.classList.contains('deletebutton')) {
            const btn = target;
            document.getElementById('deleteId').value = btn.dataset.id;
            document.getElementById('deleteName').value = btn.dataset.name;
            document.getElementById('deletePrice').value = btn.dataset.price;
            document.getElementById('deleteType').value = btn.dataset.type;
            document.getElementById('deletePrintType').value = btn.dataset.printtype;
            document.getElementById('deleteProductImage').src = btn.dataset.productimg;

            document.querySelector('.deleteitem').style.display = 'block';
        }
    });
}
function bouncesearchorders() {
    // Debounce utility function
    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    const searchInput = document.getElementById('search1');
    const allOrders = document.querySelectorAll('.acceptOrder .order, .completeOrder .order, .completedOrders .order');

    function filterOrders() {
        const query = searchInput.value.toLowerCase();

        allOrders.forEach(order => {
            const textContent = order.textContent.toLowerCase();
            order.style.display = textContent.includes(query) ? '' : 'none';
        });
    }

    const debouncedFilter = debounce(filterOrders, 300);

    searchInput.addEventListener('input', debouncedFilter);
}
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function searchReports() {
    const searchTerm = document.getElementById('searchReportsInput').value;

    fetch(`/api/search-reports?query=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
            updateGroupedTable(data.groupedData); // You already have this function
        })
        .catch(error => {
            console.error('Error searching reports:', error);
            document.getElementById('ordersTableBody').innerHTML =
                '<tr><td colspan="5" class="no-data">Error searching reports</td></tr>';
        });
}

const debouncedSearchReports = debounce(searchReports, 300);

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchReportsInput');
    searchInput.addEventListener('input', debouncedSearchReports);
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
            bouncesearch()
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
    const overlayElements = document.querySelectorAll(".checkout-container-layout2");

    orderElements.forEach((orderEl, index) => {
        const overlayEl = overlayElements[index];

        if (overlayEl) {
            orderEl.addEventListener("click", function () {
                overlayEl.style.display = "grid";
                orderEl.classList.add("blurred");
            });

            const rejectBtn = overlayEl.querySelector("#reject01");
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
            loadloading()
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
                    clearLoading()
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
            loadloading()

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
                clearLoading()
                console.error("Error:", err);
            });
        });
    });
}   

//reports

window.filterReports = function(period) {
    // Update table headers first
    updateTableHeaders(period);
    
    const tbody = document.getElementById('ordersTableBody');
    if (tbody) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">Loading...</td></tr>';
    }
    
    fetch(`/api/sales-report?filter=${period}`)
        .then(response => response.json())
        .then(data => {
            // Update summary
            const summaryTitle = document.getElementById('summaryTitle');
            const summaryAmount = document.getElementById('summaryAmount');
            
            if (summaryTitle) {
                summaryTitle.textContent = `Total Sales (${period.charAt(0).toUpperCase() + period.slice(1)})`;
            }
            if (summaryAmount) {
                summaryAmount.textContent = `₱${data.totalSales.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
            }
            
            // Update table with grouped data
            updateGroupedTable(data.groupedData, period);
        })
        .catch(error => {
            console.error('Error:', error);
            const tbody = document.getElementById('ordersTableBody');
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="5" class="no-data">Error loading data</td></tr>';
            }
        });
};

function updateGroupedTable(groupedData, period) {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (groupedData && groupedData.length > 0) {
        groupedData.forEach(group => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${group.label}</strong></td>
                <td>${group.period}</td>
                <td>${group.orderCount} orders</td>
                <td>₱${group.sales.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                <td>${group.date}</td>
            `;
            tbody.appendChild(row);
        });
    } else {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">No data found for the selected period</td></tr>';
    }
}

function updateTableHeaders(period) {
    const thead = document.querySelector('.reports-table thead tr');
    if (!thead) return;
    
    let headers = '';
    switch(period) {
        case 'daily':
            headers = `
                <th>Hour</th>
                <th>Time Range</th>
                <th>Orders</th>
                <th>Sales Amount</th>
                <th>Date</th>
            `;
            break;
        case 'weekly':
            headers = `
                <th>Day</th>
                <th>Date</th>
                <th>Orders</th>
                <th>Sales Amount</th>
                <th>Full Date</th>
            `;
            break;
        case 'monthly':
            headers = `
                <th>Week</th>
                <th>Date Range</th>
                <th>Orders</th>
                <th>Sales Amount</th>
                <th>Period</th>
            `;
            break;
        case 'yearly':
            headers = `
                <th>Month</th>
                <th>Period</th>
                <th>Orders</th>
                <th>Sales Amount</th>
                <th>Full Period</th>
            `;
            break;
    }
    
    thead.innerHTML = headers;
}

function searchOrders() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#ordersTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Initialize when DOM is loaded or when reports content is loaded
function initializeReports() {
    // Load initial data
    if (typeof filterReports === 'function') {
        filterReports('monthly');
    }
    
    // Add search event listener
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', searchOrders);
    }
}

// Listen for both DOMContentLoaded and a custom event for when content is appended
document.addEventListener('DOMContentLoaded', initializeReports);

// Custom event for when reports content is dynamically loaded
document.addEventListener('reportsContentLoaded', initializeReports);

// Alternative: Use MutationObserver to detect when report content is added
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            const reportContent = document.querySelector('.reportcontent');
            if (reportContent && !reportContent.dataset.initialized) {
                reportContent.dataset.initialized = 'true';
                initializeReports();
            }
        }
    });
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});