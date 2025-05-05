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
            <img src="{{ asset('images/search.png') }}" alt="">
            <input type="search" placeholder="Search.." class="searchbars">
            <input type="submit" class="buttonsubmit">
        </div>

        <div class="items-2">
            <button class="addbutton"><img src="../images/cart.png"></button>
            <button class="deletebutton"><img src="../images/delete.png"></button>
        </div>

        <div class="items-3">
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
            <div><img src="{{ asset('images/sampleimage2.png') }}" class="sample1" id="editbutton"></div>
        </div>
    </div>

</div>

   
    <div>
        <form action="/adddesign" method="POST">
            <div class="additem">
        
                <div class="reject">
                    <button> X </button>
                    <span>Add Stock</span>
                </div>
            
                <div class="productid">
                    <input type="text" required="required" readonly>
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
            
                <div class="sample1">
                    <img src="{{ asset('images/sampleimage2.png') }}">
                    <button type="submit">Add Stock</button>
                </div>
            </div>
        </form>
    </div>
 

<div class="edititem">
    <div class="reject2">
        <button> X </button>
        <span>Edit Stock</span>
    </div>

    <div class="sample2">
        <img src="{{ asset('images/sampleimage2.png') }}" class="img2">
        <button class="editbutton"><span>Edit Stock</span></button>
    </div>

    <div class="productid2">
        <input type="text" required="required" readonly>
        <span>{{$count + 1}}</span>
        <i></i>
    </div>

    <div class="name2">
        <input type="text" required="required">
        <span>Name</span>
        <i></i>
    </div>

    <div class="price2">
        <input type="text" required="required">
        <span>Price</span>
        <i></i>
    </div>


    <div class="category2">
        <input type="text" required="required">
        <span>Catergory</span>
        <i></i>
    </div>
</div>

<div class="deleteitem">
    <div class="reject3">
        <button> X </button>
        <span>Delete Stock</span>
    </div>

    <div class="sample3">
        <img src="{{ asset('images/sampleimage2.png') }}">
        <button><span>Delete Stock</span></button>
    </div>

    <div class="productid3">
        <input type="text" required="required" readonly>
        <span>{{$count +1}}</span>
        <i></i>
    </div>

    <div class="name3">
        <input type="text" required="required">
        <span>Name</span>
        <i></i>
    </div>

    <div class="price3">
        <input type="text" required="required">
        <span>Price</span>
        <i></i>
    </div>


    <div class="category3">
        <input type="text" required="required">
        <span>Catergory</span>
        <i></i>
    </div>
</div>
</body>
</html>