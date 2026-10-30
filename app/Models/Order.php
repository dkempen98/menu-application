<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Order extends Model
{
    protected $guarded = ['id'];

    public function orderable(): MorphTo
    {
        return $this->morphTo();
    }
}
