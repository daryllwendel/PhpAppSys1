<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Smclothing</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="{{asset('css/CustomerAddtoCart.css')}}">
  <link rel="stylesheet" href="{{asset('css/CustomerDashboard.css')}}">
  <link rel="stylesheet" href="{{asset("css/CustomerHome.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerAddADesign-display.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerProfile.css")}}">
  <link rel="stylesheet" href="{{asset('css/CustomerOrder-display.css')}}">
  <link rel="stylesheet" href="{{asset("css/CustomerNewDesigns.css")}}  ">
  <link rel="stylesheet" href="{{asset("css/CustomerHotOrder-display.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerNewOrder-display.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerMyDesignOrder-display.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerProductClicked-display.css")}}">
  <link rel="stylesheet" href="{{asset('css/loading.css')}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_forward" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=shopping_cart" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=undo" />
  <link rel="stylesheet" href="{{asset('css/AddtoCart.css')}}">


</head>
<body>
  <div class="main-container">
 <nav class="nav">
            <div class="userNav">
                  <img src="{{ asset('storage/' . Auth::user()->profile) }}" alt="Profile Picture" class="profile-picture">

                <div class="user-info desktop-only">
                    <p class="customer-name">{{ $user->username }}</p>
                    <p class="name12">{{ $user->name}}</p>
                </div>
                <form action="/logout" method="POST">
                @csrf
                <button type="submit" class="login-button">Log Out</button>
                </form>
            </div>
            <span class="material-symbols-outlined" id="cartbutton">
                shopping_cart
            </span>
            <div class="hamburger" onclick="toggleMenu()">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div class="buttonsNav" id="hamboger" >
                <div class="menu" id="menu">
                    <button class="nav-button" id="home">Home</button>
                    <button class="nav-button" id="design">Design</button>
                    <button class="nav-button" id="profile">Profile</button>
                    <button class="nav-button" id="order">Order</button>
                    <a class="nav-add-button" id="add"><img src="{{asset("images/tshirt 2.png")}}" alt="">Add a Design</a>
                </div>
            </div>
        </nav>

        <div class="title1" id="title" ></div>

        <div class="body1 fade-in" id="change-container" >
        </div>
        <script src="{{asset('js/customerJS.js')}}"></script>
         <script src="{{asset('js/customerButtons.js')}}"></script>
        <script>const currentCustomerId = {{ Auth::id() }};</script>
     <script>
        const nav5 = document.getElementById('hamboger');
        const ham = document.querySelector('.hamburger');

    // Check if screen is 768px or less
        const isMobile = window.matchMedia("(max-width: 768px)");

    if (isMobile.matches) {
        ham.addEventListener('click', function() {
            nav5.style.display = 'block'; // Show it
            setTimeout(() => {
                nav5.style.display = 'none'; // Hide it after 1 second
            }, 1000);
        });
    }



        function toggleMenu() {
            const menu = document.getElementById('menu');
            const hamburger = document.querySelector('.hamburger');
            const buttonsNav = document.querySelector('.buttonsNav')

            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
            buttonsNav.style.display='block'

            setTimeout(() => {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
                buttonsNav.style.display='none'
            }, 1000);
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
            const buttonsNav = document.querySelector('.buttonsNav')

            if (window.innerWidth > 768) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
                buttonsNav.style.display='block'

            }
        });
        document.addEventListener('click', function(event) {
            const nav = document.querySelector('.nav');
            const menu = document.getElementById('menu');
            const hamburger = document.querySelector('.hamburger');
            const buttonNav=  document.getElementById('hamboger')

            if (!nav.contains(event.target) && menu.classList.contains('active')) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
                nav.style.display = 'none'
                menu.style.display = 'none'
                hamburger.style.display = 'none'
                buttonNav.style.display='none'
            }
        });
    </script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script src="{{asset("js/customerJS.js")}}"></script>
</body>
</html>
