
        <!DOCTYPE html>
        <html lang="en">
        <head>  
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Smclothing</title>
            <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}"/>
            <link rel="stylesheet" href="{{ asset('css/dashboarddisplay.css') }}"/>
            <link rel="stylesheet" href="{{ asset('css/order.css') }}" />
            <link rel="stylesheet" href="{{ asset('css/products.css') }}" />
            <link rel="stylesheet" href="{{ asset('css/reports.css') }}" />
            <script src="{{ asset('js/dashboard.js') }}"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"/>
            <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>
        </head>
        <body>
        <nav class="nav">
            <div class="userNav">
                <img src="{{ asset('images/selcouth.jpg') }}" alt="Admin Profile">
                <div class="user-info desktop-only">
                    <div class="customer-name">Admin</div>
                    <div class="user-role">Administrator</div>
                </div>
                <form action="/logout" method="POST">
                @csrf
                <button type="submit" class="login-button">Log Out</button>
                </form>     
            </div>
            
            <div class="hamburger" onclick="toggleMenu()">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div class="buttonsNav">
                <div class="menu" id="menu">
                    <input type="hidden" class="nav-button" id="buttondefault" active>
                    <button class="nav-button" id="buttondashboard">Dashboard</button>
                    <button class="nav-button" id="buttonorders">Orders</button>
                    <button class="nav-button" id="buttonproducts">Products</button>
                    <button class="nav-button" id="buttonreport">Reports</button>

                </div>
            </div>
        </nav>

        <div class="title1" id="title1" ></div>

        <div class="body1 fade-in" id="body1" style="display:none">
        <script>const currentCustomerId = {{ Auth::id() }};</script>
     <script>
        function toggleMenu() {
            const menu = document.getElementById('menu');
            const hamburger = document.querySelector('.hamburger');
            
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

       document.addEventListener('DOMContentLoaded', function () {
    const navButtons = document.querySelectorAll('.nav-button');
    const contentArea = document.getElementById('content-area'); 

    navButtons.forEach(button => {
        button.classList.remove('active'); 

        button.addEventListener('click', function () {
            navButtons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');

            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    document.getElementById('buttondefault')?.classList.add('active');
});

        window.addEventListener('resize', function() {
            const menu = document.getElementById('menu');
            const hamburger = document.querySelector('.hamburger');
            
            if (window.innerWidth > 768) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
        document.addEventListener('click', function(event) {
            const nav = document.querySelector('.nav');
            const menu = document.getElementById('menu');
            const hamburger = document.querySelector('.hamburger');
            
            if (!nav.contains(event.target) && menu.classList.contains('active')) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    </script>

        </body>
        </html>