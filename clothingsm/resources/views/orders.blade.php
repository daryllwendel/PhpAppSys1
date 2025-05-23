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
                    Pending Orders
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
        
                <div class="overlay" id="overlay-{{$orderItems->orderId}}">
                    <div class="overlay-content">
                        <div class="overlay-header">
                            <button class="reject01" id="reject01">&lt;</button>
                            <div class="header1">
                                <span>View Order</span>
                            </div>
                        </div>
        
                        <div class="order-section body1">
                            <img src="{{ asset('images/location.png') }}" alt="Delivery Icon" />
                            <strong>Delivery Address</strong>
                            <span>Prk. {{$orderItems->Baranggay}}, {{$orderItems->City}}, {{$orderItems->Province}}</span>
                        </div>
        
                        <div class="order-section body2">
                            <img src="{{ asset('images/wallet.png') }}" alt="Payment Icon" />
                            <strong>Payment Method</strong>
                            <span>{{$orderItems->paymentMethod}}</span>
                            <h4>₱{{$orderItems->totalItemPrice}}</h4>
                        </div>
        
                        <div class="footer1">
                            <div class="footer0-1">
                                <img src="{{ asset('images/clipboard.png') }}" alt="Order Summary Icon" />
                                <h5>Order Summary</h5>
                            </div>
        
                            <div class="footer1-1">
                                <span>X{{$orderItems->quantity}} {{$orderItems->ProductName}}</span>
                                <span class="price1">₱{{$orderItems->totalItemPrice}}</span>
                            </div>
        
                            <div class="footer1-2">
                                <span class="subtotal-1">Subtotal</span>
                                <span class="subtotal-2">₱{{$orderItems->totalItemPrice}}</span>
                                
                                <span class="deliver">Delivery</span>
                                <span class="deliver-2">₱{{$orderItems->charge}}</span>
                                
                                <span class="total"><b>Total</b></span>
                                <span class="total-2"><b>₱{{$orderItems->totalCharge}}</b></span>
                            </div>
                        </div>
                        
                        <form class="accept-form" data-order-id="{{$orderItems->orderId}}">
                            @csrf
                            @method('PUT')
                            <input type="hidden" name="orderId2" value="{{$orderItems->orderId}}">
                            <button class="accept-button" type="submit">Accept Orders</button>
                        </form>                        
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
        
                <div class="overlay" id="overlay-{{$orderItems->orderId}}">
                    <div class="overlay-content">
                        <div class="overlay-header">
                            <button class="reject01" id="reject01">&lt;</button>
                            <div class="header1">
                                <span>View Order</span>
                            </div>
                        </div>
        
                        <div class="order-section body1">
                            <img src="{{ asset('images/location.png') }}" alt="Delivery Icon" />
                            <strong>Delivery Address</strong>
                            <span>Prk. {{$orderItems->Baranggay}}, {{$orderItems->City}}, {{$orderItems->Province}}</span>
                        </div>
        
                        <div class="order-section body2">
                            <img src="{{ asset('images/wallet.png') }}" alt="Payment Icon" />
                            <strong>Payment Method</strong>
                            <span>{{$orderItems->paymentMethod}}</span>
                            <h4>₱{{$orderItems->totalItemPrice}}</h4>
                        </div>
        
                        <div class="footer1">
                            <div class="footer0-1">
                                <img src="{{ asset('images/clipboard.png') }}" alt="Order Summary Icon" />
                                <h5>Order Summary</h5>
                            </div>
        
                            <div class="footer1-1">
                                <span>X{{$orderItems->quantity}} {{$orderItems->ProductName}}</span>
                                <span class="price1">₱{{$orderItems->totalItemPrice}}</span>
                            </div>
        
                            <div class="footer1-2">
                                <span class="subtotal-1">Subtotal</span>
                                <span class="subtotal-2">₱{{$orderItems->totalItemPrice}}</span>
                                
                                <span class="deliver">Delivery</span>
                                <span class="deliver-2">₱{{$orderItems->charge}}</span>
                                
                                <span class="total"><b>Total</b></span>
                                <span class="total-2"><b>₱{{$orderItems->totalCharge}}</b></span>
                            </div>
                        </div>
                        
                        <form class="accept-form2" data-order-id="{{$orderItems->orderId}}">
                            @csrf
                            @method('PUT')
                            <input type="hidden" name="orderId2" value="{{$orderItems->orderId}}">
                            <button class="accept-button" type="submit">Complete Orders</button>
                        </form>                        
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
            
                    <div class="overlay" id="overlay-{{$orderItems->orderId}}">
                        <div class="overlay-content">
                            <div class="overlay-header">
                                <button class="reject01" id="reject01">&lt;</button>
                                <div class="header1">
                                    <span>View Order</span>
                                </div>
                            </div>
            
                            <div class="order-section body1">
                                <img src="{{ asset('images/location.png') }}" alt="Delivery Icon" />
                                <strong>Delivery Address</strong>
                                <span>Prk. {{$orderItems->Baranggay}}, {{$orderItems->City}}, {{$orderItems->Province}}</span>
                            </div>
            
                            <div class="order-section body2">
                                <img src="{{ asset('images/wallet.png') }}" alt="Payment Icon" />
                                <strong>Payment Method</strong>
                                <span>{{$orderItems->paymentMethod}}</span>
                                <h4>₱{{$orderItems->totalItemPrice}}</h4>
                            </div>
            
                            <div class="footer1">
                                <div class="footer0-1">
                                    <img src="{{ asset('images/clipboard.png') }}" alt="Order Summary Icon" />
                                    <h5>Order Summary</h5>
                                </div>
            
                                <div class="footer1-1">
                                    <span>X{{$orderItems->quantity}} {{$orderItems->ProductName}}</span>
                                    <span class="price1">₱{{$orderItems->totalItemPrice}}</span>
                                </div>
            
                                <div class="footer1-2">
                                    <span class="subtotal-1">Subtotal</span>
                                    <span class="subtotal-2">₱{{$orderItems->totalItemPrice}}</span>
                                    
                                    <span class="deliver">Delivery</span>
                                    <span class="deliver-2">₱{{$orderItems->charge}}</span>
                                    
                                    <span class="total"><b>Total</b></span>
                                    <span class="total-2"><b>₱{{$orderItems->totalCharge}}</b></span>
                                </div>
                            </div>
                            
                            <form class="accept-form" data-order-id="{{$orderItems->orderId}}">
                                @csrf
                                @method('PUT')
                                <input type="hidden" name="orderId2" value="{{$orderItems->orderId}}">
                                <button class="accept-button" type="submit" disabled>Completed Orders</button>
                            </form>                        
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>      
    </body> 
    </html>