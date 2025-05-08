<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SM Clothing  </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/landingStyle.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_forward" />
    <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
    />
    <link rel="shortcut icon" href="images/logo.png" type="image/png">
</head>
<body>
  <div class="main-container">
    <div class="nav">
        <div class="userNav">
            <a href="../../../login" class="login-button">Log In</a>
        </div>
        <div class="buttonsNav">
            <a href="">Home</a>
            <a href="">Designs</a>
            <a href="">Profile</a>
            <a href="">Orders</a>
            <a class="nav-add-button"><img src="images/tshirt 2.png" alt="">Add a Design</a>
        </div>
        <div class="hamburger" onclick="toggleMenu()">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <div class="title">
        <div>Home</div>
        {{-- <img src="images/selcouthBG.png" alt=""> --}}
    </div>
    <div class="subTitle1">
        <div>Hot Designs🔥</div>
        <img src="images/sampleimg.png" alt="">
    </div>
      <div class="hotDesigns">
          <div class="hotDesigns-container swiper">
              <div class="card-wrapper">
                  <ul class="card-list swiper-wrapper">
                      <li class="card-item swiper-slide">
                          <a href="" class="card-link">
                              <img src="images/sampleimg.png" alt="" class="card-image">

                              <h2 class="card-title">Black and Yellow Gaming Sports Jersey</h2>
                          </a>
                      </li>
                      <li class="card-item swiper-slide">
                          <a href="" class="card-link">
                              <img src="images/sampleimage2.jpg" alt="" class="card-image">

                              <h2 class="card-title">Black and Red Football Jersey</h2>
                          </a>
                      </li>
                      <li class="card-item swiper-slide">
                          <a href="" class="card-link">
                              <img src="images/sampleimage3.jpg" alt="" class="card-image">

                              <h2 class="card-title">Black, White, and Red Stripe Jersey</h2>
                          </a>
                      </li>
                      <li class="card-item swiper-slide">
                          <a href="" class="card-link">
                              <img src="images/sampleimage4.jpg" alt="" class="card-image">
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
                            <img src="images/sampleimg.png" alt="" class="card-image">

                            <h2 class="card-title">Black and Yellow Gaming Sports Jersey</h2>
                        </a>
                    </li>
                    <li class="card-item swiper-slide">
                        <a href="" class="card-link">
                            <img src="images/sampleimage2.jpg" alt="" class="card-image">

                            <h2 class="card-title">Black and Red Football Jersey</h2>
                        </a>
                    </li>
                    <li class="card-item swiper-slide">
                        <a href="" class="card-link">
                            <img src="images/sampleimage3.jpg" alt="" class="card-image">

                            <h2 class="card-title">Black, White, and Red Stripe Jersey</h2>
                        </a>
                    </li>
                    <li class="card-item swiper-slide">
                        <a href="" class="card-link">
                            <img src="images/sampleimage4.jpg" alt="" class="card-image">

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
            <a class="add-design-button" href=""><img src="images/add-design.png" alt="">Add A Design</a>
            <a href="" class="customize-design-button"><img src="images/custom-design.png" alt="">Customize a Design</a>
        </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script src="js/slidescript.js"></script>
</body>
</html>