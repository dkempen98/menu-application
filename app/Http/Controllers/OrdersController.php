<?php

namespace App\Http\Controllers;

use App\Models\Drink;
use App\Models\Orders;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $people = Orders::where('completed', false)->get();
        $orders = Orders::where('completed', false)
            ->select('orderable_name')
            ->groupBy('orderable_name')
            ->get();
        $orders->each(function ($order) use ($people) {
           $peopleArray = $people->where('orderable_name', '=', $order->orderable_name);
           $order->people = $peopleArray->values();
//           $order->people = $peopleArray;
        });

        return response()->json(compact('orders'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'drink_name' => 'required|string',
            'name' => 'required|string',
            'quantity' => 'nullable|integer',
        ]);

        $order = Orders::create([
            'orderable_type' => Drink::class,
            'orderable_id' => $request->input('drink_id', 0),
            'orderable_name' => $request->input('drink_name'),
            'name' => $request->input('name', 'n/a'),
            'quantity' => $request->input('quantity', 1),
            'completed' => false,
        ]);

        return response()->json(compact('order'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Orders $orders)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Orders $orders)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Orders $orders)
    {
        //
    }

    public function completeOrders(Request $request)
    {
        $request->validate([
           'orderIds' => 'required|array'
        ]);

        Orders::where('completed', false)
            ->whereIn('id', $request->input('orderIds'))
            ->update(['completed' => true]);

        return response()->json(['message' => 'Orders completed successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Orders $orders)
    {
        //
    }
}
