<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoredrinkRequest;
use App\Http\Requests\UpdatedrinkRequest;
use App\Models\drink;
use App\Models\Holiday;
use App\Models\LiquorType;
use App\Models\Meal;
use Illuminate\Database\Query\Builder;

class DrinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $typeIds = Meal::query()
            ->where('active', true)
            ->where('meal_type_id', '=', 12)
            ->pluck('liquor_type')
            ->filter()
            ->flatten()
            ->unique()
            ->values()
            ->all();

        $types = LiquorType::query()
            ->whereIn('id', $typeIds)
            ->orderBy("name")
            ->pluck("name")
            ->values()
            ->all();

        return response()->json(compact('types'));
    }

    public function liquorDrinks($liquorName) {
        $holiday = Holiday::where('name', '=', $liquorName)->first();

        $query = Meal::query()
            ->where('active', true)
            ->where('meal_type_id', '=', 12);

        if($liquorName !== "all") {
            if ($holiday) {
                $query->where('holiday_id', '=', $holiday->id);
            } else {
                $liquor = LiquorType::where('name', '=', $liquorName)->first();
                $query->whereJsonContains('liquor_type', $liquor?->id);
            }
        }

        $drinks = $query->orderBy("name")
            ->pluck("name")
            ->values()
            ->all();

        return response()->json(compact('drinks'));
    }

    public function getDrinkDetails($drinkName) {
        $drinkName = implode(" ", (explode("-", $drinkName)));
        $drink = Meal::query()
            ->where('name', '=', $drinkName)
            ->where('active', true)
            ->where('meal_type_id', '=', 12)
            ->with(['recipes' => fn ($q) => $q
            ->withAggregate('ingredient', 'name')
            ->withAggregate('unit', 'name'),
        ])->first();

        return response()->json(compact('drink'));
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
    public function store(StoredrinkRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(drink $drink)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(drink $drink)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatedrinkRequest $request, drink $drink)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(drink $drink)
    {
        //
    }
}
