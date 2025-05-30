<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>SM Clothing </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/landingStyle.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_forward" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
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
        </div>
        <div class="subTitle1">
            <div>Hot Designs🔥</div>
            <img src="images/sampleimg.png" alt="">
        </div>
        <div class="hotDesigns">
            @if($productCount > 0)
                <div class="hotDesigns-container swiper">

                    <div class="card-wrapper">

                        <ul class="card-list swiper-wrapper">
                            @foreach($all as $item)
                                <li class="card-item swiper-slide">
                                    <button class="card-link" id="card-link">
                                        <img src="{{ asset('storage/' . $item->productImg) }}" alt="{{ $item->name }}"
                                            class="card-image">
                                        <h2 class="card-title">{{ $item->name }}</h2>
                                    </button>
                                    <button class="buy-button card-link" data-id="{{ $item->productId }}"
                                        data-name="{{ $item->name }}" data-price="{{ $item->price }}"
                                        data-type="{{ $item->type }}" data-printtype="{{ $item->printType }}"
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
                <a href="" class="explore-new-button">Explore New Designs</a>

            @else
                <div style="color: rgba(0,0,0,0.29);text-align: center;" class="emptyProduct">
                    <h2>Oops! Product is Empty</h2>
                </div>
            @endif

        </div>
        <div class="subTitle2">
            <div></div>
            <div>New Designs</div>
        </div>
        <div class="newDesigns">
            @if($productCount > 0)
                <div class="newDesigns-container swiper">
                    <div class="card-wrapper">
                        <ul class="card-list swiper-wrapper">
                            @foreach($all as $item)
                                <li class="card-item swiper-slide">
                                    <button class="card-link" id="card-link">
                                        <img src="{{ asset('storage/' . $item->productImg) }}" alt="{{ $item->name }}"
                                            class="card-image">
                                        <h2 class="card-title">{{ $item->name }}</h2>
                                    </button>
                                    <button class="buy-button card-link" data-id="{{ $item->productId }}"
                                        data-name="{{ $item->name }}" data-price="{{ $item->price }}"
                                        data-type="{{ $item->type }}" data-printtype="{{ $item->printType }}"
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
                    <a class="add-design-button" href=""><img src="images/add-design.png" alt="">Add A Design</a>
                    <a href="" class="customize-design-button"><img src="images/custom-design.png" alt="">Customize a
                        Design</a>
                </div>
            @else
                <div style="color: rgba(0,0,0,0.29);text-align: center;" class="emptyProduct">
                    <h2>Oops! Your Product is Empty</h2>
                </div>
            @endif
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="{{asset("js/slidescript.js")}}"></script>
</body>

</html>