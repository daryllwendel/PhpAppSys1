<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Customer Orders</title>
    <link rel="stylesheet" href="{{ asset('css/CustomerOrder-display.css') }}">
</head>
<body>
<div class="orderscont">
    <!-- Top Controls -->
    <div class="top-controls">
        <div class="search-container">
            <input type="text" id="searchInput" class="search-input" placeholder="Search orders...">
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
            <div class="section-title" id="section-title">Pending Orders</div>
            <div class="sort-controls">
                <select id="sortOptions" class="sort-select">
                    <option value="orderNo">Order No.</option>
                    <option value="description">Description</option>
                    <option value="quantity">Quantity</option>
                    <option value="payment">Payment Method</option>
                    <option value="amount">Amount</option>
                </select>
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
                @foreach ($pendingOrders as $order)
                <div class="order-row">
                    <input type="hidden" value="{{ $order->deliveryStatus }}">
                    <div class="cell cell-order-no" data-column="orderNo">{{ $order->orderId }}</div>
                    <div class="cell cell-image">
                        <img src="{{ asset('storage/' . $order->productImg) }}" class="order-image-img" alt="">
                    </div>
                    <div class="cell cell-description" data-column="description">{{ $order->ProductName }}</div>
                    <div class="cell cell-quantity" data-column="quantity">{{ $order->totalQuantity }}</div>
                    <div class="cell cell-payment" data-column="payment">{{ $order->paymentMethod }}</div>
                    <div class="cell cell-amount" data-column="amount">₱{{ number_format($order->totalItemPrice, 2) }}</div>
                    <div class="cell cell-status">
                        <span class="status-indicator status-pending">{{ $order->deliveryStatus }}</span>
                    </div>
                </div>
                @endforeach
            </div>

            <div class="orders-list" id="shipList" style="display: none;">
                @foreach ($shippedOrders as $order)
                <div class="order-row">
                    <input type="hidden" value="{{ $order->deliveryStatus }}">
                    <div class="cell cell-order-no" data-column="orderNo">{{ $order->orderId }}</div>
                    <div class="cell cell-image">
                        <img src="{{ asset('storage/' . $order->productImg) }}" class="order-image-img" alt="">
                    </div>
                    <div class="cell cell-description" data-column="description">{{ $order->ProductName }}</div>
                    <div class="cell cell-quantity" data-column="quantity">{{ $order->totalQuantity }}</div>
                    <div class="cell cell-payment" data-column="payment">{{ $order->paymentMethod }}</div>
                    <div class="cell cell-amount" data-column="amount">₱{{ number_format($order->totalItemPrice, 2) }}</div>
                    <div class="cell cell-status">
                        <span class="status-indicator status-pending">{{ $order->deliveryStatus }}</span>
                    </div>
                </div>
                @endforeach
            </div>

            <div class="orders-list" id="completeList" style="display: none;">
                @foreach ($completedOrders as $order)
                <div class="order-row">
                    <input type="hidden" value="{{ $order->deliveryStatus }}">
                    <div class="cell cell-order-no" data-column="orderNo">{{ $order->orderId }}</div>
                    <div class="cell cell-image">
                        <img src="{{ asset('storage/' . $order->productImg) }}" class="order-image-img" alt="">
                    </div>
                    <div class="cell cell-description" data-column="description">{{ $order->ProductName }}</div>
                    <div class="cell cell-quantity" data-column="quantity">{{ $order->totalQuantity }}</div>
                    <div class="cell cell-payment" data-column="payment">{{ $order->paymentMethod }}</div>
                    <div class="cell cell-amount" data-column="amount">₱{{ number_format($order->totalItemPrice, 2) }}</div>
                    <div class="cell cell-status">
                        <span class="status-indicator status-pending">{{ $order->deliveryStatus }}</span>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
</body>
</html>
