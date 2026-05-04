export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  modelPath?: string;
  category: string;
  categoryLabel: string;
}

export const menuItems: MenuItem[] = [
  // Espresso
  { id: 'classic-espresso', name: "Classic Espresso", desc: "Double shot, rich crema", price: "$3.50", modelPath: "espresso-cup.glb", category: "espresso", categoryLabel: "Espresso" },
  { id: 'cappuccino', name: "Cappuccino", desc: "Equal parts foam, milk, espresso", price: "$4.75", modelPath: "cappuccino.glb", category: "espresso", categoryLabel: "Espresso" },
  { id: 'vanilla-latte', name: "Vanilla Latte", desc: "House-made vanilla syrup", price: "$5.25", modelPath: "latte.glb", category: "espresso", categoryLabel: "Espresso" },
  { id: 'caramel-macchiato', name: "Caramel Macchiato", desc: "Slow-poured caramel ribbon", price: "$5.50", modelPath: "macchiato.glb", category: "espresso", categoryLabel: "Espresso" },

  // Pour Over
  { id: 'ethiopian-yirgacheffe', name: "Ethiopian Yirgacheffe", desc: "Bright, floral, citrus", price: "$6.00", modelPath: "pour-over.glb", category: "pourOver", categoryLabel: "Pour Over" },
  { id: 'colombian-huila', name: "Colombian Huila", desc: "Caramel, nutty, smooth", price: "$5.75", modelPath: "pour-over.glb", category: "pourOver", categoryLabel: "Pour Over" },

  // Cold Drinks
  { id: 'cold-brew', name: "Cold Brew", desc: "Steeped 18 hours", price: "$4.50", modelPath: "cold-brew.glb", category: "cold", categoryLabel: "Cold Drinks" },
  { id: 'iced-oat-latte', name: "Iced Oat Latte", desc: "Creamy, smooth, dairy-free", price: "$5.50", modelPath: "iced-latte.glb", category: "cold", categoryLabel: "Cold Drinks" },
  { id: 'affogato', name: "Affogato", desc: "Vanilla bean ice cream + espresso", price: "$6.25", modelPath: "affogato.glb", category: "cold", categoryLabel: "Cold Drinks" },

  // Bakery
  { id: 'cupcake', name: "Cupcake", desc: "Extra chocolate marshmallow cupcake", price: "$4.50", modelPath: "extra_chocolate_marshmallow_cupcake.glb", category: "bakery", categoryLabel: "From the Bakery" },
  { id: 'butter-croissant', name: "Butter Croissant", desc: "Baked fresh at 5am", price: "$4.00", category: "bakery", categoryLabel: "From the Bakery" },
  { id: 'almond-pain-au-chocolat', name: "Almond Pain au Chocolat", desc: "Toasted almonds, dark chocolate", price: "$4.75", category: "bakery", categoryLabel: "From the Bakery" },
  { id: 'banana-walnut-loaf', name: "Banana Walnut Loaf", desc: "Warm, with cinnamon butter", price: "$5.00", category: "bakery", categoryLabel: "From the Bakery" },
  { id: 'avocado-toast', name: "Avocado Toast", desc: "Sourdough, sea salt, chili oil", price: "$9.50", category: "bakery", categoryLabel: "From the Bakery" },
];

export const categories = [
  { id: 'espresso', label: 'Espresso', items: menuItems.filter(i => i.category === 'espresso') },
  { id: 'pourOver', label: 'Pour Over', items: menuItems.filter(i => i.category === 'pourOver') },
  { id: 'cold', label: 'Cold Drinks', items: menuItems.filter(i => i.category === 'cold') },
  { id: 'bakery', label: 'From the Bakery', items: menuItems.filter(i => i.category === 'bakery') },
];

export function getItemById(id: string): MenuItem | undefined {
  return menuItems.find(item => item.id === id);
}