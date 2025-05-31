<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../scripts/customerJS.js"></script>
    <link rel="stylesheet" href="{{asset("css/CustomerProductClicked-display.css")}}">
<!--    back button-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=undo" />
</head>
<body>
<div class="completed-container">
    <div class="subTitle1">
        <div>Product</div>
        <img src="{{asset("css/sampleimg.png")}}" alt="">
    </div>
    <div class="add-a-design-container">
        <div class="import-design-container">
            <button class="back-button" id="back-button">
                <span class="material-symbols-outlined">
                undo
                </span>
            </button>
            <img src="{{asset("css/images/sampleimg.png")}}" alt="" id="default-tshirt">
        </div>
        <div class="design-info-container">
            <div class="title-1">Sizes</div>
            <div class="sizes-available">
                <div>XS</div>
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
            <div class="title-2">Quantity</div>
            <div class="design-quantity-container">
                <div class="title-2-1">
                    <div class="title-name">Name</div>
                    <div class="title-jersey">Jersey No.#</div>
                    <div class="title-size">Size</div>
                </div>
                <div class="design-info">
                    <div class="design-info-1">
                        <input type="text" placeholder="Enter Display Name">
                        <input type="text" placeholder="Enter Jersey No.">
                        <select name="sizes" id="">
                            <option value="XS">XS</option>
                            <option value="XS">S</option>
                            <option value="XS">M</option>
                            <option value="XS">L</option>
                            <option value="XS">XL</option>
                            <option value="XS">XXL</option>
                        </select>
                    </div>
                    <div class="design-info-1">
                        <input type="text" placeholder="Enter Display Name">
                        <input type="text" placeholder="Enter Jersey No.">
                        <select name="sizes" id="">
                            <option value="XS">XS</option>
                            <option value="XS">S</option>
                            <option value="XS">M</option>
                            <option value="XS">L</option>
                            <option value="XS">XL</option>
                            <option value="XS">XXL</option>
                        </select>
                    </div>
                    <div class="design-info-1">
                        <input type="text" placeholder="Enter Display Name">
                        <input type="text" placeholder="Enter Jersey No.">
                        <select name="sizes" id="">
                            <option value="XS">XS</option>
                            <option value="XS">S</option>
                            <option value="XS">M</option>
                            <option value="XS">L</option>
                            <option value="XS">XL</option>
                            <option value="XS">XXL</option>
                        </select>
                    </div>
                    <button class="add-button">Add</button>

                    <div class="submit-cancel-container">
                        <button>Submit</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>