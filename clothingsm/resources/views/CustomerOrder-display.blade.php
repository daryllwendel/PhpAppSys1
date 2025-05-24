<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="{{asset("css/CustomerOrder-display.css")}}">
</head>
<body> 
    <div class="orderscont">
        <!-- Top Controls -->
        <div class="top-controls">
            <div class="search-container">
                <input type="text" id="searchInput" class="search-input" placeholder="Search orders by description, order number, or payment method...">
                <span class="search-icon">🔍</span>
            </div>
            <div class="status-filter">
                <select id="statusFilter" class="status-dropdown">
                    <option value="pending" selected>Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="shipped">Shipped</option>
                </select>
            </div>
        </div>

        <!-- Orders Section -->
        <div class="orders-section" id="ordersSection">
            <div class="section-header">
                <div class="section-title" id="section-title">
                    Pending Orders   
                </div>
                <div class="sort-controls">
                    <select id="sortOptions" class="sort-select">
                        <option value="orderNo">Order No.</option>
                        <option value="description">Description</option>
                        <option value="quantity">Quantity</option>
                        <option value="payment">Payment Method</option>
                        <option value="amount">Amount</option>
                    </select>
                    <button class="sort-btn" onclick="" >Sort</button>
                </div>
            </div>

            <div class="orders-table">
                <div class="table-header">
                    <div class="cell cell-order-no">Order No.</div>
                    <div class="cell cell-image">Image</div>
                    <div class="cell cell-description">Description</div>
                    <div class="cell cell-quantity">Quantity</div>
                    <div class="cell cell-payment">Payment</div>
                    <div class="cell cell-amount">Amount</div>
                    <div class="cell cell-status">Status</div>
                </div>

                <div class="orders-list" id="pendingList">
                    @foreach ($pendingOrders as $pending)
                    <div class="order-row" id="">
                        <input type="hidden" name="deliveryStatus" id="deliveryStatus" value="{{$pending->deliveryStatus}}">
                        <input type="hidden" name="orderId" value="{{$pending->orderId}}">
                        <div class="cell cell-order-no" data-column="Order No.">{{$pending->orderId}}</div>
                        <div class="cell cell-image" data-column="Image">
                            <img src="{{ asset('storage/' . $pending->productImg) }}" alt="Gaming Jersey" class="order-image-img">
                        </div>
                        <div class="cell cell-description" data-column="Description">{{$pending->ProductName}}</div>
                        <div class="cell cell-quantity" data-column="Quantity">{{$pending->totalQuantity}}</div>
                        <div class="cell cell-payment" data-column="Payment">{{$pending->paymentMethod}}</div>
                        <div class="cell cell-amount" data-column="Amount">₱{{ number_format($pending->totalItemPrice, 2) }}</div>
                        <div class="cell cell-status" data-column="Status">
                            <span class="status-indicator status-pending">{{$pending->deliveryStatus}}</span>
                        </div>
                    </div>
                    @endforeach
                </div>

                <div class="orders-list" id="shipList" style="display: none">
                    @foreach ($shippedOrders as $shipped)
                    <div class="order-row" id="">
                        <input type="hidden" name="deliveryStatus" id="deliveryStatus" value="{{$shipped->deliveryStatus}}">
                        <input type="hidden" name="orderId" value="{{$shipped->orderId}}">
                        <div class="cell cell-order-no" data-column="Order No.">{{$shipped->orderId}}</div>
                        <div class="cell cell-image" data-column="Image">
                            <img src="{{ asset('storage/' . $shipped->productImg) }}" alt="Gaming Jersey" class="order-image-img">
                        </div>
                        <div class="cell cell-description" data-column="Description">{{$shipped->ProductName}}</div>
                        <div class="cell cell-quantity" data-column="Quantity">{{$shipped->totalQuantity}}</div>
                        <div class="cell cell-payment" data-column="Payment">{{$shipped->paymentMethod}}</div>
                        <div class="cell cell-amount" data-column="Amount">₱{{ number_format($shipped->totalItemPrice, 2) }}</div>
                        <div class="cell cell-status" data-column="Status">
                            <span class="status-indicator status-pending">{{$shipped->deliveryStatus}}</span>
                        </div>
                    </div>
                    @endforeach
                </div>

                <div class="orders-list" id="completeList" style="display: none">
                    @foreach ($completedOrders as $completed)
                    <div class="order-row" id="">
                        <input type="hidden" name="deliveryStatus" id="deliveryStatus" value="{{$completed->deliveryStatus}}">
                        <input type="hidden" name="orderId" value="{{$completed->orderId}}">
                        <div class="cell cell-order-no" data-column="Order No.">{{$completed->orderId}}</div>
                        <div class="cell cell-image" data-column="Image">
                            <img src="{{ asset('storage/' . $completed->productImg) }}" alt="Gaming Jersey" class="order-image-img">
                        </div>
                        <div class="cell cell-description" data-column="Description">{{$completed->ProductName}}</div>
                        <div class="cell cell-quantity" data-column="Quantity">{{$completed->totalQuantity}}</div>
                        <div class="cell cell-payment" data-column="Payment">{{$completed->paymentMethod}}</div>
                        <div class="cell cell-amount" data-column="Amount">₱{{ number_format($completed->totalItemPrice, 2) }}</div>
                        <div class="cell cell-status" data-column="Status">
                            <span class="status-indicator status-pending">{{$completed->deliveryStatus}}</span>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>

            <div class="no-results" id="noResults" style="display: none;">
                <p>No orders found matching your criteria.</p>
            </div>
        </div>
    </div>
    <script src="{{asset("js/customerOrder-display.js")}}"></script>
</body>
</html>