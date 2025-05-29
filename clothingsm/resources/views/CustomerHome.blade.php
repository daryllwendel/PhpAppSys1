<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="csrf-token" content="{{ csrf_token() }}">
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
            @foreach($all as $item)
            <li class="card-item swiper-slide">
              <button class="card-link" id="card-link">
                <img src="{{ asset('storage/' . $item->productImg) }}" alt="{{ $item->name }}" class="card-image">
                <h2 class="card-title">{{ $item->name }}</h2>
              </button>
              <button class="buy-button card-link"
                data-id="{{ $item->productId }}"
                data-name="{{ $item->name }}"
                data-price="{{ $item->price }}"
                data-type="{{ $item->type }}"
                data-printtype="{{ $item->printType }}"
                data-img="{{ asset('storage/' . $item->productImg) }}"
                data-status="{{ $item->status }}">
                Buy
              </button>
            </li>
            @endforeach
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
      <button id="explore" class="explore-new-button">Explore New Designs</button>
    </div>
    <div class="subTitle2">
      <div></div>
      <div>New Designs</div>
    </div>
    <div class="newDesigns">
      <div class="newDesigns-container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            @foreach($all as $item)
            <li class="card-item swiper-slide">
              <button class="card-link">
                <img src="{{ asset('storage/' . $item->productImg) }}" alt="{{ $item->name }}" class="card-image">
                <h2 class="card-title">{{ $item->name }}</h2>
              </button>
              <button class="buy-button card-link"
                data-id="{{ $item->productId }}"
                data-name="{{ $item->name }}"
                data-price="{{ $item->price }}"
                data-type="{{ $item->type }}"
                data-printtype="{{ $item->printType }}"
                data-img="{{ asset('storage/' . $item->productImg) }}"
                data-status="{{ $item->status }}">
                Buy
              </button>
            </li>
            @endforeach
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
      <div class="newDesigns-selection-container">
        <button id="add-design-button" class="explore-new-button">
          <img src="{{asset("images/add-design.png")}}" alt="">
          Add A Design
        </button>
        {{-- <button id="customize-design-button" class="explore-new-button">
          <img src="{{asset("images/custom-design.png")}}" alt="">
          Customize a Design
        </button> --}}
      </div>
    </div>
  </div>
</div>
<div class="overlay" id="overlay">
  <div class="product-modal" id="product-modal">
      <form action="/addtocart" method="POST" class="addtocart">
        @csrf
        <input type="hidden" name="customerId" value="{{ Auth::id() }}">
        <input type="hidden" name="productId" id="productId" >
        <input type="hidden" name="price" id="productPrice">

          <button type="button" class="close-btn" aria-label="Close" id="close-btn">×</button>
          <div class="modal-header" name="product_name">Black and Yellow Gaming Sports Jersey</div>

          <img src="{{ asset('storage/product-image.jpg') }}" alt="Black and Yellow Gaming Sports Jersey" class="product-image" id="modal-product-image">

          <div class="product-info">
              <div class="price">₱ <span id="modal-price" name="product_price">360</span></div>
          </div>

          <div class="button-container">
              <button type="submit" class="add-to-cart-btn">Add to cart</button>
          </div>
      </form>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="{{asset("js/customerJS.js")}}"></script>
</body>
</html>
