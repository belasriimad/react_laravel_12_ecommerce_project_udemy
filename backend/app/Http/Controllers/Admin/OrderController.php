<?php

namespace App\Http\Controllers\Admin;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class OrderController extends Controller
{
    /**
     * Display all the orders
     */
    public function index()
    {
        $orders = Order::with(['products','user','coupon'])->latest()->get();
        return view('admin.orders.index')->with([
            'orders' => $orders
        ]);
    }

    /**
     * Update the orders delivered at date
     */
    public function updateDeliveredAtDate(Order $order)
    {
        $order->update([
            'delivered_at' => Carbon::now()
        ]);
        return redirect()->route('admin.orders.index')->with([
            'success' => 'Order updated successfully'
        ]);
    }

     /**
     * delete orders
     */
    public function delete(Order $order)
    {
        $order->delete();
        return redirect()->route('admin.orders.index')->with([
            'success' => 'Order deleted successfully'
        ]);
    }
}
