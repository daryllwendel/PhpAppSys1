<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="{{asset("css/empty.css")}}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
</head>
<body>
    <div class="main-container">
        <div class="nav">
            <div class="userNav">
                <img src="{{asset("css/images/sampleimg.png")}}" alt="">
                <a href="login.html" class="login-button">Log In</a>
            </div>
            <div class="buttonsNav">
                <a href="">Home</a>
                <button href="" onclick="display()" id="nav-designs-button" class="nav-designs-button">Designs</button>
                <button href="" onclick="display()" id="nav-profile-button" class="nav-profile-button">Profile</button>
                <button href="" onclick="display()" id="nav-orders-button" class="nav-orders-button">Orders</button>
                <a class="nav-add-button"><img src="{{asset("css/images/tshirt 2.png")}}" alt="">Add a Design</a>
            </div>
        </div>
        <div class="title">
            <div>Home</div>
            <img src="{{assset("css/images/logo.png")}}" alt="">
        </div>
        <div class="change-container">
            <div class="profile" id="profile">Profile</div>
            <div class="designs" id="designs">Design</div>
            <div class="orders" id="orders">Orders</div>
        </div>
    </div>
    <script src="{{asset("js/empty.js")}}"></script>
</body>
</html>