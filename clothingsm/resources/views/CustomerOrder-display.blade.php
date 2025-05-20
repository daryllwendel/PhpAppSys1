<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="{{asset("css/CustomerOrder-display.css")}}">
</head>
<body> 
    <div class="orderscont">
        <div class="completed-container">
            <div class="title-sort-container">
                <div class="title">Completed</div>
                <div class="sort">
                    <select id="sortOptions1">
                        <option value="Order No.">Order No.#</option>
                        <option value="Description">Description</option>
                        <option value="Quantity">Quantity</option>
                        <option value="Payment">Payment Method</option>
                        <option value="Amount">Amount Paid</option>
                    </select>
                    <button id="sortButton1">Sort</button>
                </div>
            </div>
            <div class="completed-orders-container table1">
                <div class="completed-orders-column row1 header1">
                    <p class="column-order-no cell1" data-column="Order No.">Order No.#</p>
                    <p class="column-order-image cell1" data-column="Image">Image</p>
                    <p class="column-order-description cell1" data-column="Description">Description</p>
                    <p class="column-order-quantity cell1" data-column="Quantity">Quantity</p>
                    <p class="column-order-payment cell1" data-column="Payment">Payment Method</p>
                    <p class="column-order-amount cell1" data-column="Amount">Total Amount Paid</p>
                </div>
                <div class="completed-orders">
                    <div class="orders row1">
                        <div class="order-no cell1" data-column="Order No.">1</div>
                        <div class="order-image cell1" data-column="Image"></div>
                        <div class="order-description cell1" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                        <div class="order-quantity cell1" data-column="Quantity">10</div>
                        <div class="order-payment cell1" data-column="Payment">Self-Pickup</div>
                        <div class="order-amount cell1" data-column="Amount">5000.00</div>
                    </div>
                    <div class="orders row1">
                        <div class="order-no cell1" data-column="Order No.">2</div>
                        <div class="order-image cell1" data-column="Image"></div>
                        <div class="order-description cell1" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                        <div class="order-quantity cell1" data-column="Quantity">10</div>
                        <div class="order-payment cell1" data-column="Payment">COD</div>
                        <div class="order-amount cell1" data-column="Amount">5100.00</div>
                    </div>
                    <div class="orders row1">
                        <div class="order-no cell1" data-column="Order No.">3</div>
                        <div class="order-image cell1" data-column="Image"></div>
                        <div class="order-description cell1" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                        <div class="order-quantity cell1" data-column="Quantity">10</div>
                        <div class="order-payment cell1" data-column="Payment">COD</div>
                        <div class="order-amount cell1" data-column="Amount">5100.00</div>
                    </div>
                    <div class="orders row1">
                        <div class="order-no cell1" data-column="Order No.">4</div>
                        <div class="order-image cell1" data-column="Image"></div>
                        <div class="order-description cell1" data-column="Description">Black and Yellow Gaming sports Jersey</div>
                        <div class="order-quantity cell1" data-column="Quantity">10</div>
                        <div class="order-payment cell1" data-column="Payment">COD</div>
                        <div class="order-amount cell1" data-column="Amount">5100.00</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pending-container">
            <div class="title-sort-container">
                <div class="title">Pending</div>
                <div class="sort">
                    <select id="sortOptions">
                        <option value="Order No.">Order No.#</option>
                        <option value="Description">Description</option>
                        <option value="Quantity">Quantity</option>
                        <option value="Payment">Payment Method</option>
                        <option value="Amount">Amount Paid</option>
                    </select>
                    <button id="sortButton">Sort</button>
                </div>
            </div>
            <div class="pending-orders-container table">
                <div class="pending-orders-column row header">
                    <p class="column-order-no cell" data-column="Order No.">Order No.#</p>
                    <p class="column-order-image cell" data-column="Image">Image</p>
                    <p class="column-order-description cell" data-column="Description">Description</p>
                    <p class="column-order-quantity cell" data-column="Quantity">Quantity</p>
                    <p class="column-order-payment cell" data-column="Payment">Payment Method</p>
                    <p class="column-order-amount cell" data-column="Amount">Amount to Pay</p>
                </div>
                <div class="pending-orders">
                    @foreach ($pendingOrders as $order)
                    <div class="orders row">
                        <input type="hidden" name="orderId" value="{{$order->orderId}}">
                        <div class="order-no cell" data-column="Order No.">{{$order->orderId}}</div>
                        <div class="order-image cell" data-column="Image">
                            <img src="{{ asset('storage/' . $order->productImg) }}" alt="Black and Yellow Gaming Jersey" class="order-image-img">
                        </div>
                        <div class="order-description cell" data-column="Description">{{$order->ProductName}}</div>
                        <div class="order-quantity cell" data-column="Quantity">{{$order->totalQuantity}}</div>
                        <div class="order-payment cell" data-column="Payment">{{$order->paymentMethod}}</div>
                        <div class="order-amount cell" data-column="Amount">₱{{ number_format($order->totalItemPrice, 2) }}</div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
    <script src="{{asset("js/customerOrder-display.js")}}"></script>
</body>
</html>