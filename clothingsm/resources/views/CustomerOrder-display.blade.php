<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Customer Orders</title>
    <link rel="stylesheet" href="{{ asset('css/CustomerOrder-display.css') }}">
</head>
<body>
<div class="orderscont">
    <!-- Top Controls -->
    <div class="top-controls">
        <div class="search-container">
            <input type="text" id="searchInput" class="search-input" placeholder="Search orders...">
            <span class="search-icon">🔍</span>
        </div>
        <div class="status-filter">
            <select id="statusFilter" class="status-dropdown">
                <option value="pending" selected>Pending</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
            </select>
        </div>
    </div>

    <!-- Orders Section -->
    <div class="orders-section" id="ordersSection">
        <div class="section-header">
            <div class="section-title" id="section-title">Pending Orders</div>
            <div class="sort-controls">
                <select id="sortOptions" class="sort-select">
                    <option value="orderNo">Order No.</option>
                    <option value="description">Description</option>
                    <option value="quantity">Quantity</option>
                    <option value="payment">Payment Method</option>
                    <option value="amount">Amount</option>
                </select>
            </div>
        </div>

        <div class="orders-table">
            <div class="table-header">
                <div class="cell cell-order-no">Order No.</div>
                <div class="cell cell-image">Image</div>
                <div class="cell cell-description">Description</div>
                <div class="cell cell-quantity">Quantity</div>
                <div class="cell cell-payment">Payment</div>
                <div class="cell cell-amount">Amount</div>
                <div class="cell cell-status">Status</div>
            </div> 

            <div class="orders-list" id="pendingList">
                @foreach ($pendingOrders as $order)
                <div class="order-row" id="pendingorders">
                    <input type="hidden" value="{{ $order->deliveryStatus }}">
                    <div class="cell cell-order-no" data-column="orderNo">{{ $order->orderId }}</div>
                    <div class="cell cell-image">
                        <img src="{{ asset('storage/' . $order->productImg) }}" class="order-image-img" alt="">
                    </div>
                    <div class="cell cell-description" data-column="description">{{ $order->ProductName }}</div>
                    <div class="cell cell-quantity" data-column="quantity">{{ $order->totalQuantity }}</div>
                    <div class="cell cell-payment" data-column="payment">{{ $order->paymentMethod }}</div>
                    <div class="cell cell-amount" data-column="amount">₱{{ number_format($order->totalItemPrice, 2) }}</div>
                    <div class="cell cell-status">
                        <span class="status-indicator status-pending">{{ $order->deliveryStatus }}</span>
                    </div>
                </div>
  <div class="checkout-form2" id="checkout-form2" style="display: none">
        <div class="checkout-container-layout2">
            <!-- Fixed Header -->
            <div class="modal-header">
                <h2>My Order</h2>
            </div>
            
            <!-- Status Header -->
            <div class="status-header pending">
                <div class="status-icon pending">⚠</div>
                <div class="status-message">
                    <h3>This order is still pending. Don't worry - we're reviewing it and will update you shortly.</h3>
                    <p>We appreciate your patience as we process your order.</p>
                </div>
            </div>
            
            <!-- Main Content Wrapper -->
            <div class="main-content-wrapper">
                <div class="shipping-details2">
                    <h3>Shipping Information</h3>
                    
                    <div class="form-group2">
                        <label for="recipient2">Recipient Name</label>
                        <input type="text" id="recipient2" name="recipient2" value="{{Auth::user()->name}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="email2">Email</label>
                        <input type="email" id="email2" name="email2" value="{{Auth::user()->username}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="contact2">Contact Number</label>
                        <input type="text" id="contact2" name="contact2" value="{{Auth::user()->mobile_number}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="city2">City</label>
                            <input type="text" id="city2" name="city2" class="form-control2" value="{{Auth::user()->City}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="barangay2">Barangay</label>
                            <input type="text" id="barangay2" name="barangay2" class="form-control2" value="{{Auth::user()->Baranggay}}" readonly>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="purok2">Purok</label>
                            <input type="text" id="purok2" name="purok2" class="form-control2" value="{{Auth::user()->Purok}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="zipcode2">ZipCode</label>
                            <input type="text" id="zipcode2" name="zipcode2" value="{{Auth::user()->ZipCode}}" class="form-control" readonly>
                        </div>
                    </div>
                    
                    <div class="form-group2">
                        <label for="subtotal2">Sub-total</label>
                        <span id="cart-total2">₱{{$order->totalItemPrice}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="payment2">Payment Option</label>
                        <span id="payment2">{{$order->paymentMethod}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="charge2">Charge</label>
                        <span id="charge-total2">{{$order->charge}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="grand-total2">Grand Total</label>
                        <input type="text" id="grand-total2" name="grand_total2" value="{{$order->grandTotal}}" class="form-control2" readonly>
                    </div>
                </div>
                
                <div class="order-summary2">
                    <h3>Order Summary</h3>
                    <div class="order-items2" id="checkout-items-container2">
                        <div class="order-item2">
                            <div class="order-item-details2">
                                <img src="{{ asset('storage/' . $order->productImg) }}" alt="Product">
                                <div class="order-item-info">
                                    <span class="order-item-name2">{{$order->ProductName}}</span>
                                    <span class="order-item-type2">{{$order->type}}</span>
                                    <div>
                                        <span class="size-badge2">{{$order->size}} </span>
                                        <span class="quantity-size2">X{{$order->quantity}}</span><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="order-total2">
                        <h4>Sub-Total: ₱ <span id="checkout-subtotal2">{{$order->totalItemPrice}}</span></h4>
                    </div>
                </div>
            </div>
            
            <!-- Fixed Footer with Back Button -->
            <div class="checkout-buttons2">
                <button type="button" class="cancel-btn2" id="cancel-btn2">Back</button>
            </div>
        </div>
    </div>
    
                @endforeach
            </div>

            <div class="orders-list" id="shipList" style="display: none;">
                @foreach ($shippedOrders as $order)
                <div class="order-row">
                    <input type="hidden" value="{{ $order->deliveryStatus }}">
                    <div class="cell cell-order-no" data-column="orderNo">{{ $order->orderId }}</div>
                    <div class="cell cell-image">
                        <img src="{{ asset('storage/' . $order->productImg) }}" class="order-image-img" alt="">
                    </div>
                    <div class="cell cell-description" data-column="description">{{ $order->ProductName }}</div>
                    <div class="cell cell-quantity" data-column="quantity">{{ $order->totalQuantity }}</div>
                    <div class="cell cell-payment" data-column="payment">{{ $order->paymentMethod }}</div>
                    <div class="cell cell-amount" data-column="amount">₱{{ number_format($order->totalItemPrice, 2) }}</div>
                    <div class="cell cell-status">
                        <span class="status-indicator status-pending">{{ $order->deliveryStatus }}</span>
                    </div>
                </div>
                <div class="checkout-form2" id="checkout-form2" style="display: none">
        <div class="checkout-container-layout2">
            <!-- Fixed Header -->
            <div class="modal-header">
                <h2>My Order</h2>
            </div>
            
            <!-- Status Header -->
            <div class="status-header pending">
                <div class="status-icon pending">⚠</div>
                <div class="status-message">
                    <h3>This order is shipped. Don't worry - you'll receive it and will update you shortly.</h3>
                    <p>We appreciate your patience as we process your order.</p>
                </div>
            </div>
            
            <!-- Main Content Wrapper -->
            <div class="main-content-wrapper">
                <div class="shipping-details2">
                    <h3>Shipping Information</h3>
                    
                    <div class="form-group2">
                        <label for="recipient2">Recipient Name</label>
                        <input type="text" id="recipient2" name="recipient2" value="{{Auth::user()->name}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="email2">Email</label>
                        <input type="email" id="email2" name="email2" value="{{Auth::user()->username}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="contact2">Contact Number</label>
                        <input type="text" id="contact2" name="contact2" value="{{Auth::user()->mobile_number}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="city2">City</label>
                            <input type="text" id="city2" name="city2" class="form-control2" value="{{Auth::user()->City}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="barangay2">Barangay</label>
                            <input type="text" id="barangay2" name="barangay2" class="form-control2" value="{{Auth::user()->Baranggay}}" readonly>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="purok2">Purok</label>
                            <input type="text" id="purok2" name="purok2" class="form-control2" value="{{Auth::user()->Purok}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="zipcode2">ZipCode</label>
                            <input type="text" id="zipcode2" name="zipcode2" value="{{Auth::user()->ZipCode}}" class="form-control" readonly>
                        </div>
                    </div>
                    
                    <div class="form-group2">
                        <label for="subtotal2">Sub-total</label>
                        <span id="cart-total2">₱{{$order->totalItemPrice}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="payment2">Payment Option</label>
                        <span id="payment2">{{$order->paymentMethod}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="charge2">Charge</label>
                        <span id="charge-total2">{{$order->charge}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="grand-total2">Grand Total</label>
                        <input type="text" id="grand-total2" name="grand_total2" value="{{$order->grandTotal}}" class="form-control2" readonly>
                    </div>
                </div>
                
                <div class="order-summary2">
                    <h3>Order Summary</h3>
                    <div class="order-items2" id="checkout-items-container2">
                        <div class="order-item2">
                            <div class="order-item-details2">
                                <img src="{{ asset('storage/' . $order->productImg) }}" alt="Product">
                                <div class="order-item-info">
                                    <span class="order-item-name2">{{$order->ProductName}}</span>
                                    <span class="order-item-type2">{{$order->type}}</span>
                                    <div>
                                        <span class="size-badge2">{{$order->size}} </span>
                                        <span class="quantity-size2">X{{$order->quantity}}</span><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="order-total2">
                        <h4>Sub-Total: ₱ <span id="checkout-subtotal2">{{$order->totalItemPrice}}</span></h4>
                    </div>
                </div>
            </div>
            
            <!-- Fixed Footer with Back Button -->
            <div class="checkout-buttons2">
                <button type="button" class="cancel-btn2" id="cancel-btn2">Back</button>
            </div>
        </div>
    </div>
                @endforeach
            </div>

            <div class="orders-list" id="completeList" style="display: none;">
                @foreach ($completedOrders as $order)
                <div class="order-row">
                    <input type="hidden" value="{{ $order->deliveryStatus }}">
                    <div class="cell cell-order-no" data-column="orderNo">{{ $order->orderId }}</div>
                    <div class="cell cell-image">
                        <img src="{{ asset('storage/' . $order->productImg) }}" class="order-image-img" alt="">
                    </div>
                    <div class="cell cell-description" data-column="description">{{ $order->ProductName }}</div>
                    <div class="cell cell-quantity" data-column="quantity">{{ $order->totalQuantity }}</div>
                    <div class="cell cell-payment" data-column="payment">{{ $order->paymentMethod }}</div>
                    <div class="cell cell-amount" data-column="amount">₱{{ number_format($order->totalItemPrice, 2) }}</div>
                    <div class="cell cell-status">
                        <span class="status-indicator status-pending">{{ $order->deliveryStatus }}</span>
                    </div>
                </div>
                  <div class="checkout-form2" id="checkout-form2" style="display: none">
        <div class="checkout-container-layout2">
            <!-- Fixed Header -->
            <div class="modal-header">
                <h2>My Order</h2>
            </div>
            
            <!-- Status Header -->
            <div class="status-header pending">
                <div class="status-icon pending">⚠</div>
                <div class="status-message">
                    <h3>This order is already delivered. We appreciate your business and hope to serve you again soon.</h3>
                    <p>We appreciate your patience. Thank you</p>
                </div>
            </div>
            
            <!-- Main Content Wrapper -->
            <div class="main-content-wrapper">
                <div class="shipping-details2">
                    <h3>Shipping Information</h3>
                    
                    <div class="form-group2">
                        <label for="recipient2">Recipient Name</label>
                        <input type="text" id="recipient2" name="recipient2" value="{{Auth::user()->name}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="email2">Email</label>
                        <input type="email" id="email2" name="email2" value="{{Auth::user()->username}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="contact2">Contact Number</label>
                        <input type="text" id="contact2" name="contact2" value="{{Auth::user()->mobile_number}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="city2">City</label>
                            <input type="text" id="city2" name="city2" class="form-control2" value="{{Auth::user()->City}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="barangay2">Barangay</label>
                            <input type="text" id="barangay2" name="barangay2" class="form-control2" value="{{Auth::user()->Baranggay}}" readonly>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="purok2">Purok</label>
                            <input type="text" id="purok2" name="purok2" class="form-control2" value="{{Auth::user()->Purok}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="zipcode2">ZipCode</label>
                            <input type="text" id="zipcode2" name="zipcode2" value="{{Auth::user()->ZipCode}}" class="form-control" readonly>
                        </div>
                    </div>
                    
                    <div class="form-group2">
                        <label for="subtotal2">Sub-total</label>
                        <span id="cart-total2">₱{{$order->totalItemPrice}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="payment2">Payment Option</label>
                        <span id="payment2">{{$order->paymentMethod}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="charge2">Charge</label>
                        <span id="charge-total2">{{$order->charge}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="grand-total2">Grand Total</label>
                        <input type="text" id="grand-total2" name="grand_total2" value="{{$order->grandTotal}}" class="form-control2" readonly>
                    </div>
                </div>
                
                <div class="order-summary2">
                    <h3>Order Summary</h3>
                    <div class="order-items2" id="checkout-items-container2">
                        <div class="order-item2">
                            <div class="order-item-details2">
                                <img src="{{ asset('storage/' . $order->productImg) }}" alt="Product">
                                <div class="order-item-info">
                                    <span class="order-item-name2">{{$order->ProductName}}</span>
                                    <span class="order-item-type2">{{$order->type}}</span>
                                    <div>
                                        <span class="size-badge2">{{$order->size}} </span>
                                        <span class="quantity-size2">X{{$order->quantity}}</span><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="order-total2">
                        <h4>Sub-Total: ₱ <span id="checkout-subtotal2">{{$order->totalItemPrice}}</span></h4>
                    </div>
                </div>
            </div>
             
            <!-- Fixed Footer with Back Button -->
            <div class="checkout-buttons2">
                <button type="button" class="cancel-btn2" id="cancel-btn2">Back</button>
            </div>
        </div>
    </div>  
                @endforeach
            </div>
        </div>
    </div>
</div>  

</body>
</html>
