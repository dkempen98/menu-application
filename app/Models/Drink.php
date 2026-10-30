<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Drink extends Model
{
    protected $guarded = ['id'];

    public function orders(): MorphMany
    {
        return $this->morphMany(Order::class, 'orderable');
    }
}
