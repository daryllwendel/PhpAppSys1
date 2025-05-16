<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('css/CustomerAddtoCart.css')}}">
    <script src="{{asset('js/customerJS.js')}}"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=close" />
    <title>Shopping Cart</title>
</head>
<body>
    <div class="shopping-cart">
        <div class="shopping-cart-container">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <span class="material-symbols-outlined" id="back" style="cursor: pointer; margin-right: 20px; font-family: 'Material Symbols Outlined';">X</span>
                <h1 class="shopping-cart-header" style="margin: 0;">Your Cart</h1>
            </div>
            @if(isset($order_items) && $order_items->count() > 0)
                @foreach ($order_items as $item)
                    <div class="shopping-cart-item">
                        <div class="shopping-cart-item-image">
                            <img src="{{ asset('storage/' . $item->productImg) }}" alt="Black and Yellow Gaming Jersey">
                        </div>
                        <div class="shopping-cart-item-details">
                            <h3 class="shopping-cart-item-title">{{$item->name}}</h3>
                            <span class="shopping-cart-item-tag">{{$item->type}}</span>
                            <div class="shopping-cart-item-sizes">
                                @php
                                    $sizes = App\Models\ProductSize::where('product_id', $item->product_id)->get();
                                @endphp
                            Sizes:
                            @foreach($sizes as $size)
                                <span class="size-badge">{{ $size->size }}</span>
                            @endforeach
                            </div>
                            <div class="shopping-cart-item-price">Price: ₱ {{$item->price}}</div>
                        </div>

                        <div class="shopping-cart-quantity-selector">
                            @php
                                    $sizes = App\Models\ProductSize::where('product_id', $item->product_id)->get();
                                @endphp
                                @foreach ($sizes as $items)
                                <div class="shopping-cart-size-row">
                                    <span class="shopping-cart-size-label">{{$items->size}}</span>
                                    <div class="shopping-cart-quantity-control">
                                        <button type="button" class="shopping-cart-quantity-btn minus">-</button>
                                        <input type="text" class="shopping-cart-quantity-input" value="0" data-price="{{ $item->price }}">
                                        <button type="button" class="shopping-cart-quantity-btn plus">+</button>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>

                    <form action="/deletecart" method="POST" onclick="return confirmDelete()">
                        @csrf
                        @method('DELETE')
                        <input type="hidden" name="productId" value="{{ $item->product_id }}">
                        <button class="shopping-cart-remove-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </form>

                <div class="shopping-cart-footer">
                    <button class="shopping-cart-checkout-btn">Proceed to Checkout</button>
                    <div class="shopping-cart-total">
                        <span>Total:</span>
                        <span id="cart-total">₱0.00</span>
                    </div>
                </div>
                @endforeach
            @else
                <div style="text-align: center; padding: 40px 0;">
                    <h2>Oops, Your Cart is Empty</h2>
                    <button class="shopping-cart-checkout-btn" id="back1" style="margin-top: 20px;">Back</button>
                </div>
            @endif
        </div>
    </div>
    <script>const currentCustomerId = {{ Auth::id() }};</script>
    <script src="{{asset('js/customerJS.js')}}"></script>
</body>
</html>
