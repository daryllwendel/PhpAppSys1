    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="{{ asset('css/order.css') }}">
        <script src="{{asset("js/dashboard.js")}}"></script>
    </head>
    <body>
        @if(isset($ordersData) && $ordersData->count() > 0)
        <div class="ordercontainer">
           
                <div class="ordercontent" id="ordercontent">
                    <div class="ordertext">
                        <p>Email</p>
                        <p>User Name</p>
                        <p>Name</p>
                        <p>Contact No.</p>
                    </div>
                    @foreach ($ordersData as  $orderItems)
                    <input type="hidden" name="orderId" value="{{$orderItems->orderId}}">
                    <div class="order">
                        <div class="hov">
                            <p class="email">{{ $orderItems->email }}</p>
                            <p class="align1">{{ $orderItems->username }}</p>
                            <p class="align">{{ $orderItems->name }}</p>
                            <p>{{ $orderItems->contactNo }}</p>
                        </div>
                    </div>
                </div>
        </div>
        <div class="overlay" id="overlay">
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
                    <h4>{{$orderItems->totalItemPrice}}</h4>
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
                
                <form action="">
                    <button class="accept-button">Accept Orders</button>
                </form>
            </div>
        </div>
        @endforeach
        
    @else
    <div style="text-align: center; padding: 40px 0;">
        <h2>Oops, Your Orders is Empty</h2>
    </div>
    @endif
    </body>
    </html>