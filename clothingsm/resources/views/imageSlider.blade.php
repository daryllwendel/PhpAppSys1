<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_forward" />
    <link rel="stylesheet" href="{{asset("css/imageSliderStyle.css")}}">
    <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
    />
</head>
<body>
    <div class="container swiper">
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

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="{{asset("js/slidescript.js")}}"></script>
</body>
</html>