<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="{{ asset('css/CustomerAddADesign-display.css') }}">
</head>
<body>
    <div class="completed-container">
        <div class="subTitle1">
            <div>Add A Design</div>
            <img src="{{ asset('images/sampleimage2.png') }}" alt="">
        </div>
        <div class="add-a-design-container" id="add-a-design-container">
            <div class="import-design-container">
                <img src="{{ asset('images/default-tshirt.jpg') }}" alt="" id="default-tshirt">
                <label class="input-file-button" for="input-file"><p>Input A Design</p></label>
                <input class="input-file" type="file" accept="image/jpeg, image/png, image/jpg" id="input-file">
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
                            </select>
                        </div>
                        <div class="design-info-1">
                            <input type="text" placeholder="Enter Display Name">
                            <input type="text" placeholder="Enter Jersey No.">
                            <select name="sizes" id="">
                                <option value="XS">XS</option>
                            </select>
                        </div>
                        <div class="design-info-1">
                            <input type="text" placeholder="Enter Display Name">
                            <input type="text" placeholder="Enter Jersey No.">
                            <select name="sizes" id="">
                                <option value="XS">XS</option>
                            </select>
                        </div>
                        <button class="add-button">Add</button>

                        <div class="submit-cancel-container">
                            <button id="submit">Submit</button>
                            <button id="cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{asset("js/customerAddADesign.js")}}"></script>
</body>
</html>