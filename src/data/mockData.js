

export const mockSnackData = {
  name: 'Bistro Ali',
  description: "Bienvenue chez Bistro Ali, là où la tradition gourmande rencontre la passion familiale. Depuis plus de vingt ans, notre cuisine est le cœur battant de Guelmim. Chaque plat est préparé avec des ingrédients frais et l'amour du goût authentique.",
  address: "192 Bd Moulay Rachid, Guelmim 81000",
  phone: "07-00-11-22-33",
  logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4SxdR6cjW45b6kd8m5-MLvgCzitQHXSjGA&s',
  socials: {
    instagram: '#',
    facebook: '#',
    tiktok: '#'
  }
};

export const mockDishes = [
  { id: 1, name: "Pizza Regina", description: "La classique : sauce tomate, mozzarella, jambon, et champignons frais.", price: 50.00, prepTime: "20 min", imageUrl: "https://images.unsplash.com/photo-1594007654729-407eedc4be65" },
  { id: 2, name: "Tacos Poulet Gratiné", description: "Poulet mariné, frites maison, sauce fromagère onctueuse, le tout gratiné au four.", price: 35.00, prepTime: "15 min", imageUrl: "https://images.unsplash.com/photo-1562086181-4494c643194a" },
  { id: 3, name: "Burger 'Sahara'", description: "Double steak, cheddar, bacon de dinde, oignons frits et sauce barbecue fumée.", price: 45.00, prepTime: "15 min", imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add" },
  { id: 4, name: "Pizza Végétarienne", description: "Légumes de saison grillés, sauce tomate, mozzarella, olives noires.", price: 45.00, prepTime: "20 min", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
  { id: 5, name: "Mojito Fraise (sans alcool)", description: "Boisson pétillante et rafraîchissante à la fraise et à la menthe.", price: 20.00, prepTime: "5 min", imageUrl: "https://images.unsplash.com/photo-1543364195-bfe6e49323d7" }
];

export const mockSnacks = [
  {
    id: 1, // ID unique pour la route /snack/1
    name: 'Bistro Ali',
    category: 'Pizza au feu de bois & Tacos',
    rating: 4.8,
    priceRange: '30 - 80 DH',
    address: 'Centre Ville',
    imageUrl: 'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734'
  },
  {
    id: 2, // ID unique pour la route /snack/2
    name: 'Burger Queen',
    category: 'Burgers & Grillades',
    rating: 4.6,
    priceRange: '35 - 90 DH',
    address: 'Hay El Matar',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
  },
  {
    id: 3, // ID unique pour la route /snack/3
    name: 'Tacos de Lyon',
    category: 'Tacos Français & Poutines',
    rating: 4.7,
    priceRange: '25 - 50 DH',
    address: 'Av. El Kadi Ayad',
    imageUrl: 'https://images.unsplash.com/photo-1628198797371-38a4d4ea0a15'
  },
  {
    id: 4, // ID unique pour la route /snack/4
    name: 'Oasis Salade',
    category: 'Salades & Jus Frais',
    rating: 4.9,
    priceRange: '30 - 60 DH',
    address: 'Près de la place principale',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
  }
];