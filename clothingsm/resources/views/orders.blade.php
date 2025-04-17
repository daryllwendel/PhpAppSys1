@ -0,0 +1,73 @@
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
<div class="ordercontainer">
    <div class="ordercontent" id="ordercontent">
        <div class="ordertext">
            <p>Email</p>
            <p>First Name</p>
            <p>Last Name</p>
            <p>Contact No.</p>
        </div>
        <div class="order">
            <div class="hov">
                <p class="email">Daryll@gmail.com</p>
                <p class="align1">Daryll</p>
                <p class="align">Labata</p>
                <p>0912345789</p>
            </div>
        </div>
    </div>
</div>

<div class="overlay" id="overlay">
    <button class="accept-button">Accept Orders</button>
    <button class="reject01" id="reject01"> < </button>
    <div class="header1">
        <span><b>View Order</b></span>
    </div>

    <div class="body1">
        <img src="{{ asset('images/location.png') }}" alt="Delivery Icon" />
        <strong>Delivery Address</strong>
        <span>Prk. 19 Lot 11, Prk. 5 Apokon, Tagum City, Davao del Norte</span>
    </div>

    <div class="body2">
        <img src="{{ asset('images/wallet.png') }}" alt="Payment Icon" />
        <strong>Payment Method</strong>
        <span>Cash</span>
        <h4>₱3600</h4>
    </div>

    <div class="footer1">
        <div class="footer0-1">
            <img src="{{ asset('images/clipboard.png') }}" alt="Order Summary Icon" />
            <h5>Order Summary</h5>
        </div>

        <div class="footer1-1">
            <span>X100 Black and Yellow Gaming Sports Jersey</span>
            <span class="price1">₱36000</span>
        </div>

        <div class="footer1-2">
            <span class="subtotal-1">Subtotal</span>
            <span class="deliver">Delivery</span>
            <span class="total"><b>Total</b></span>
            <span class="subtotal-2">P3600</span>
            <span class="deliver-2">P100</span>
            <span class="total-2"><b>P3600</b></span>
        </div>
    </div>
</div>

</body>
</html>