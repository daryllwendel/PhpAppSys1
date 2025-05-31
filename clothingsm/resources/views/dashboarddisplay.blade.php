<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Display</title>
    <link rel="stylesheet" href="{{ asset('css/dashboarddisplay.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"/>
</head>
<body> 
<div class="main-container">
    <div class="dashboardcontainer">
        <div class="recent">
            <h2>Design</h2>
        </div>
        <div class="slide-container swiper">
            <div class="slide-content">
                <div class="card-wrapper swiper-wrapper">
                    @foreach($product as $product)
                    <div class="card swiper-slide">
                        <div class="image-content">
                            <span class="overlay"></span>
                            <div class="card-image">
                                <img src="{{ asset('storage/' . $product->productImg) }}" alt="{{ $product->name }}" class="card-img">
                            </div>
                        </div> 
                        <div class="card-content">
                            <h2 class="name">{{ $product->name }}</h2>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
    
            <div class="swiper-button-next swiper-navBtn"></div>
            <div class="swiper-button-prev swiper-navBtn"></div>
            <div class="swiper-pagination"></div>
        </div>
    
        <div class="stats"><h2>Statistics</h2></div>
        <div class="item-02-2">
            <div class="totalproduct">
                <img src="{{ asset('images/cart.png') }}">
                <h4>TOTAL PRODUCTS</h4>
                <h2>{{$productCount}}</h2>
            </div>
    
            <div class="totalorder">
                <img src="{{ asset('images/clipboard.png') }}">
                <h4>TOTAL ORDERS</h4>
                <h2>{{$orders}}</h2>
            </div>
    
            <div class="totalsale">
                <img src="{{ asset('images/wallet.png') }}">
                <h4>TOTAL SALES</h4>
                @foreach ($reports as $item)
                <h2> ₱{{$item->totalCharge}}</h2>
                @endforeach
            </div>
        </div>
    
        <div class="chart-container" id="chart-container">
            <div class="chart-title">Sales Performance Over Month</div>
            <div class="charts-container">
                <div class="chart">
                    <canvas class="doughnut" id="doughnut" height="300" width="300"></canvas>
                    <canvas class="barchart" id="barchart" height="300" width="300"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>



<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>
<script src="{{ asset('js/dashboard.js') }}"></script>

</body>
</html>