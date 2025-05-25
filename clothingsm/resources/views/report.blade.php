<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="{{ asset('css/reports.css') }}">
</head>
<body>
<div class="reportcontainer">
  <div class="reportcontent">
  <div class="search">
    <img src="{{asset("images/search.png")}}">
    <input type="search" placeholder="Search...">
    <button>Search</button>
  </div>

  <div class="choice">
    <button>Daily</button>
    <button>Weekly</button>
    <button>Monthly</button>
    <button>Annual</button>
  </div>

  <div class="reportcontent">
    <div class="reporttext">
      <p>Date</p>
      <p>Order ID</p>
      <p>Sales</p>
      <p>Sold</p>
    </div><hr>
    <div class="report">
      <div class="hov">
        <p>2024-01-01</p>
        <p class="align1">P00001</p>
        <p class="align">P10</p>
        <p>120</p>
      </div>
    </div>

    <div class="total">Total: <span>100.00</span></div>
  </div>
  </div>
</div>
</body>
</html>
