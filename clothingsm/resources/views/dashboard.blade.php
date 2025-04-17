
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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
<div class="nav">
    <div class="userNav">
        <img src="{{ asset('images/profile.jpg') }}" alt="">
        <button><p class="customer-name">Admin</p>
            <p>Administrator</p></button>
        <a href="../../../login" class="login-button">Log Out</a>
        <div class="hamburger" onclick="toggleMenu()">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <div class="buttonsNav">
        <div class="menu">
            <button class="nav-button" id="buttondashboard">Dashboard</button>
            <button class="nav-button" id="buttonorders">Orders</button>
            <button class="nav-button" id="buttonproducts">Products</button>
            <button class="nav-button" id="buttonreport">Reports</button>
        </div>
    </div>

</div>
<div class="title1" id="title1">
    <div>Dashboard</div>
    <img src="{{ asset('images/profile.jpg') }}" alt="">
</div>
<div class="body1" id="body1"></div>
</body>
</html>