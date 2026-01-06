<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Dish extends Model
{

    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_available' => 'boolean',
        'price' => 'float', 
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
