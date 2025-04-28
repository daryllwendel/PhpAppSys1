<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Smclothing</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="{{asset("css/CustomerHome.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerAddADesign-display.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerProfile.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerOrder-display.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerNewDesigns.css")}}  ">
  <link rel="stylesheet" href="{{asset("css/CustomerHotOrder-display.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerNewOrder-display.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerMyDesignOrder-display.css")}}">
  <link rel="stylesheet" href="{{asset("css/CustomerProductClicked-display.css")}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_forward" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=shopping_cart" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=undo" />


</head>
<body>
<div class="main-container">
  <div class="nav">
    <div class="userNav">
      @if(Auth::user()->profile)
          <img src="{{ asset('storage/' . Auth::user()->profile) }}" alt="Profile Picture">
      @else
          <img src="{{ asset('images/user.png') }}" alt="Profile Picture">
      @endif
      <button><p class="customer-name">{{ $user->username }}</p>
      <p class="name12">{{ $user->name}}</p></button>
      <a href="../../../login" class="login-button">Log Out</a>
      <span class="material-symbols-outlined" id="cartbutton">
        shopping_cart
      </span>
      <div class="hamburger" onclick="toggleMenu()">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="buttonsNav">
      <div class="menu">
        <button class="nav-button" id="home">Home</button>
        <button class="nav-button" id="design">Designs</button>
        <button class="nav-button" id="profile">Profile</button>
        <button class="nav-button" id="order">Orders</button>
        <a class="nav-add-button" id="add"><img src="{{asset("images/tshirt 2.png")}}" alt="">Add a Design</a>
      </div>
    </div>

  </div>
  <div class="title" id="title"></div>
  <div class="change-container" id="change-container"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="{{asset("js/customerJS.js")}}"></script>
</body>
</html>