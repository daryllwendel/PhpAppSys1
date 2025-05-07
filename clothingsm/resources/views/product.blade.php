<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/products.css') }}" />
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
                <button class="addbutton"><img src="{{ asset('images/cart.png') }}" alt="Add"></button>
            </div>
    
            <div class="items-3">
                <!-- Hidden original table structure -->
                <table class="table table-bordered table-striped" style="display: none;">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Print Type</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        @foreach ($products as $item)
                            <tr>
                                <td><img src="{{ asset('storage/' . $item->productImg) }}" width="70px" height="70px" alt=""></td>
                                <td>{{$item->productId}}</td>
                                <td>{{$item->name}}</td>
                                <td>{{$item->price}}</td>
                                <td>{{$item->type}}</td>
                                <td>{{$item->printType}}</td>
                                <td>
                                    <button class="btn btn-primary btn-sm editbutton" 
                                    data-id="{{ $item->productId }}" 
                                    data-name="{{ $item->name }}" 
                                    data-price="{{ $item->price }}" 
                                    data-type="{{ $item->type }}" 
                                    data-printtype="{{ $item->printType }}" 
                                    data-productImg= "{{ asset('storage/' . $item->productImg) }}"
                                    id="editbutton">Edit
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-danger btn-sm deletebutton" 
                                    data-id="{{ $item->productId }}" 
                                    data-name="{{ $item->name }}" 
                                    data-price="{{ $item->price }}" 
                                    data-type="{{ $item->type }}"
                                    data-productImg= "{{ asset('storage/' . $item->productImg) }}"
                                    data-printtype="{{ $item->printType }}" 
                                    id="deletebutton">Delete
                                    </button>
                                </td>
                            </tr> 
                        @endforeach
                    </tbody>
                </table>
                
                <!-- New grid-based product display -->
                @foreach ($products as $item)
                <div class="product-card">
                    <img src="{{ asset('storage/' . $item->productImg) }}" alt="{{ $item->name }}">
                    <div class="product-actions">
                        <button class="edit-btn editbutton" 
                            data-id="{{ $item->productId }}" 
                            data-name="{{ $item->name }}" 
                            data-price="{{ $item->price }}" 
                            data-type="{{ $item->type }}" 
                            data-printtype="{{ $item->printType }}" 
                            data-productImg= "{{ asset('storage/' . $item->productImg) }}"
                            id="editbutton">EDIT
                        </button>
                        <button class="delete-btn deletebutton" 
                            data-id="{{ $item->productId }}" 
                            data-name="{{ $item->name }}" 
                            data-price="{{ $item->price }}" 
                            data-type="{{ $item->type }}"
                            data-productImg= "{{ asset('storage/' . $item->productImg) }}"
                            data-printtype="{{ $item->printType }}" 
                            id="deletebutton">DELETE
                        </button>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
    
    <!-- Modal overlay -->
    <div class="modal-overlay" id="modalOverlay"></div>
    
    <!-- Add Item Modal -->
    <div class="additem">
        <form action="/adddesign" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="reject">
                <span>Add Stock</span>
                <button type="button" class="close-btn"> X </button>
            </div>
        
            <div class="productid">
                <input type="text" required="required" disabled>
                <span>{{$count + 1}}</span>
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
                </select>
            </div>
        
            <div class="sample1">
                <img src="{{ asset('images/sampleimage2.png') }}" id="newimg">
                <label for="addimg">Upload Image</label>
                <input type="file" name="productImg" id="addimg">
            </div>
        
            <button type="submit" class="submit-btn">Add Stock</button>
        </form>
    </div>
    
    <!-- Edit Item Modal -->
    <div class="edititem" id="editModal">
        <form action="/product" method="POST" enctype="multipart/form-data">
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
                <input type="text" required="required" name="editName" id="editName">
                <span>Name</span>
            </div>
    
            <div class="price2">
                <input type="text" required="required" name="editPrice" id="editPrice">
                <span>Price</span>
            </div>
    
            <div class="edittype">
                <select name="edittype1" id="editCategory" class="edittype1">
                    <option value="Polo">Polo</option>
                    <option value="Tshirt">T-Shirt</option>
                    <option value="Hoodie">Hoodie</option>
                </select>
            </div>
    
            <div class="printtype">
                <select name="printType1" id="printType1" class="printType1">
                    <option value="sublimation">Sublimation</option>
                    <option value="embroidery">Embroidery</option>
                    <option value="print">Print</option>
                </select>
            </div>
    
            <button type="submit" class="submit-btn">Update Stock</button>
        </form>
    </div>
    
    <!-- Delete Item Modal -->
    <div class="deleteitem">
        <form action="/deletedesign" method="POST">
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