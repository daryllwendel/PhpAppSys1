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
            'totalSales' => $sales->totalSales ?? 0,
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

        $formattedOrders = $orders->map(function ($order) {
            return [
                'orderId'        => $order->orderId,
                'product_name'   => $order->ProductName,
                'product_image'  => $order->productImg,
                'quantity'       => $order->quantity,
                'customer_name'  => $order->name,
                'payment_method' => $order->paymentMethod,
                'amount'         => $order->totalItemPrice,
                'dateOrdered'    => $order->dateOrdered,
            ];
        });

        return response()->json([
            'totalSales' => $totalSales,
            'orders'     => $formattedOrders,
        ]);
    }


}