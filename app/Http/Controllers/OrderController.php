<?php

namespace App\Http\Controllers;

use App\Models\Drink;
use App\Models\Meal;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $people = Order::where('completed', false)->get();
        $orders = Order::where('completed', false)
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
            'orderable_name' => 'required|string',
            'name' => 'required|string',
            'quantity' => 'nullable|integer',
        ]);

        $meal = Meal::where("name", "=", $request->input("orderable_name"))->first();

        $order = Order::create([
            'orderable_type' => Meal::class,
            'orderable_id' => $meal->id,
            'orderable_name' => $request->input('orderable_name'),
            'name' => $request->input('name', 'n/a'),
            'quantity' => $request->input('quantity', 1),
            'completed' => false,
        ]);

        return response()->json(compact('order'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    public function completeOrders(Request $request)
    {
        $request->validate([
           'orderIds' => 'required|array'
        ]);

        Order::where('completed', false)
            ->whereIn('id', $request->input('orderIds'))
            ->update(['completed' => true]);

        return response()->json(['message' => 'Orders completed successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
