<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="{{asset("css/CustomerHome.css")}}">
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
  <div class="dashboardtitle" id="dashboardtitle">
    <div>Home</div>
    <img src="{{asset("images/logo.png")}}" alt="">
  </div>
  <div class="customerdashboard" id="customerdashboard">
    <div class="subTitle1">
      <div>Hot Designs🔥</div>
      <img src="{{asset("images/sampleimg.png")}}" alt="">
    </div>
    <div class="hotDesigns">
      <div class="hotDesigns-container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            @foreach($product as $item)
            <li class="card-item swiper-slide">
              <a href="" class="card-link" id="card-link">
                <img src="{{ asset('storage/' . $item->productImg) }}" alt="{{ $item->name }}" class="card-image">
                <h2 class="card-title">{{ $item->name }}</h2>
              </a>
            </li>
            @endforeach
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
      <a href="" id="explore" class="explore-new-button">Explore New Designs</a>
    </div>
    <div class="subTitle2">
      <div></div>
      <div>New Designs</div>
    </div>
    <div class="newDesigns">
      <div class="newDesigns-container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            @foreach($product as $item)
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="{{ asset('storage/' . $item->productImg) }}" alt="{{ $item->name }}" class="card-image">
                <h2 class="card-title">{{ $item->name }}</h2>
              </a>
            </li>
            @endforeach
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
      <div class="newDesigns-selection-container">
        <a class="add-design-button" id="add-design-button" href="#"><img src="../images/add-design.png" alt="">Add A Design</a>
        <a href="#" id="customize-design-button" class="customize-design-button"><img src="{{asset("images/custom-design.png")}}" alt="">Customize a Design</a>
      </div>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="{{asset("js/customerJS.js")}}"></script>

</html>