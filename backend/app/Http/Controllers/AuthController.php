<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $fields = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'string', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed'],

        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'role' => 'customer',
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function registerPartner(Request $request)
    {
        $fields = $request->validate([
            'nomGerant' => ['required', 'string'],
            'email' => ['required', 'string', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed'],
            'nomRestaurant' => ['required', 'string'],
            'adresseRestaurant' => ['required', 'string'],

        ]);

        $user = User::create([
            'name' => $fields['nomGerant'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'role' => 'manager',
        ]);

        $restaurant = Restaurant::create([
            'user_id' => $user->id,
            'name' => $fields['nomRestaurant'],
            'address' => $fields['adresseRestaurant'],
            'is_setup_complete' => false,
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'restaurant' => $restaurant,
            'token' => $token,
        ], 201);

    }

    public function login(Request $request)
    {

        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (! $user || ! Hash::check($fields['password'], $user->password)) {

            return response()->json([
                'message' => 'Email ou mot de passe incorrect',
            ], 401);
        }
        $restaurant = $user->restaurant;
        $user->is_setup_complete = $restaurant ? $restaurant->is_setup_complete :
        false;

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnecté avec succès',

        ]);
    }

    public function updatePassword(Request $request)
    {
        $fields = $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($fields['current_password'], $user->password)) {
            return response()->json([
                'message' => 'L\'ancien mot de passe est incorrect.'
            ], 422);
        }

        $user->update([
            'password' => Hash::make($fields['new_password'])
        ]);

        return response()->json(['message' => 'Mot de passe modifié avec succès !']);
    }
}
