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
                    <input type="text" class="search-input" id="searchReportsInput" placeholder="Search orders...">
                    <button class="search-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
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
                    ₱{{ number_format($totalSales ?? 0, 2) }}
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
                            <th>Week/Month/Day</th>
                            <th>Period</th>
                            <th>Orders</th>
                            <th>Sales Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody id="ordersTableBody">
                        <tr>
                            <td colspan="5" style="text-align: center; font-weight: bold;">Select from the drop down box to load data.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <script>
            function filterReports(period) {
                document.getElementById('ordersTableBody').innerHTML =
                    '<tr><td colspan="5" class="no-data">Loading...</td></tr>';

                fetch(`/api/sales-report?filter=${period}`)
                    .then(response => response.json())
                    .then(data => {
                        // Update summary
                        document.getElementById('summaryTitle').textContent =
                            `Total Sales (${period.charAt(0).toUpperCase() + period.slice(1)})`;
                        document.getElementById('summaryAmount').textContent =
                            `₱${data.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

                        // Update table with grouped data
                        updateGroupedTable(data.groupedData, period);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        document.getElementById('ordersTableBody').innerHTML =
                            '<tr><td colspan="5" class="no-data">Error loading data</td></tr>';
                    });
            }

            function updateGroupedTable(groupedData, period) {
                const tbody = document.getElementById('ordersTableBody');
                tbody.innerHTML = '';

                if (groupedData && groupedData.length > 0) {
                    groupedData.forEach(group => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                        <td><strong>${group.label}</strong></td>
                        <td>${group.period}</td>
                        <td>${group.orderCount} orders</td>
                        <td>₱${group.sales.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td>${group.date}</td>
                    `;
                        tbody.appendChild(row);
                    });
                } else {
                    tbody.innerHTML = '<tr><td colspan="5" class="no-data">No data found for the selected period</td></tr>';
                }
            }

            // Update table headers for grouped view
            function updateTableHeaders(period) {
                const thead = document.querySelector('.reports-table thead tr');

                let headers = '';
                switch (period) {
                    case 'daily':
                        headers = `
                        <th>Hour</th>
                        <th>Time Range</th>
                        <th>Orders</th>
                        <th>Sales Amount</th>
                        <th>Date</th>
                    `;
                        break;
                    case 'weekly':
                        headers = `
                        <th>Day</th>
                        <th>Date</th>
                        <th>Orders</th>
                        <th>Sales Amount</th>
                        <th>Full Date</th>
                    `;
                        break;
                    case 'monthly':
                        headers = `
                        <th>Week</th>
                        <th>Date Range</th>
                        <th>Orders</th>
                        <th>Sales Amount</th>
                        <th>Period</th>
                    `;
                        break;
                    case 'yearly':
                        headers = `
                        <th>Month</th>
                        <th>Period</th>
                        <th>Orders</th>
                        <th>Sales Amount</th>
                        <th>Full Period</th>
                    `;
                        break;
                }

                thead.innerHTML = headers;
            }

            // Modified filter function to update headers
            function filterReports(period) {
                // Update table headers first
                updateTableHeaders(period);

                document.getElementById('ordersTableBody').innerHTML =
                    '<tr><td colspan="5" class="no-data">Loading...</td></tr>';

                fetch(`/api/sales-report?filter=${period}`)
                    .then(response => response.json())
                    .then(data => {
                        // Update summary
                        document.getElementById('summaryTitle').textContent =
                            `Total Sales (${period.charAt(0).toUpperCase() + period.slice(1)})`;
                        document.getElementById('summaryAmount').textContent =
                            `₱${data.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

                        // Update table with grouped data
                        updateGroupedTable(data.groupedData, period);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        document.getElementById('ordersTableBody').innerHTML =
                            '<tr><td colspan="5" class="no-data">Error loading data</td></tr>';
                    });
            }

            // Load initial data when page loads
            document.addEventListener('DOMContentLoaded', function () {
                filterReports('monthly');
            });

            // Updated search functionality for grouped data
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
            document.addEventListener('DOMContentLoaded', function () {
                const searchInput = document.querySelector('.search-input');
                searchInput.addEventListener('input', searchOrders);
            });
        </script>
    </div>


</body>

</html>