<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home</title>
  <link rel="stylesheet" href="{{asset("CustomerHome.css")}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_forward" />
  <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
  />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=shopping_cart" />

</head>
<body>
<div class="main-container">
  <div class="nav">
    <div class="userNav">
      <img src="{{asset("css/sampleimg.png")}}" alt="">
      <button><p class="customer-name">Customer</p>
        <p>Customer</p></button>
      <a href="login.html" class="login-button">Log Out</a>
    </div>
    <div class="buttonsNav">
      <span class="material-symbols-outlined">
        shopping_cart
      </span>
      <button class="nav-button" href="">Home</button>
      <button class="nav-button"  href="">Designs</button>
      <button class="nav-button"  href="">Profile</button>
      <button class="nav-button"  href="">Orders</button>
      <a class="nav-add-button"><img src="{{asset("css/images/tshirt 2.png")}}" alt="">Add a Design</a>
    </div>
  </div>
  <div class="title">
    <div>Home</div>
    <img src="{{asset("css/images/logo.png")}}" alt="">
  </div>
  <div class="change-container" id="change-container">

</div>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="{{asset("js/slidescript.js")}}"></script>
</div>
</body>
</html>

</body>
</html>