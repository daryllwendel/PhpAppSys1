<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Reports</title>
    <style>
        
    </style>
    <link rel="stylesheet" href="{{asset('css/reports.css')}}">
</head>
<body>
  <div class="reportcontent">
    <div class="container">
        <!-- Search Section -->
        <div class="search-section">
            <div class="search-container">
                <input type="text" class="search-input" placeholder="Search orders...">
                <button class="search-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </button>
            </div>
            
            <select id="filterSelect" class="filter-select" onchange="filterReports(this.value)">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly" selected>Monthly</option>
                <option value="yearly">Annual</option>
            </select>
        </div>

        <!-- Summary Section -->
        <div class="summary-section">
            <div class="summary-title" id="summaryTitle">
                Total Sales (Monthly)
            </div>
            <div class="summary-amount" id="summaryAmount">
                ₱0.00
            </div>
        </div>

        <!-- Reports Section -->
        <div class="reports-section">
            <div class="reports-header">
                <h2 class="reports-title">Reports</h2>
                <select class="sort-select">
                    <option>Order No.</option>
                    <option>Customer Name</option>
                    <option>Amount</option>
                    <option>Date</option>
                </select>
            </div>

            <table class="reports-table">
                <thead>
                    <tr>
                        <th>Order No.</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Customer Name</th>
                        <th>Payment Method</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody id="ordersTableBody">
    @forelse ($orders as $ordersDeliveredView)
        <tr>
            <td>{{ $ordersDeliveredView->orderId }}</td>
            <td>
                <div class="product-image">
                    <img src="{{ asset('storage/' . $ordersDeliveredView->productImg) }}" alt="Product" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">
                </div>
            </td>
            <td>{{ $ordersDeliveredView->ProductName }}</td>
            <td>{{ $ordersDeliveredView->quantity }}</td>
            <td>{{ $ordersDeliveredView->name }}</td>
            <td>{{ $ordersDeliveredView->paymentMethod }}</td>
            <td>₱{{ number_format($ordersDeliveredView->totalItemPrice, 2) }}</td>
        </tr>
    @empty
        <tr>
            <td colspan="7" class="no-data">No orders found</td>
        </tr>
    @endforelse
</tbody>
            </table>
        </div>
    </div>

    <script>
    function filterReports(period) {
            document.getElementById('ordersTableBody').innerHTML = 
                '<tr><td colspan="7" class="no-data">Loading...</td></tr>';
            
            
            fetch(`/api/sales-report?filter=${period}`)
                .then(response => response.json())
                .then(data => {
                    // Update summary
                    document.getElementById('summaryTitle').textContent = `Total Sales (${period.charAt(0).toUpperCase() + period.slice(1)})`;
                    document.getElementById('summaryAmount').textContent = `₱${data.totalSales.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
                    
                    // Update table
                    const tbody = document.getElementById('ordersTableBody');
                    tbody.innerHTML = '';
                    
                    if (data.orders && data.orders.length > 0) {
                        data.orders.forEach(order => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>#${order.id}</td>
                                <td>
                                    <div class="product-image">
                                        ${order.productImg ? 
                                            `<img src="${order.productImg}" alt="Product" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">` : 
                                            'IMG'
                                        }
                                    </div>
                                </td>
                                <td>${order.product_name}</td>
                                <td>${order.quantity}</td>
                                <td>${order.customer_name}</td>
                                <td>${order.payment_method}</td>
                                <td>₱${order.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                            `;
                            tbody.appendChild(row);
                        });
                    } else {
                        tbody.innerHTML = '<tr><td colspan="7" class="no-data">No orders found for the selected period</td></tr>';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('ordersTableBody').innerHTML = 
                        '<tr><td colspan="7" class="no-data">Error loading data</td></tr>';
                });
        }

        // Load initial data when page loads
        document.addEventListener('DOMContentLoaded', function() {
            filterReports('monthly');
        });

        // Search functionality
        function searchOrders() {
            const searchTerm = document.querySelector('.search-input').value.toLowerCase();
            const rows = document.querySelectorAll('#ordersTableBody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        // Add search event listener
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.querySelector('.search-input');
            searchInput.addEventListener('input', searchOrders);
        });
  </script>
  </div>

  
</body>
</html>