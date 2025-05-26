<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
  <link rel="stylesheet" href="{{ asset("css/CustomerNewOrder-display.css")}}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
  <div class="customerNewOrder-container" id="customerNewOrder-container">
        <div class="product-grid">
          @foreach ($newdesign as $item)
            <div class="product-card">
                <div class="product-image">
                    <div class="placeholder-image">
                      <img src="{{ asset('storage/' . $item->productImg) }}" alt="">
                    </div>
                    <div class="special-tag">gr out hits a special place in your heart</div>
                </div>
                <div class="product-info">
                    <div class="product-number">{{$item->name}}</div>
                    <button class="buy-button"
                    data-id4="{{ $item->productId }}" 
                    data-name4="{{ $item->name }}" 
                    data-price4="{{ $item->price }}" 
                    data-type4="{{ $item->type }}" 
                    data-printtype4="{{ $item->printType }}" 
                    data-img4="{{ asset('storage/' . $item->productImg) }}"
                    data-status4="{{ $item->status }}"
                    >Buy</button>
                </div>
            </div>    
          @endforeach
        </div>
    </div>

    <div class="overlay" id="overlay">
  <div class="product-modal" id="product-modal">
      <form action="/addtocart" method="POST" class="newdesigncart">
        @csrf
        <input type="hidden" name="customerId" value="{{ Auth::id() }}">
        <input type="hidden" name="productId" id="productId" >
        <input type="hidden" name="price" id="productPrice4">

          <button type="button" class="close-btn" aria-label="Close" id="close-btn">×</button>
          <div class="modal-header" name="product_name">Black and Yellow Gaming Sports Jersey</div>
          
          <img src="{{ asset('storage/product-image.jpg') }}" alt="Black and Yellow Gaming Sports Jersey" class="product-image" id="product-image4">
          
          <div class="product-info">
              <div class="price" id="price4"></div>
          </div>
          
          <div class="button-container">
              <button type="submit" class="add-to-cart-btn">Add to cart</button>
          </div>
      </form>
  </div>
</div>
</body>
</html>  