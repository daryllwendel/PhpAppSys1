<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add a Design</title>
    <link rel="stylesheet" href="{{ asset('css/CustomerAddADesign-display.css') }}">
</head>
<body>
    <div class="completed-container">
        <form action="/addadesign" method="POST" enctype="multipart/form-data">
            @csrf
        <div class="add-a-design-container" id="add-a-design-container">
            <div class="import-design-container">
                <img src="../images/default-tshirt.jpg" alt="T-shirt template" id="design-preview">
                <label class="input-file-button" for="input-file">
                    <p>Upload Design</p>
                </label>
                <input class="input-file"name="input-file" type="file" accept="image/jpeg, image/png, image/jpg" id="input-file">
                <div class="design-preview-info">
                    <p>Preview your design here</p>
                    <p class="design-preview-hint">Recommended size: 1200 x 1500 px</p>
                </div>
            </div>
            <div class="design-info-container">
                    <input type="hidden" name="customerId" value="{{ Auth::id() }}">
                    <input type="hidden" name="productImg" id="productImg">
                    
                    <div class="product-type">
                        <div class="product-type-label">Product Type</div>
                        <div class="product-type-options">
                            <label class="product-type-option-wrapper">
                                <input type="radio" name="type" value="T-Shirt" checked class="product-type-checkbox">
                                <div class="product-type-option" data-type="T-Shirt">T-Shirt</div>
                            </label>
                            <label class="product-type-option-wrapper">
                                <input type="radio" name="type" value="Polo" class="product-type-checkbox">
                                <div class="product-type-option" data-type="Polo">Polo</div>
                            </label>
                            <label class="product-type-option-wrapper">
                                <input type="radio" name="type" value="Hoodie" class="product-type-checkbox">
                                <div class="product-type-option" data-type="Hoodie">Hoodie</div>
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <label for="product-name" class="title-1">Product Name</label>
                        <input type="text" id="product-name" name="name" placeholder="Enter product name" required>
                    </div>

                    <div>
                        <div class="title-1">Print Type</div>
                        <div class="print-options">
                            <label class="print-type-wrapper">
                                <input type="radio" name="printType" value="Sublimation" checked class="print-type-checkbox">
                                <div class="print-type" data-print="Sublimation">Sublimation</div>
                            </label>
                            <label class="print-type-wrapper">
                                <input type="radio" name="printType" value="Embroidery" class="print-type-checkbox">
                                <div class="print-type" data-print="Embroidery">Embroidery</div>
                            </label>
                            <label class="print-type-wrapper">
                                <input type="radio" name="printType" value="Print" class="print-type-checkbox">
                                <div class="print-type" data-print="Print">Print</div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <div class="title-1">Available Sizes</div>
                        <div class="sizes-available">
                            <label class="size-option-wrapper">
                                <input type="checkbox" name="sizes[]" value="XS" class="size-checkbox">
                                <div class="size-option" data-size="XS">XS</div>
                            </label> 
                            <label class="size-option-wrapper">
                                <input type="checkbox" name="sizes[]" value="S" class="size-checkbox">
                                <div class="size-option" data-size="S">S</div>
                            </label>
                            <label class="size-option-wrapper">
                                <input type="checkbox" name="sizes[]" value="M" class="size-checkbox">
                                <div class="size-option" data-size="M">M</div>
                            </label>
                            <label class="size-option-wrapper">
                                <input type="checkbox" name="sizes[]" value="L" class="size-checkbox">
                                <div class="size-option" data-size="L">L</div>
                            </label>
                            <label class="size-option-wrapper">
                                <input type="checkbox" name="sizes[]" value="XL" class="size-checkbox">
                                <div class="size-option" data-size="XL">XL</div>
                            </label>
                            <label class="size-option-wrapper">
                                <input type="checkbox" name="sizes[]" value="XXL" class="size-checkbox">
                                <div class="size-option" data-size="XXL">XXL</div>
                            </label>
                        </div>
                    </div>

                    <div class="submit-cancel-container">
                        <button type="submit" id="submit">Submit Order</button>
                        <button type="button" id="cancel">Cancel</button>
                    </div>
            </div>
        </div>
        </form>
    </div>

    <script src="{{ asset('js/customerAddADesign.js') }}"></script>
</body>
</html>