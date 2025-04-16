<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
    <script src="../../javascript/dashboard.js"></script>
</head>
<body>
<div class="container">
    <div class="item-1">
        <img src="../../images/profile.jpg" >
        <div class="admintext">
            <h4>ADMIN</h4>
            <p>Administrator</p>
        </div>
    </div>

    <div class="item-2">
        <div class="item-2-1">
            <button id="buttondashboard" class="buttondashboard"><span>Dashboard</span></button>
            <button id="buttonproduct" class="buttonproduct"><span>Products</span></button>
            <button id="buttonorder" class="buttonorder"><span>Orders</span></button>
            <button id="buttonreport" class="buttonreport"><span>Reports</span></button>
            <button id="buttonlog-out" class="buttonlog-out" ><a href="../../../../htmls/login.html"><span>Log out</span></a></button>
        </div>
    </div>

    <div class="item-3" id="item-3">
        <div class="item-03" id="item-03"></div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>
<script src="../../javascript/chart1.js"></script>
<script src="../../javascript/chart2.js"></script>
</body>
</html>