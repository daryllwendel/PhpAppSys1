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

function optionitem(){
    const additem = document.querySelector(".addbutton")
    const deleteitem = document.querySelector(".deletebutton");
    const edititem = document.querySelectorAll("#editbutton");

    const add = document.querySelector(".additem");
    const close1 = document.querySelector(".reject button");

    const edit = document.querySelector(".edititem");
    const close2 = document.querySelector(".reject2 button");

    const delete2 = document.querySelector(".deleteitem");
    const close3 = document.querySelector(".reject3 button");

    const productcontainer =document.querySelector(".productcontainer");
    const item3 = document.querySelector(".items-3");
    const item4 = document.querySelector(".items-3 img");

    additem.addEventListener("click", function () {
        add.style.display = "grid";
        productcontainer.style.filter="blur(10px)"
        productcontainer.style.pointerEvents="none";
    })

    close1.addEventListener("click", function () {
        add.style.display = "none";
        productcontainer.style.filter="blur(0)"
        productcontainer.style.pointerEvents="auto";
    })

    edititem.forEach(button => {
        button.addEventListener("click", function () {
            edit.style.display = "grid";
            productcontainer.style.filter = "blur(10px)";
            productcontainer.style.pointerEvents="none";
        });
    });

    close2.addEventListener("click", function () {
        edit.style.display = "none";
        productcontainer.style.filter="blur(0)"
        productcontainer.style.pointerEvents="auto";
    })

    deleteitem.addEventListener("click", function () {
        delete2.style.display = "grid";
        productcontainer.style.filter="blur(10px)"
        productcontainer.style.pointerEvents="none";

    })

    close3.addEventListener("click", function () {
        delete2.style.display = "none";
        productcontainer.style.filter="blur(0)"
        productcontainer.style.pointerEvents="auto";
    })
}
function loaddashboard(){
        fetch("/dashboarddisplay")
        .then(res => res.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const dashboardContent = doc.querySelector(".dashboardcontainer");
            if(dashboardContent){
                document.getElementById("title1").innerHTML =`
                <div>Home</div>`
                console.log('haaha')
                const content = document.getElementById("body1");
                content.innerHTML = "";
                content.appendChild(dashboardContent)
                swiper()
                loadCharts()
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

document.addEventListener("DOMContentLoaded",function (){
    document.getElementById("buttonorders").addEventListener("click", function () {
        fetch("/orders")
            .then(res => res.text())
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                const dashboardContent = doc.querySelector(".ordercontent");
                const overlay = doc.querySelector(".overlay");
                if(dashboardContent){
                    document.getElementById("title1").innerHTML =`
                    <div>Orders</div>
                    <img src="/images/profile.jpg" alt="">`
                    const content = document.getElementById("body1");
                    content.innerHTML = "";
                    content.appendChild(dashboardContent)
                    content.appendChild(overlay)
                    attachOverlayEvents()
                }else{
                    console.log("Error ga")
                }
            })
            .catch((err) => console.error("Failed to load dashboard content:", err))
    })
})


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("buttonproducts").addEventListener("click", function () {
        fetch("/product")
            .then((res) => res.text())
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                const dashboardContent = doc.querySelector(".productcontainer");
                const deleteitem = doc.querySelector(".deleteitem");
                const edititem = doc.querySelector(".edititem");
                const additem = doc.querySelector(".additem")

                if (dashboardContent) {
                    document.getElementById("title1").innerHTML =`
                    <div>Products</div>
                    <img src="/images/profile.jpg" alt="">`
                    const content = document.getElementById("body1");
                    content.innerHTML = "";
                    content.appendChild(dashboardContent);
                    content.appendChild(deleteitem);
                    content.appendChild(edititem);
                    content.appendChild(additem);
                    optionitem();
                } else {
                    console.error("The element .productscontainer was not found.");
                    console.log(dashboardContent)
                    console.log(deleteitem)
                }
            })
            .catch((err) => console.error("Failed to load dashboard content:", err));
    });

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
                    <div>Reports</div>
                    <img src="/images/profile.jpg" alt="">`
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