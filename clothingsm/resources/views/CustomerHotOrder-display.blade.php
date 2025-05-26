<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="{{ asset('css/CustomerHotOrder-display.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
     <div class="customerhot-container1">
        <div class="product-grid1">
          @foreach ($mydesign2 as $item)
            <div class="product-card1">
                <div class="product-image1">
                    <div class="placeholder-image1">
                      <img src="{{ asset('storage/' . $item->productImg) }}" alt="">
                    </div>
                    <div class="special-tag1">gr out hits a special place in your heart</div>
                </div>
                <div class="product-info1">
                    <div class="product-number1">{{$item->name}}</div>
                    <button class="buy-button1"
                    data-id2="{{ $item->productId }}" 
                    data-name2="{{ $item->name }}" 
                    data-price2="{{ $item->price }}" 
                    data-type2="{{ $item->type }}" 
                    data-printtype2="{{ $item->printType }}" 
                    data-img2="{{ asset('storage/' . $item->productImg) }}"
                    data-status2="{{ $item->status }}"
                    >Buy</button>
                </div>
            </div>    
          @endforeach
        </div>
    </div>

      <div class="overlay" id="overlay">
  <div class="product-modal" id="product-modal">
      <form action="/addtocart" method="POST" class="hotdesigncart">
        @csrf
        <input type="hidden" name="customerId" value="{{ Auth::id() }}">
        <input type="hidden" name="productId" id="productId" >
        <input type="hidden" name="price" id="productPrice2">

          <button type="button" class="close-btn" aria-label="Close" id="close-btn">×</button>
          <div class="modal-header" name="product_name">Black and Yellow Gaming Sports Jersey</div>
          
          <img src="{{ asset('storage/product-image.jpg') }}" alt="Black and Yellow Gaming Sports Jersey" class="product-image" id="product-image2">
          
          <div class="product-info">
              <div class="price" id="price2"></div>
          </div>
          
          <div class="button-container">
              <button type="submit" class="add-to-cart-btn">Add to cart</button>
          </div>
      </form>
  </div>
</div>
</body>
</html>