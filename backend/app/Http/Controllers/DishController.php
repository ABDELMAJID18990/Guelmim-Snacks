<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dish;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Auth;

class DishController extends Controller
{
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category' => 'required|string',
            // 'image' => 'nullable|image' // On verra l'upload de fichiers plus tard pour simplifier
        ]);

        $user = $request->user();
        $restaurant = Restaurant::where('user_id', $user->id)->first();

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant introuvable'], 403);
        }

        $dish = Dish::create([
            'restaurant_id' => $restaurant->id,
            'name' => $fields['name'],
            'description' => $fields['description'],
            'price' => $fields['price'],
            'category' => $fields['category'],
            'image_url' => 'https://placehold.co/400', // Image par défaut pour l'instant
            'is_available' => true

        ]);

        return response()->json($dish, 201);
    }

    public function update(Request $request, $id)
    {
        $dish = Dish::find($id);

        if (!$dish) {
            return response()->json(['message' => 'Plat non trouvé'], 404);
        }

        $fields = $request->validate([
            'name' => 'sometimes|string',
            'description' => 'sometimes|string',
            'category' => 'sometimes|string',
            'price' => 'sometimes', 
            'is_available' => 'sometimes|boolean'
        ]);

        $dish->update($fields);
        return response()->json($dish, 200);
    }

    public function destroy($id)
    {

        $dish = Dish::find($id);

        if (!$dish) {
            return response()->json(['message' => 'Plat non trouvé'], 404);
        }

        $dish->delete();
        return response()->json(['message' => 'Plat supprimé avec success']);
    }
}
