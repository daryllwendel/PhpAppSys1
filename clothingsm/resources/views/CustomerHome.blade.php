<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="{{asset("css/CustomerHome.css")}}">
    <link rel="stylesheet" href="{{asset("CustomerAddADesign-display.css")}}">
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
  <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
  />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=shopping_cart" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=undo" />


</head>
<body>
<div class="main-container">
  <div class="nav">
    <div class="userNav">
      <img src="{{asset("images/sampleimg.png")}}" alt="">
      <button><p class="customer-name">Customer</p>
      <p>Customer</p></button>
      <a href="../../../login" class="login-button">Log Out</a>
      <span class="material-symbols-outlined">
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
  <div class="title" id="title">
    <div>Home</div>
    <img src="{{asset("images/logo.png")}}" alt="">
  </div>
  <div class="change-container" id="change-container">
    <div class="subTitle1">
      <div>Hot Designs🔥</div>
      <img src="{{asset("images/sampleimg.png")}}" alt="">
    </div>
    <div class="hotDesigns">
      <div class="hotDesigns-container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            <li class="card-item swiper-slide">
              <a href="" class="card-link" id="card-link">
                <img src="{{asset("images/sampleimg.png")}}" alt="" class="card-image">

                <h2 class="card-title">Black and Yellow Gaming Sports Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link" id="card-link">
                <img src="{{asset("images/sampleimage2.jpg")}}" alt="" class="card-image">

                <h2 class="card-title">Black and Red Football Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link" id="card-link">
                <img src="{{asset("images/sampleimage3.jpg")}}" alt="" class="card-image">

                <h2 class="card-title">Black, White, and Red Stripe Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link" id="card-link">
                <img src="{{asset("images/sampleimage4.jpg")}}" alt="" class="card-image">
                <h2 class="card-title">Golden State Warriors Style Jersey</h2>
              </a>
            </li>
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
      <a href="" class="explore-new-button">Explore New Designs</a>
    </div>
    <div class="subTitle2">
      <div></div>
      <div>New Designs</div>
    </div>
    <div class="newDesigns">
      <div class="newDesigns-container swiper">
        <div class="card-wrapper">
          <ul class="card-list swiper-wrapper">
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="{{asset("images/sampleimg.png")}}" alt="" class="card-image">

                <h2 class="card-title">Black and Yellow Gaming Sports Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="{{asset("images/sampleimage2.jpg")}}" alt="" class="card-image">

                <h2 class="card-title">Black and Red Football Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="{{asset("images/sampleimage3.jpg")}}" alt="" class="card-image">

                <h2 class="card-title">Black, White, and Red Stripe Jersey</h2>
              </a>
            </li>
            <li class="card-item swiper-slide">
              <a href="" class="card-link">
                <img src="{{asset("images/sampleimage4.jpg")}}" alt="" class="card-image">

                <h2 class="card-title">Golden State Warriors Style Jersey</h2>
              </a>
            </li>
          </ul>
          <div class="swiper-pagination"></div>
          <div class="swiper-slide-button swiper-button-prev"></div>
          <div class="swiper-slide-button swiper-button-next"></div>
        </div>
      </div>
      <div class="newDesigns-selection-container">
        <a class="add-design-button" id="add-design-button" href="#"><img src="../images/add-design.png" alt="">Add A Design</a>
        <a href="" class="customize-design-button"><img src="{{asset("images/custom-design.png")}}" alt="">Customize a Design</a>
      </div>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="{{asset("js/customerJS.js")}}"></script>
<script src="{{asset("js/customer-profile.js")}}"></script>
</body>
<div class="addtocart">
  <div class="buttoncart">
    <button>x</button>
    <span>Cart</span>
  </div>

  <div class="estimate">
    <img src="" alt="">
    <h2>Estimated delivery</h2>
    <h4>10 - 12 Days</h4>
    <hr>
  </div>
  <div class="quantity">
    <img src="{{asset("images/sampleimage2.jpg")}}" alt="">
    <h4>Black and Yellow Gaming Sports Jersey</h4>
    <span>P360</span>
    <input type="number" name="" id="">
    <hr>
  </div>
  <div class="total">
    <button class="but1"><img src="" alt=""><span>Add more items</span></button>
    <p>Subtotal</p>
    <p>P3600</p>
    <p>Delivery</p>
    <p>P 100</p>
    <p>Total</p>
    <p>P3700</p>
  </div>
  <button class="confirm">Review payment and address</button>
</div>


<div class="overlay">

  <div class="view">
    <button> < </button>
    <span><b>View Order</b></span>
  </div>
  <div class="loc">
    <img src="" alt="">
    <h6>Delivery Address</h6>
    <p>Blk 19 Lot 11, Prk. 5, Apoko, Tagum City, Davao del Norte</p>
  </div>
  <div class="payment">
    <img src="" alt="">
    <h6>Payment Method</h6>
    <h4>P3600.00</h4>
    <p>Cash</p>
  </div>
  <div class="ordersum">
    <img src="" alt="">
    <h4>Order Summary</h4>

    <div class="sum1">
      <hr>
      <span>X100</span>
      <span>Black and Yellow Gaming Jersey</span>
      <h4>P3600.00</h4>
      <hr>
    </div>

    <div class="sum2">

      <p>Subtotal</p>
      <div class="div1"><p>P 3600.00</p></div>
      <p>Delivery</p>
      <div class="div1"><p>P 100.00</p></div>
      <p>Total</p>
      <div class="div1"><p><b>P 3700.00</b></p></div>
    </div>
  </div>
  <div class="but"><button class="accept"><span>Place Order</span></button></div>
</div>
</html>