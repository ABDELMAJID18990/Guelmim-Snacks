<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_setup_complete' => 'boolean',
        'horaires' => 'array', 
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function dishes(){
        return $this->hasMany(Dish::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }



}
