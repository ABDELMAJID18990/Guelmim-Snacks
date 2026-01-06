<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'items' => 'required|array',
            'total_price' => 'required'
        ]);

        $user = $request->user();

        $order = Order::create([
            'restaurant_id' => $request->restaurant_id,
            'user_id' => $user->id,
            'customer_name' => $user->name,
            'total_price' => $request->total_price,
            'status' => 'new',
            'order_number' => '#' . strtoupper(Str::random(6)), // Ex: #AB12CD

        ]);

        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'dish_id' => $item['id'],
                'dish_name' => $item['name'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['price']

            ]);
        }

        return response()->json([
            'message' => 'Commande validée !',
            'order' => $order
        ], 201);
    }

    public function index(Request $request)
    {
        $user = $request->user();

        $restaurant = Restaurant::where('user_id', $user->id)->first();

        if (!$restaurant) {
            return response()->json([]);
        }

        $orders = Order::where('restaurant_id', $restaurant->id)
            ->with('items')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders, 200);
    }

    public function updateStatus(Request $request, $id)
    {

        $request->validate([
            'status' => 'required|string'
        ]);

        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Commande introuvable'], 404);
        }

        $order->update(['status' => $request->status]);

        $order->load('items');

        return response()->json($order, 200);
    }


    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Commande introuvable'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Commande refusée et supprimée avec succès']);
    }
}
