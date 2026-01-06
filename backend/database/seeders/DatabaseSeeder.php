<?php

namespace Database\Seeders;

use App\Models\Dish;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $managerAli = User::create([
            'name' => 'Ali Le Gérant',
            'email' => 'ali@gmail.com',
            'password' => Hash::make('123'),
            'role' => 'manager',
        ]);

        $bistroAli = Restaurant::create([
            'user_id' => $managerAli->id,
            'name' => 'Bistro Ali',
            'description' => "Bienvenue chez Bistro Ali, là où la tradition gourmande rencontre la passion familiale. Depuis plus de vingt ans, notre cuisine est le cœur battant de Guelmim.",
            'address' => 'Centre Ville, Guelmim',
            'phone' => '07-00-11-22-33',
            'logo_url' => 'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734',
            'is_setup_complete' => true,
        ]);


        $dishes = [
            [
                'name' => 'Pizza Regina',
                'description' => 'La classique : sauce tomate, mozzarella, jambon, et champignons frais.',
                'price' => 50.00,
                'category' => 'Pizza',
                'prep_time' => '20 min',
                'image_url' => 'https://images.unsplash.com/photo-1594007654729-407eedc4be65',
            ],
            [
                'name' => 'Tacos Poulet Gratiné',
                'description' => 'Poulet mariné, frites maison, sauce fromagère onctueuse, le tout gratiné au four.',
                'price' => 35.00,
                'category' => 'Tacos',
                'prep_time' => '15 min',
                'image_url' => 'https://images.unsplash.com/photo-1562086181-4494c643194a',
            ],
            [
                'name' => "Burger 'Sahara'",
                'description' => 'Double steak, cheddar, bacon de dinde, oignons frits et sauce barbecue fumée.',
                'price' => 45.00,
                'category' => 'Burgers',
                'prep_time' => '15 min',
                'image_url' => 'https://images.unsplash.com/photo-1571091718767-18b5b1457add',
            ],
            [
                'name' => 'Mojito Fraise',
                'description' => 'Boisson pétillante et rafraîchissante à la fraise et à la menthe.',
                'price' => 20.00,
                'category' => 'Boissons',
                'prep_time' => '5 min',
                'image_url' => 'https://images.unsplash.com/photo-1543364195-bfe6e49323d7',
            ],
        ];


        foreach ($dishes as $dish) {
            Dish::create([
                'restaurant_id' => $bistroAli->id, 
                'name' => $dish['name'],
                'description' => $dish['description'],
                'price' => $dish['price'],
                'category' => $dish['category'],
                'prep_time' => $dish['prep_time'],
                'image_url' => $dish['image_url'],
                'is_available' => true,
            ]);
        }


        $manager2 = User::create([
            'name' => 'Sara Queen',
            'email' => 'sara@gmail.com',
            'password' => Hash::make('password123'),
            'role' => 'manager',
        ]);

        Restaurant::create([
            'user_id' => $manager2->id,
            'name' => 'Burger Queen',
            'description' => 'Les meilleurs burgers de Hay El Matar.',
            'address' => 'Hay El Matar, Guelmim',
            'phone' => '06-00-00-00-00',
            'logo_url' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
            'is_setup_complete' => true,
        ]);
    }
}
