    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="{{ asset('css/order.css') }}">
        <script src="{{asset("js/dashboard.js")}}"></script>
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body class="orderbody">
        <div class="ordercontainer">
            <div class="ordercontent" id="ordercontent">

                <div class="search" id="search">
                    <input type="search" name="search1" id="search1" placeholder="Search...">
                    <button>Search</button>
                </div>

                <div class="sort">
                    <select name="sortStatus" id="sortStatus">
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                        <option value="shipped">Shipped</option>
                    </select>
                </div>

                <div class="infoHead">
                    Orders
                </div>
 

                <div class="ordertext">
                    <p>Email</p>
                    <p>User Name</p>
                    <p>Name</p>
                    <p>Contact No.</p>
                </div>
        
                <div class="acceptOrder" id="pendingOrders">
                    @foreach ($ordersData as $orderItems)
                <input type="hidden" name="orderId" value="{{$orderItems->orderId}}">
                <div class="order">
                    <div class="hov">
                        <p class="email">{{ $orderItems->email }}</p>
                        <p class="align1">{{ $orderItems->username }}</p>
                        <p class="align">{{ $orderItems->name }}</p>
                        <p>{{ $orderItems->contactNo }}</p>
                    </div>
                </div>
        
                 <div class="checkout-container-layout2" style="display: none">
            <!-- Fixed Header -->
            <div class="modal-header">
                <h2>{{$orderItems->username}}'s Order</h2>
            </div>
            
            <!-- Main Content Wrapper -->
            <div class="main-content-wrapper">
                <div class="shipping-details2">
                    <h3>Shipping Information</h3>
                    
                    <div class="form-group2">
                        <label for="recipient2">Recipient Name</label>
                        <input type="text" id="recipient2" name="recipient2" value="{{$orderItems->name}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="email2">Email</label>
                        <input type="email" id="email2" name="email2" value="{{$orderItems->email}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="contact2">Contact Number</label>
                        <input type="text" id="contact2" name="contact2" value="{{$orderItems->contactNo}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="city2">City</label>
                            <input type="text" id="city2" name="city2" class="form-control2" value="{{$orderItems->City}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="barangay2">Barangay</label>
                            <input type="text" id="barangay2" name="barangay2" class="form-control2" value="{{$orderItems->Baranggay}}" readonly>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="purok2">Purok</label>
                            <input type="text" id="purok2" name="purok2" class="form-control2" value="{{$orderItems->Purok}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="zipcode2">ZipCode</label>
                            <input type="text" id="zipcode2" name="zipcode2" value="{{$orderItems->ZipCode}}" class="form-control" readonly>
                        </div>
                    </div>
                    
                    <div class="form-group2">
                        <label for="subtotal2">Sub-total</label>
                        <span id="cart-total2">₱{{$orderItems->totalItemPrice}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="payment2">Payment Option</label>
                        <span id="payment2">{{$orderItems->paymentMethod}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="charge2">Charge</label>
                        <span id="charge-total2">{{$orderItems->charge}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="grand-total2">Grand Total</label>
                        <input type="text" id="grand-total2" name="grand_total2" value="{{$orderItems->totalCharge}}" class="form-control2" readonly>
                    </div>
                </div>
                
                <div class="order-summary2">
                    <h3>Order Summary</h3>
                    <div class="order-items2" id="checkout-items-container2">
                        <div class="order-item2">
                            <div class="order-item-details2">
                                <img src="{{ asset('storage/' . $orderItems->productImg) }}" alt="Product">
                                <div class="order-item-info">
                                    <span class="order-item-name2">{{$orderItems->ProductName}}</span>
                                    <span class="order-item-type2">{{$orderItems->type}}</span>
                                    <div>
                                        <span class="size-badge2">{{$orderItems->size}} </span>
                                        <span class="quantity-size2">X{{$orderItems->quantity}}</span><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="order-total2">
                        <h4>Sub-Total: ₱ <span id="checkout-subtotal2">{{$orderItems->totalItemPrice}}</span></h4>
                    </div>
                </div>
            </div>
            
            <!-- Fixed Footer with Back Button -->
            <div class="checkout-buttons2">
                 <form class="accept-form" data-order-id="{{$orderItems->orderId}}">
                            @csrf
                            @method('PUT')
                            <input type="hidden" name="orderId2" value="{{$orderItems->orderId}}">
                            <button class="function1" type="submit">Accept Orders</button>
                        </form>  
                <button type="button" class="cancel-btn2" id="reject01">Back</button>
            </div>
        </div>
        @endforeach
        </div>

                <div class="completeOrder" id="shippedOrders" style="display: none">
                    @foreach ($shipData as $orderItems)
                <input type="hidden" name="orderId" value="{{$orderItems->orderId}}">
                <div class="order">
                    <div class="hov">
                        <p class="email">{{ $orderItems->email }}</p>
                        <p class="align1">{{ $orderItems->username }}</p>
                        <p class="align">{{ $orderItems->name }}</p>
                        <p>{{ $orderItems->contactNo }}</p>
                    </div>
                </div>
        
                   <div class="checkout-container-layout2" style="display: none">
            <!-- Fixed Header -->
            <div class="modal-header">
                <h2>{{$orderItems->username}}'s Order</h2>
            </div>
            
            <!-- Main Content Wrapper -->
            <div class="main-content-wrapper">
                <div class="shipping-details2">
                    <h3>Shipping Information</h3>
                    
                    <div class="form-group2">
                        <label for="recipient2">Recipient Name</label>
                        <input type="text" id="recipient2" name="recipient2" value="{{$orderItems->name}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="email2">Email</label>
                        <input type="email" id="email2" name="email2" value="{{$orderItems->email}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="contact2">Contact Number</label>
                        <input type="text" id="contact2" name="contact2" value="{{$orderItems->contactNo}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="city2">City</label>
                            <input type="text" id="city2" name="city2" class="form-control2" value="{{$orderItems->City}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="barangay2">Barangay</label>
                            <input type="text" id="barangay2" name="barangay2" class="form-control2" value="{{$orderItems->Baranggay}}" readonly>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="purok2">Purok</label>
                            <input type="text" id="purok2" name="purok2" class="form-control2" value="{{$orderItems->Purok}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="zipcode2">ZipCode</label>
                            <input type="text" id="zipcode2" name="zipcode2" value="{{$orderItems->ZipCode}}" class="form-control" readonly>
                        </div>
                    </div>
                    
                    <div class="form-group2">
                        <label for="subtotal2">Sub-total</label>
                        <span id="cart-total2">₱{{$orderItems->totalItemPrice}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="payment2">Payment Option</label>
                        <span id="payment2">{{$orderItems->paymentMethod}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="charge2">Charge</label>
                        <span id="charge-total2">{{$orderItems->charge}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="grand-total2">Grand Total</label>
                        <input type="text" id="grand-total2" name="grand_total2" value="{{$orderItems->totalCharge}}" class="form-control2" readonly>
                    </div>
                </div>
                
                <div class="order-summary2">
                    <h3>Order Summary</h3>
                    <div class="order-items2" id="checkout-items-container2">
                        <div class="order-item2">
                            <div class="order-item-details2">
                                <img src="{{ asset('storage/' . $orderItems->productImg) }}" alt="Product">
                                <div class="order-item-info">
                                    <span class="order-item-name2">{{$orderItems->ProductName}}</span>
                                    <span class="order-item-type2">{{$orderItems->type}}</span>
                                    <div>
                                        <span class="size-badge2">{{$orderItems->size}} </span>
                                        <span class="quantity-size2">X{{$orderItems->quantity}}</span><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="order-total2">
                        <h4>Sub-Total: ₱ <span id="checkout-subtotal2">{{$orderItems->totalItemPrice}}</span></h4>
                    </div>
                </div>
            </div>
            
            <!-- Fixed Footer with Back Button -->
            <div class="checkout-buttons2">
                 <form class="accept-form2" data-order-id="{{$orderItems->orderId}}">
                            @csrf
                            @method('PUT')
                            <input type="hidden" name="orderId2" value="{{$orderItems->orderId}}">
                            <button class="function1" type="submit">Complete Orders</button>
                        </form>  
                <button type="button" class="cancel-btn2" id="reject01">Back</button>
            </div>
        </div>
                @endforeach
                </div>

                <div class="completedOrders" id="completedOrders" style="display: none">
                    @foreach ($completedData as $orderItems)
                    <input type="hidden" name="orderId" value="{{$orderItems->orderId}}">
                    <div class="order">
                        <div class="hov">
                            <p class="email">{{ $orderItems->email }}</p>
                            <p class="align1">{{ $orderItems->username }}</p>
                            <p class="align">{{ $orderItems->name }}</p>
                            <p>{{ $orderItems->contactNo }}</p>
                        </div>
                    </div>
               <div class="checkout-container-layout2" style="display: none">
            <!-- Fixed Header -->
            <div class="modal-header">
                <h2>{{$orderItems->username}}'s Order</h2>
            </div>
            
            <!-- Main Content Wrapper -->
            <div class="main-content-wrapper">
                <div class="shipping-details2">
                    <h3>Shipping Information</h3>
                    
                    <div class="form-group2">
                        <label for="recipient2">Recipient Name</label>
                        <input type="text" id="recipient2" name="recipient2" value="{{$orderItems->name}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="email2">Email</label>
                        <input type="email" id="email2" name="email2" value="{{$orderItems->email}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-group2">
                        <label for="contact2">Contact Number</label>
                        <input type="text" id="contact2" name="contact2" value="{{$orderItems->contactNo}}" class="form-control2" readonly>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="city2">City</label>
                            <input type="text" id="city2" name="city2" class="form-control2" value="{{$orderItems->City}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="barangay2">Barangay</label>
                            <input type="text" id="barangay2" name="barangay2" class="form-control2" value="{{$orderItems->Baranggay}}" readonly>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group2">
                            <label for="purok2">Purok</label>
                            <input type="text" id="purok2" name="purok2" class="form-control2" value="{{$orderItems->Purok}}" readonly>
                        </div>
                        <div class="form-group2">
                            <label for="zipcode2">ZipCode</label>
                            <input type="text" id="zipcode2" name="zipcode2" value="{{$orderItems->ZipCode}}" class="form-control" readonly>
                        </div>
                    </div>
                    
                    <div class="form-group2">
                        <label for="subtotal2">Sub-total</label>
                        <span id="cart-total2">₱{{$orderItems->totalItemPrice}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="payment2">Payment Option</label>
                        <span id="payment2">{{$orderItems->paymentMethod}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="charge2">Charge</label>
                        <span id="charge-total2">{{$orderItems->charge}}</span>
                    </div>
                    
                    <div class="form-group2">
                        <label for="grand-total2">Grand Total</label>
                        <input type="text" id="grand-total2" name="grand_total2" value="{{$orderItems->totalCharge}}" class="form-control2" readonly>
                    </div>
                </div>
                
                <div class="order-summary2">
                    <h3>Order Summary</h3>
                    <div class="order-items2" id="checkout-items-container2">
                        <div class="order-item2">
                            <div class="order-item-details2">
                                <img src="{{ asset('storage/' . $orderItems->productImg) }}" alt="Product">
                                <div class="order-item-info">
                                    <span class="order-item-name2">{{$orderItems->ProductName}}</span>
                                    <span class="order-item-type2">{{$orderItems->type}}</span>
                                    <div>
                                        <span class="size-badge2">{{$orderItems->size}} </span>
                                        <span class="quantity-size2">X{{$orderItems->quantity}}</span><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="order-total2">
                        <h4>Sub-Total: ₱ <span id="checkout-subtotal2">{{$orderItems->totalItemPrice}}</span></h4>
                    </div>
                </div>
            </div>
            
            <!-- Fixed Footer with Back Button -->
            <div class="checkout-buttons2">
                <button type="button" class="cancel-btn2" id="reject01">Back</button>
            </div>
        </div>
                    @endforeach
                </div>
            </div>
        </div>      
    </body> 
    </html>