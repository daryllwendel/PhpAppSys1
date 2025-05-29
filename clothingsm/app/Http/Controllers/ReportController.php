<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\orders;

class ReportController extends Controller
{
    public function salesReport(Request $request)
    {
        $filter = $request->query('filter', 'monthly');
        $now = Carbon::now();

        switch ($filter) {
            case 'daily':
                $startDate = $now->copy()->startOfDay();
                $endDate = $now->copy()->endOfDay();
                break;
            case 'weekly':
                $startDate = $now->copy()->startOfWeek();
                $endDate = $now->copy()->endOfWeek();
                break;
            case 'yearly':
                $startDate = $now->copy()->startOfYear();
                $endDate = $now->copy()->endOfYear();
                break;
            case 'monthly':
            default:
                $startDate = $now->copy()->startOfMonth();
                $endDate = $now->copy()->endOfMonth();
                break;
        }

        $sales = DB::table('vwordersummary')
            ->where('deliveryStatus', 'delivered')
            ->whereBetween('dateOrdered', [$startDate, $endDate])
            ->sum('totalItemPrice');

            
        $orders = DB::table('vwordersummary')
            ->where('deliveryStatus', 'delivered')
            ->whereBetween('dateOrdered', [$startDate, $endDate])
            ->get();

        return view('report', [
            'totalSales' => $sales ?? 0,
            'orders' => $orders
        ]);
    }


    public function getSalesReport(Request $request)
    {
        $filter = $request->get('filter', 'monthly');

        $query = DB::table('vwordersummary')->where('deliveryStatus', 'delivered');

        switch ($filter) {
            case 'daily':
                $query->whereDate('dateOrdered', today());
                break;
            case 'weekly':
                $query->whereBetween('dateOrdered', [now()->startOfWeek(), now()->endOfWeek()]);
                break;
            case 'monthly':
                $query->whereMonth('dateOrdered', now()->month)
                    ->whereYear('dateOrdered', now()->year);
                break;
            case 'yearly':
                $query->whereYear('dateOrdered', now()->year);
                break;
        }

        $orders = $query->get();
        $totalSales = $orders->sum('totalItemPrice');

        // Group the data based on filter
        $groupedData = $this->groupOrdersByPeriod($orders, $filter);

        return response()->json([
            'totalSales' => $totalSales,
            'groupedData' => $groupedData,
            'period' => $filter
        ]);
    }

    private function groupOrdersByPeriod($orders, $filter)
    {
        switch ($filter) {
            case 'daily':
                // For daily, group by hour
                return $orders->groupBy(function ($order) {
                    return Carbon::parse($order->dateOrdered)->format('H:00');
                })->map(function ($hourOrders, $hour) {
                    return [
                        'label' => $hour,
                        'period' => $hour,
                        'sales' => $hourOrders->sum('totalItemPrice'),
                        'orderCount' => $hourOrders->count(),
                        'date' => Carbon::parse($hourOrders->first()->dateOrdered)->format('M d, Y')
                    ];
                })->sortBy('period')->values();

            case 'weekly':
                // Group by day of the week
                return $orders->groupBy(function ($order) {
                    return Carbon::parse($order->dateOrdered)->format('Y-m-d');
                })->map(function ($dayOrders, $date) {
                    $carbonDate = Carbon::parse($date);
                    return [
                        'label' => $carbonDate->format('l'), // Monday, Tuesday, etc.
                        'period' => $carbonDate->format('M d'),
                        'sales' => $dayOrders->sum('totalItemPrice'),
                        'orderCount' => $dayOrders->count(),
                        'date' => $carbonDate->format('M d, Y'),
                        'sortKey' => $carbonDate->dayOfWeek
                    ];
                })->sortBy('sortKey')->values();

            case 'monthly':
                // Group by week of the month
                return $orders->groupBy(function ($order) {
                    $date = Carbon::parse($order->dateOrdered);
                    return $date->weekOfMonth;
                })->map(function ($weekOrders, $weekNumber) {
                    $firstOrder = $weekOrders->first();
                    $weekStart = Carbon::parse($firstOrder->dateOrdered)->startOfWeek();
                    $weekEnd = Carbon::parse($firstOrder->dateOrdered)->endOfWeek();
                    
                    return [
                        'label' => "Week {$weekNumber}",
                        'period' => $weekStart->format('M d') . ' - ' . $weekEnd->format('M d'),
                        'sales' => $weekOrders->sum('totalItemPrice'),
                        'orderCount' => $weekOrders->count(),
                        'date' => $weekStart->format('M d') . ' - ' . $weekEnd->format('M d, Y'),
                        'sortKey' => $weekNumber
                    ];
                })->sortBy('sortKey')->values();

            case 'yearly':
                // Group by month
                return $orders->groupBy(function ($order) {
                    return Carbon::parse($order->dateOrdered)->format('Y-m');
                })->map(function ($monthOrders, $monthKey) {
                    $carbonDate = Carbon::createFromFormat('Y-m', $monthKey);
                    return [
                        'label' => $carbonDate->format('F'), // January, February, etc.
                        'period' => $carbonDate->format('M Y'),
                        'sales' => $monthOrders->sum('totalItemPrice'),
                        'orderCount' => $monthOrders->count(),
                        'date' => $carbonDate->format('F Y'),
                        'sortKey' => $carbonDate->month
                    ];
                })->sortBy('sortKey')->values();

            default:
                return collect();
        }
    }


}