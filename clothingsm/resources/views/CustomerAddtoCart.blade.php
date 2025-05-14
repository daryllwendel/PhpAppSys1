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
            @if(isset($order_items))
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
    <script>
        function quantityset() {
            console.log('quantityset function running');
            
            // Function to update the total price based on quantities
            const updateTotal = () => {
                console.log('updateTotal function called');
                let total = 0;
                
                // Get all quantity inputs
                const inputs = document.querySelectorAll('.shopping-cart-quantity-input');
                console.log(`Found ${inputs.length} quantity inputs`);
                
                inputs.forEach((input, index) => {
                    const qty = parseInt(input.value) || 0;
                    const price = parseFloat(input.dataset.price) || 0;
                    console.log(`Item ${index+1}: qty=${qty}, price=${price}, subtotal=${qty * price}`);
                    total += qty * price;
                });
                
                console.log(`Total calculated: ${total}`);
                const totalElement = document.getElementById('cart-total');
                
                if (totalElement) {
                    totalElement.textContent = `₱${total.toFixed(2)}`;
                    console.log('Total updated in DOM');
                } else {
                    console.error('Total element not found in DOM');
                }
            };

            // Set up event listeners for all quantity controls
            const controls = document.querySelectorAll('.shopping-cart-quantity-control');
            console.log(`Found ${controls.length} quantity controls`);
            
            controls.forEach((control, index) => {
                const minus = control.querySelector('.shopping-cart-quantity-btn.minus');
                const plus = control.querySelector('.shopping-cart-quantity-btn.plus');
                const input = control.querySelector('.shopping-cart-quantity-input');
                
                if (!input) {
                    console.error(`Input not found for control ${index}`);
                    return;
                }
                
                if (!input.dataset.price) {
                    console.warn(`No price data found for input ${index}`);
                }
                
                console.log(`Setting up listeners for control ${index}, current value: ${input.value}, price: ${input.dataset.price}`);

                minus.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const oldValue = input.value;
                    input.value = Math.max(0, parseInt(input.value) - 1);
                    console.log(`Minus clicked: ${oldValue} -> ${input.value}`);
                    updateTotal();
                });

                plus.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const oldValue = input.value;
                    input.value = parseInt(input.value) + 1;
                    console.log(`Plus clicked: ${oldValue} -> ${input.value}`);
                    updateTotal();
                });

                // Also update when manually changing the input value
                input.addEventListener('change', function() {
                    console.log(`Input changed: ${this.value}`);
                    updateTotal();
                });
                
                input.addEventListener('input', function() {
                    console.log(`Input typing: ${this.value}`);
                    updateTotal();
                });
            });

            // Initialize the total on page load
            console.log('Initializing total calculation');
            updateTotal();
        }

        // Make sure the DOM is fully loaded before attaching event listeners
        document.addEventListener('DOMContentLoaded', quantityset);

        // Close cart functionality
        document.addEventListener('DOMContentLoaded', function() {
            const backButton = document.getElementById('back');
            const backButton1 = document.getElementById('back1');
            
            if (backButton) {
                backButton.addEventListener('click', function() {
                    window.history.back();
                });
            }
            
            if (backButton1) {
                backButton1.addEventListener('click', function() {
                    window.history.back();
                });
            }
        });
    </script>
</body>
</html>