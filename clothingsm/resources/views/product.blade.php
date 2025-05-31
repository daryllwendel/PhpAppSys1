<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/products.css') }}" />
    <script src="{{ asset('js/dashboard.js') }}"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
    <div class="productcontainer">
        <div class="productcontent">
            <div class="items-1">
                <img src="{{ asset('images/search.png') }}" alt="Search">
                <input type="search" placeholder="Search.." class="searchbars">
                <button class="buttonsubmit">Search</button>
            </div>

            <div class="items-2">
                <button class="addbutton"><img src="{{ asset('images/addProduct.png') }}" alt="Add"></button>
            </div>

            <div class="items-3">
                @if ($count > 0)
                    @foreach ($products as $item)
                        <div class="product-card">
                            <input type="hidden" name="productId" id="" value="{{ $item->productId }}">
                            <img src="{{ asset('storage/' . $item->productImg) }}" alt="{{ $item->name }}">
                            <div class="product-info">
                                <div class="product-name">{{ $item->name }}
                                    <div class="status1">{{ $item->viewStatus }}</div>
                                </div>
                                <div class="product-type">Type: {{ $item->printType }}
                                    <p>View: {{ $item->status }}</p>
                                </div>
                                <div class="product-sizes">
                                    @php
                                        $sizes = App\Models\ProductSize::where('product_id', $item->productId)->get();
                                    @endphp
                                    Sizes:
                                    @foreach ($sizes as $size)
                                        <span class="size-badge">{{ $size->size }}</span>
                                    @endforeach
                                </div>
                            </div>
                            <div class="product-actions">
                                <button class="edit-btn editbutton" data-id="{{ $item->productId }}"
                                    data-name="{{ $item->name }}" data-price="{{ $item->price }}"
                                    data-type="{{ $item->type }}" data-printtype="{{ $item->printType }}"
                                    data-productImg="{{ asset('storage/' . $item->productImg) }}"
                                    data-status="{{ $item->status }}" data-viewStatus="{{ $item->viewStatus }}"
                                    id="editbutton">EDIT
                                </button>
                                <button class="delete-btn deletebutton" data-id="{{ $item->productId }}"
                                    data-name="{{ $item->name }}" data-price="{{ $item->price }}"
                                    data-type="{{ $item->type }}"
                                    data-productImg="{{ asset('storage/' . $item->productImg) }}"
                                    data-printtype="{{ $item->printType }}" id="deletebutton">DELETE
                                </button>
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="no-products">
                        <img src="{{ asset('images/no-products.png') }}" alt="No Products" width="auto" height="200">
                    </div>
                    <p style="text-align: center; display:flex; align-items: center; font-weight: bold;">No products available. Please add a product.</p>
                @endif
                
            </div>

            <!-- Modal overlay -->
            <div class="modal-overlay" id="modalOverlay"></div>

            <!-- Add Item Modal -->
            <div class="additem">
                <form class="addProductForm" action="/adddesign" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="reject">
                        <span>Add Stock</span>
                        <button type="button" class="close-btn"> X </button>
                    </div>

                    <div class="productid">
                        <input type="text" required="required" disabled>
                        <span>{{ $count + 1 }}</span>
                        <i></i>
                    </div>

                    <div class="name1">
                        <input type="text" required="required" name="name">
                        <span>Name</span>
                        <i></i>
                    </div>

                    <div class="price1">
                        <input type="text" required="required" name="price">
                        <span>Price</span>
                        <i></i>
                    </div>

                    <div class="type">
                        <select name="type" id="type" class="type">
                            <option value="Polo">Polo</option>
                            <option value="Tshirt">T-Shirt</option>
                            <option value="Hoodie">Hoodie</option>
                        </select>
                    </div>

                    <div class="category1">
                        <select name="printType" id="printType" class="printType">
                            <option value="sublimation">Sublimation</option>
                            <option value="embroidery">Embroidery</option>
                            <option value="print">Print</option>
                            <option value="jersey">Jersey</option>
                        </select>
                    </div>

                    <div class="sizes">
                        <span>Available Sizes:</span>
                        <div class="size-options">
                            <label><input type="checkbox" name="sizes[]" value="XS"> XS</label>
                            <label><input type="checkbox" name="sizes[]" value="S"> S</label>
                            <label><input type="checkbox" name="sizes[]" value="M"> M</label>
                            <label><input type="checkbox" name="sizes[]" value="L"> L</label>
                            <label><input type="checkbox" name="sizes[]" value="XL"> XL</label>
                            <label><input type="checkbox" name="sizes[]" value="XXL"> XXL</label>
                        </div>
                    </div>

                    <div class="sample1">
                        <img src="{{ asset('images/sampleimage2.png') }}" id="newimg">
                        <label for="addimg">Upload Image</label>
                        <input type="file" name="productImg" id="addimg">
                    </div>
                    <button type="submit" class="submit-btn" id="addProductBtn">Add Stock</button>
                </form>
            </div>

            <!-- Edit Item Modal -->
            <div class="edititem" id="editModal">
                <form class="editProduct" action="/products" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="reject2">
                        <span>Edit Stock</span>
                        <button type="button" class="close-btn" id="closeEditModal"> X </button>
                    </div>

                    <div class="sample2">
                        <img src="" class="img2" id="editProductImage1">
                        <label for="editimg">Upload Image</label>
                        <input type="file" name="editProductImage" id="editimg">
                    </div>

                    <div class="productid2">
                        <input type="text" required="required" readonly name="productId" id="editId">
                        <span>Product ID</span>
                    </div>

                    <div class="name2">
                        <div>
                            <input type="text" required="required" name="editName" id="editName">
                            <span>Name</span>
                        </div>
                        
                    </div>

                    <div class="price2">
                        <input type="text" required="required" name="editPrice" id="editPrice">
                        <span>Price</span>
                    </div>

                    <div class="edittype">
                        <select name="edittype1" id="editCategory" class="edittype1">
                            <option value="Polo">Polo</option>
                            <option value="T-Shirt">T-Shirt</option>
                            <option value="Hoodie">Hoodie</option>
                        </select>
                    </div>

                    <div class="printtype">
                        <select name="printType1" id="editprintType" class="printType1">
                            <option value="Sublimation">Sublimation</option>
                            <option value="Embroidery">Embroidery</option>
                            <option value="Print">Print</option>
                        </select>
                    </div>
                    <div class="status-container">
                        <label for="add-status">Status</label>
                        <select name="status" id="add-status">
                            <option class="status-display" value="display" selected>Display</option>
                            <option class="status-hidden" value="hidden">Hide</option>
                        </select>
                    </div>
                    <div class="sizes">
                        <span>Available Sizes:</span>
                        <div class="size-options">
                            <label><input type="checkbox" name="sizes[]" value="XS" class="sizes"> XS</label>
                            <label><input type="checkbox" name="sizes[]" value="S" class="sizes"> S</label>
                            <label><input type="checkbox" name="sizes[]" value="M" class="sizes"> M</label>
                            <label><input type="checkbox" name="sizes[]" value="L" class="sizes"> L</label>
                            <label><input type="checkbox" name="sizes[]" value="XL" class="sizes"> XL</label>
                            <label><input type="checkbox" name="sizes[]" value="XXL" class="sizes"> XXL</label>
                        </div>
                    </div>

                    <button type="submit" class="submit-btn">Update Stock</button>
                </form>

                <form action="/approve" method="POST" class="approve">
                    @csrf
                    @method('PUT')
                    <input type="hidden" name="productId" id="approveProductId">

                    <div class="approve" id="approveMessage" style="display: none;">
                        <p>This product has not yet been approved.
                            Do you want to approve this design?</p>
                        <button type="submit">Approve</button>
                        <button type="button" id="denyButton">Deny</button>
                    </div>
                </form>


            </div>

            <!-- Delete Item Modal -->
            <div class="deleteitem">
                <form action="/deletedesign" method="POST" class="deleteProduct">
                    @csrf
                    @method('DELETE')
                    <div class="reject3">
                        <span>Delete Stock</span>
                        <button type="button" class="close-btn"> X </button>
                    </div>

                    <div class="sample3">
                        <img src="" id="deleteProductImage">
                        <button type="submit" class="delete-btn">Confirm Delete</button>
                    </div>

                    <div class="productid3">
                        <input type="text" required="required" readonly name="productId" id="deleteId">
                        <span>Product ID</span>
                    </div>

                    <div class="name3">
                        <input type="text" required="required" readonly name="name" id="deleteName">
                        <span>Name</span>
                    </div>

                    <div class="price3">
                        <input type="text" required="required" readonly name="price" id="deletePrice">
                        <span>Price</span>
                    </div>

                    <div class="type2">
                        <input type="text" required="required" readonly name="type" id="deleteType">
                        <span>Type</span>
                    </div>

                    <div class="printtype2">
                        <input type="text" required="required" readonly name="printType" id="deletePrintType">
                        <span>Print Type</span>
                    </div>
                </form>
            </div>

</html>
