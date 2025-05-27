<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="{{ asset('css/CustomerNewDesigns.css')}}">
</head>
<body> 
  <div class="main-container">
        <div class="category-container">
            <button id="hot" data-category="hot" onclick="handleButtonClick('hot')">Hot</button>
            <button id="new" data-category="new" onclick="handleButtonClick('new')">New</button>
            <button id="my" data-category="my" onclick="handleButtonClick('my')">My Designs</button>
        </div>
        <div class="subTitle3" id="subTitle1">
            <div>Current Category: <span id="currentCategory">None</span></div>
        </div>
        <div class="subTitle4" id="subTitle2">
            <p style="padding: 20px;">Click a category button above to test responsiveness.</p>
        </div>
    </div>
</body>
</html> 