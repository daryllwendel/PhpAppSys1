<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('css/CustomerAddtoCart.css')}}">
    <script src="{{asset('js/customerJS.js')}}"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
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
                    <div class="shopping-cart-item" data-productid="{{ $item->product_id }}">
                        <input type="hidden" name="product_id" value="{{ $item->product_id }}" class="product_id" id="product_id">
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
                                        <input 
                                            type="text" 
                                            name="set[{{ $item->product_id }}][{{ $items->size }}]" 
                                            class="shopping-cart-quantity-input" 
                                            value="0" 
                                            data-price="{{ $item->price }}">
                                        <button type="button" class="shopping-cart-quantity-btn plus">+</button>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    
                    <form action="/deletecart" class="deletecart" method="POST">
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
                @endforeach
                <div class="shopping-cart-footer">  
                    <button class="shopping-cart-checkout-btn" id="checkout-btn">Proceed to Checkout</button>
                    <div class="shopping-cart-total">
                        <span>Total:</span>
                        <span id="cart-total">₱0.00</span>
                    </div>
                </div>
            @else
                <div style="text-align: center; padding: 40px 0;">
                    <h2>Oops, Your Cart is Empty</h2>
                    <button class="shopping-cart-checkout-btn" id="back1" style="margin-top: 20px;">Back</button>
                </div>
            @endif
        </div>
    </div>

    <div class="checkout-form" id="checkout-form">
        <h2>Checkout</h2>
        
        <div class="checkout-container-layout">
            <div class="shipping-details">
                <form action="/checkout" class="checkout" method="POST" id="checkout-form" onclick="return addresscheck()">
                    @csrf
                    <h3>Shipping Information</h3>
                    
                    <label for="recipient">Recipient</label><br>
                    <div class="form-group">
                        <label for="recipient">Recipient Name</label>
                        <input type="text" id="recipient" name="recipient" value="{{ Auth::user()->name}}" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="{{ Auth::user()->email}}" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="contact">Contact Number:</label>
                        <input type="text" id="contact" name="contact" value="{{ Auth::user()->mobile_number }}" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="address">Address</label>
                    </div>
                    <div class="form-group">
                        <label for="subtotal">Province:</label>
                        <input type="text" id="province" name="province" value="{{Auth::user()->Province }}" class="form-control" readonly>
                    </div>
                    <div class="form-group">
                        <label for="city">City:</label>
                        <input type="text" id="city" name="city" class="form-control" value="{{Auth::user()->City }}" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label for="barangay">Barangay:</label>
                        <input type="text" id="barangay" name="barangay" class="form-control" value="{{Auth::user()->Baranggay }}" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label for="purok">Purok:</label>
                        <input type="text" id="purok" name="purok" class="form-control" value="{{Auth::user()->Purok }}" readonly>
                    </div>
                    <div class="form-group">
                        <label for="subtotal">ZipCode:</label>
                        <input type="text" id="zipcode" name="zipcode" value="{{Auth::user()->ZipCode }}" class="form-control" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label for="subtotal">Sub-total:</label>
                        <span id="cart-total1">₱0.00</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="payment">Payment Option:</label>
                        <select id="payment" name="payment_method" class="form-control" required>
                            <option value=""></option>
                            @foreach ($paymentname as $item)
                            <option 
                                name="{{ $item->paymentMethodId }}"
                                value="{{ $item->paymentMethodId }}" 
                                data-charge="{{ $item->charge }}">
                                {{ $item->paymentName }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="charge">Charge:</label>
                        <span id="charge-total">₱0.00</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="grand-total">Grand Total:</label>
                        <input type="text" id="grand-total" name="grand_total" value="<SUBTOTAL + CHARGE>" class="form-control" readonly>
                    </div>
                    
                    <div class="checkout-buttons">
                        <button type="submit" class="order-btn">Order</button>
                        <button type="button" class="cancel-btn" id="cancel-btn">Cancel</button>
                    </div>
                    
                    <!-- Hidden inputs for order items data -->
                    <input type="hidden" id="order-items-data" name="order_items" value="">
               
            </div>
            
            <div class="order-summary">
                <h3>Order Summary</h3>
                <div class="order-items" id="checkout-items-container">
                    @foreach ($order_items as $item)
                        @php
                            $sizes = App\Models\ProductSize::where('product_id', $item->product_id)->get();
                        @endphp
                        <div class="order-item" data-productid="{{ $item->product_id }}">
                            <div class="order-item-details">
                                <input type="hidden" name="productId1" value="{{ $item->product_id }}">
                                <img src="{{ asset('storage/' . $item->productImg) }}" alt="">
                                <span class="order-item-name1">{{ $item->name }}</span>
                                <span class="order-item-type1">{{ $item->type }}</span>
                                <div>
                                    @foreach($sizes as $size)
                                        <span class="size-badge">{{ $size->size }}</span>
                                        <span class="quantity-size" data-size="{{ $size->size }}"></span><br>
                                        <span class="total-price" data-size="{{ $size->size }}" data-price="{{ $item->price }}"></span><br>
                                        <input type="hidden" name="quantity1[{{ $item->product_id }}][{{ $size->size }}]" id="quantity1" value="">
                                        <input type="hidden" name="price1[{{ $item->product_id }}][{{ $item->price }}]" id="price1" value="">
                                        <input type="hidden" name="size1[{{ $item->product_id }}][{{ $size->size }}]" id="size1" value="{{ $size->size }}">
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    @endforeach

                </div>
                
                <div class="order-total">
                    <h4>Sub-Total: ₱ <span id="checkout-subtotal">0.00</span></h4>
                </div>
            </div>
        </form>
        </div>
    </div>
     <div class="confirmation-container"    >
        <div class="floating-elements">
            <div class="floating-bag">👜</div>
            <div class="floating-crown">👑</div>
            <div class="floating-time">⏰</div>
            <div class="floating-coin">🪙</div>
        </div>
        
        <div class="success-icon">
            <div class="cart-icon"></div>
        </div>
        
        <h1 class="confirmation-title">Your Order has been submitted for approval!</h1>
        
        <p class="confirmation-message">
            Hang tight! We're reviewing your order and will send you a confirmation shortly.<br><br>
            Please wait while we review your order. A confirmation email or SMS will be sent once your order is approved and ready for shipping.
        </p>
        
        
        <div class="action-buttons">
            <a href="#" class="btn-primary">See My Orders</a>
            <a href="#" class="btn-secondary">Back to Home</a>
        </div>
    </div>
    <script>const currentCustomerId = {{ Auth::id() }};</script>
    <script src="{{asset('js/customerJS.js')}}"></script>
    
</body>
</html>