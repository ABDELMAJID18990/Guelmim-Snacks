<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class RestaurantController extends Controller
{
    public function index()
    {
        $snacks = Restaurant::all();

        return response()->json($snacks, 200);
    }

    public function show(int $id)
    {

        $snack = Restaurant::with('dishes')->find($id);


        if (!$snack) {
            return response()->json([
                ['message' => 'Restaurant non trouvé']
            ], 404);
        }

        return response()->json($snack, 200);
    }

    public function menu()
    {
        $dishes = Dish::with('restaurant')->get();

        return response()->json($dishes, 200);
    }

    public function myRestaurant(Request $request)
    {

        $user = auth('sanctum')->user();

        if (!$user) {
            return response()->json(['message' => 'Non autorisé. Veuillez vous reconnecter.'], 401);
        }

        $restaurant = Restaurant::where('user_id', $user->id)
            ->with('dishes')
            ->first();

        if (!$restaurant) {
            return response()->json(['message' => 'Aucun restaurant trouvé pour ce gérant.'], 200);
        }

        return response()->json($restaurant, 200);
    }

    public function updateSetup(Request $request)
    {

        $user = $request->user();

        $restaurant = Restaurant::where('user_id', $user->id)->first();

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant introuvable'], 404);
        }


        $request->validate([
            'description' => 'required|string',
            'horaires' => 'required|string',
            'logo' => 'nullable|image|max:2048',
            'cover_image' => 'nullable|image|max:4096',
        ]);

        $dataToUpdate = [
            'description' => $request->description,
            'is_setup_complete' => true
        ];

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $dataToUpdate['logo_url'] = asset('storage/' . $path);
        }
        if ($request->hasFile('cover_image')) {

            $pathCover = $request->file('cover_image')->store('covers', 'public');
            $dataToUpdate['cover_image_url'] = asset('storage/' . $pathCover);
        }

        $restaurant->update($dataToUpdate);

        return response()->json([
            'message' => 'Configuration terminée avec succès',
            'restaurant' => $restaurant
        ], 200);
    }

    public function updateRestaurant(Request $request)
    {

        //$user = $request->user;
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json(['message' => 'Token invalide ou utilisateur non trouvé'], 401);
        }

        $restaurant = $user->restaurant;

        if (!$restaurant) return response()->json(
            ['message' => 'Non trouvé'],
            404
        );

        $request->validate([
            'name' => 'nullable|string',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'horaires' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',

        ]);

        $data = [];

        if ($request->filled('name')) $data['name'] = $request->name;
        if ($request->filled('description')) $data['description'] = $request->description;
        if ($request->filled('address')) $data['address'] = $request->address;

        if($request->has('horaires')){
            $decodedHoraires =  $data['horaires'] = json_decode($request->horaires, true);
            if($decodedHoraires) $data['horaires'] = $decodedHoraires;
        }

        if ($request->has('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $data['logo_url'] = asset('storage/' . $path);
        }

        if (!empty($data)) {
        $restaurant->update($data);
    }

        return response()->json(['message' => 'Restaurant mis à jour', 'restaurant' => $restaurant]);
    }
}
