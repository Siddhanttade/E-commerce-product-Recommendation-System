const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Product = require('../models/Product');
const Behavior = require('../models/Behavior');
const User = require('../models/User');

const products = [
  // Electronics (25 products)
  { name: 'Gaming Laptop', category: 'Electronics', tags: ['gaming', 'high-performance', 'laptop'], price: 1299, description: 'High-end gaming laptop with RTX graphics.', rating: 4.7 },
  { name: 'Noise-Cancelling Headphones', category: 'Electronics', tags: ['audio', 'premium', 'wireless'], price: 299, description: 'Immersive sound with active noise cancellation.', rating: 4.6 },
  { name: 'Mechanical Keyboard', category: 'Electronics', tags: ['gaming', 'accessory', 'rgb'], price: 129, description: 'Clicky RGB mechanical keyboard.', rating: 4.5 },
  { name: '4K Monitor', category: 'Electronics', tags: ['display', 'work', 'gaming'], price: 449, description: 'Crisp 4K visuals for work and play.', rating: 4.8 },
  { name: 'Bluetooth Speaker', category: 'Electronics', tags: ['audio', 'wireless', 'portable'], price: 79, description: 'Portable speaker with amazing bass.', rating: 4.4 },
  { name: 'Smart Watch', category: 'Electronics', tags: ['wearable', 'fitness', 'tech'], price: 249, description: 'Track your health and notifications.', rating: 4.5 },
  { name: 'Wireless Mouse', category: 'Electronics', tags: ['gaming', 'accessory', 'wireless'], price: 59, description: 'Ergonomic wireless gaming mouse.', rating: 4.3 },
  { name: 'USB-C Hub', category: 'Electronics', tags: ['accessory', 'work', 'connectivity'], price: 45, description: 'Multi-port USB-C adapter.', rating: 4.2 },
  { name: 'Wireless Earbuds', category: 'Electronics', tags: ['audio', 'wireless', 'portable'], price: 149, description: 'True wireless earbuds with ANC.', rating: 4.6 },
  { name: 'Webcam HD', category: 'Electronics', tags: ['work', 'streaming', 'video'], price: 89, description: '1080p webcam for video calls.', rating: 4.4 },
  { name: 'External SSD 1TB', category: 'Electronics', tags: ['storage', 'portable', 'work'], price: 119, description: 'Fast portable SSD storage.', rating: 4.7 },
  { name: 'Gaming Headset', category: 'Electronics', tags: ['gaming', 'audio', 'rgb'], price: 179, description: 'Surround sound gaming headset.', rating: 4.5 },
  { name: 'Tablet 10-inch', category: 'Electronics', tags: ['portable', 'entertainment', 'work'], price: 329, description: 'Lightweight tablet for work and play.', rating: 4.3 },
  { name: 'Power Bank 20000mAh', category: 'Electronics', tags: ['portable', 'charging', 'travel'], price: 49, description: 'High-capacity portable charger.', rating: 4.5 },
  { name: 'Smart LED Bulbs', category: 'Electronics', tags: ['smart-home', 'lighting', 'wireless'], price: 39, description: 'WiFi-enabled color LED bulbs.', rating: 4.2 },
  { name: 'Streaming Microphone', category: 'Electronics', tags: ['audio', 'streaming', 'work'], price: 99, description: 'Professional USB microphone.', rating: 4.6 },
  { name: 'Portable Projector', category: 'Electronics', tags: ['entertainment', 'portable', 'display'], price: 399, description: 'Compact HD projector.', rating: 4.4 },
  { name: 'Fitness Tracker', category: 'Electronics', tags: ['wearable', 'fitness', 'health'], price: 79, description: 'Track steps, heart rate, and sleep.', rating: 4.3 },
  { name: 'Wireless Charger', category: 'Electronics', tags: ['charging', 'wireless', 'accessory'], price: 29, description: 'Fast wireless charging pad.', rating: 4.4 },
  { name: 'Smart Doorbell', category: 'Electronics', tags: ['smart-home', 'security', 'video'], price: 159, description: 'Video doorbell with motion detection.', rating: 4.5 },
  { name: 'Gaming Controller', category: 'Electronics', tags: ['gaming', 'accessory', 'wireless'], price: 69, description: 'Wireless controller for PC and console.', rating: 4.6 },
  { name: 'Portable Hard Drive 2TB', category: 'Electronics', tags: ['storage', 'portable', 'backup'], price: 79, description: 'Large capacity portable storage.', rating: 4.3 },
  { name: 'Smart Thermostat', category: 'Electronics', tags: ['smart-home', 'energy', 'wireless'], price: 199, description: 'WiFi-enabled smart thermostat.', rating: 4.4 },
  { name: 'Action Camera', category: 'Electronics', tags: ['camera', 'portable', 'adventure'], price: 249, description: '4K action camera for adventures.', rating: 4.7 },
  { name: 'E-Reader', category: 'Electronics', tags: ['reading', 'portable', 'entertainment'], price: 139, description: 'E-ink display for comfortable reading.', rating: 4.5 },
  
  // Fitness (25 products)
  { name: 'Yoga Mat', category: 'Fitness', tags: ['exercise', 'home', 'yoga'], price: 29, description: 'Non-slip yoga mat for home workouts.', rating: 4.6 },
  { name: 'Dumbbells Set', category: 'Fitness', tags: ['strength', 'workout', 'home'], price: 89, description: 'Adjustable dumbbell set.', rating: 4.7 },
  { name: 'Running Shoes', category: 'Fitness', tags: ['cardio', 'shoes', 'running'], price: 119, description: 'Lightweight running shoes.', rating: 4.5 },
  { name: 'Protein Powder', category: 'Fitness', tags: ['nutrition', 'supplement', 'protein'], price: 49, description: 'Whey protein for muscle recovery.', rating: 4.4 },
  { name: 'Resistance Bands', category: 'Fitness', tags: ['strength', 'home', 'portable'], price: 24, description: 'Set of resistance bands.', rating: 4.3 },
  { name: 'Foam Roller', category: 'Fitness', tags: ['recovery', 'massage', 'exercise'], price: 35, description: 'Muscle recovery foam roller.', rating: 4.5 },
  { name: 'Exercise Bike', category: 'Fitness', tags: ['cardio', 'home', 'cycling'], price: 399, description: 'Stationary exercise bike.', rating: 4.6 },
  { name: 'Treadmill', category: 'Fitness', tags: ['cardio', 'running', 'home'], price: 799, description: 'Foldable home treadmill.', rating: 4.7 },
  { name: 'Kettlebell Set', category: 'Fitness', tags: ['strength', 'workout', 'home'], price: 79, description: 'Cast iron kettlebell set.', rating: 4.5 },
  { name: 'Pull-up Bar', category: 'Fitness', tags: ['strength', 'home', 'exercise'], price: 39, description: 'Doorway pull-up bar.', rating: 4.4 },
  { name: 'Jump Rope', category: 'Fitness', tags: ['cardio', 'portable', 'workout'], price: 15, description: 'Speed jump rope for cardio.', rating: 4.3 },
  { name: 'Gym Bag', category: 'Fitness', tags: ['accessory', 'storage', 'portable'], price: 45, description: 'Spacious gym duffel bag.', rating: 4.4 },
  { name: 'Water Bottle', category: 'Fitness', tags: ['hydration', 'portable', 'accessory'], price: 25, description: 'Insulated water bottle.', rating: 4.5 },
  { name: 'Workout Gloves', category: 'Fitness', tags: ['accessory', 'strength', 'workout'], price: 19, description: 'Padded workout gloves.', rating: 4.2 },
  { name: 'Ankle Weights', category: 'Fitness', tags: ['strength', 'workout', 'portable'], price: 29, description: 'Adjustable ankle weights.', rating: 4.3 },
  { name: 'Medicine Ball', category: 'Fitness', tags: ['strength', 'workout', 'home'], price: 35, description: 'Weighted medicine ball.', rating: 4.4 },
  { name: 'Yoga Blocks', category: 'Fitness', tags: ['yoga', 'accessory', 'exercise'], price: 18, description: 'Set of 2 yoga blocks.', rating: 4.3 },
  { name: 'Ab Roller', category: 'Fitness', tags: ['strength', 'core', 'workout'], price: 22, description: 'Ab wheel roller for core.', rating: 4.4 },
  { name: 'Fitness Tracker Watch', category: 'Fitness', tags: ['wearable', 'tech', 'tracking'], price: 129, description: 'Advanced fitness tracking watch.', rating: 4.6 },
  { name: 'Massage Gun', category: 'Fitness', tags: ['recovery', 'massage', 'portable'], price: 149, description: 'Percussion massage gun.', rating: 4.7 },
  { name: 'Workout Bench', category: 'Fitness', tags: ['strength', 'home', 'exercise'], price: 159, description: 'Adjustable workout bench.', rating: 4.5 },
  { name: 'Pilates Ring', category: 'Fitness', tags: ['pilates', 'exercise', 'home'], price: 24, description: 'Resistance pilates ring.', rating: 4.2 },
  { name: 'Suspension Trainer', category: 'Fitness', tags: ['strength', 'portable', 'workout'], price: 89, description: 'Bodyweight suspension trainer.', rating: 4.6 },
  { name: 'Yoga Strap', category: 'Fitness', tags: ['yoga', 'accessory', 'flexibility'], price: 12, description: 'Stretching yoga strap.', rating: 4.3 },
  { name: 'Rowing Machine', category: 'Fitness', tags: ['cardio', 'home', 'full-body'], price: 599, description: 'Magnetic rowing machine.', rating: 4.7 },
  
  // Office (25 products)
  { name: 'Ergonomic Chair', category: 'Office', tags: ['furniture', 'ergonomic', 'work'], price: 299, description: 'Comfortable office chair.', rating: 4.6 },
  { name: 'Standing Desk', category: 'Office', tags: ['furniture', 'ergonomic', 'work'], price: 399, description: 'Adjustable standing desk.', rating: 4.7 },
  { name: 'Desk Lamp', category: 'Office', tags: ['lighting', 'work', 'accessory'], price: 45, description: 'LED desk lamp with adjustable brightness.', rating: 4.4 },
  { name: 'Laptop Stand', category: 'Office', tags: ['accessory', 'ergonomic', 'work'], price: 39, description: 'Aluminum laptop stand.', rating: 4.3 },
  { name: 'Monitor Arm', category: 'Office', tags: ['accessory', 'ergonomic', 'display'], price: 89, description: 'Adjustable monitor arm mount.', rating: 4.5 },
  { name: 'Desk Organizer', category: 'Office', tags: ['storage', 'accessory', 'organization'], price: 29, description: 'Multi-compartment desk organizer.', rating: 4.3 },
  { name: 'Wireless Keyboard', category: 'Office', tags: ['accessory', 'wireless', 'work'], price: 69, description: 'Slim wireless keyboard.', rating: 4.4 },
  { name: 'Ergonomic Mouse Pad', category: 'Office', tags: ['accessory', 'ergonomic', 'work'], price: 19, description: 'Gel wrist rest mouse pad.', rating: 4.2 },
  { name: 'Cable Management Box', category: 'Office', tags: ['organization', 'accessory', 'storage'], price: 24, description: 'Hide and organize cables.', rating: 4.3 },
  { name: 'Whiteboard', category: 'Office', tags: ['planning', 'work', 'organization'], price: 49, description: 'Magnetic dry erase whiteboard.', rating: 4.5 },
  { name: 'File Cabinet', category: 'Office', tags: ['storage', 'furniture', 'organization'], price: 159, description: '3-drawer file cabinet.', rating: 4.4 },
  { name: 'Bookshelf', category: 'Office', tags: ['storage', 'furniture', 'organization'], price: 129, description: '5-tier bookshelf.', rating: 4.5 },
  { name: 'Desk Mat', category: 'Office', tags: ['accessory', 'work', 'organization'], price: 35, description: 'Large leather desk mat.', rating: 4.4 },
  { name: 'Paper Shredder', category: 'Office', tags: ['security', 'work', 'organization'], price: 79, description: 'Cross-cut paper shredder.', rating: 4.3 },
  { name: 'Label Maker', category: 'Office', tags: ['organization', 'work', 'accessory'], price: 39, description: 'Portable label maker.', rating: 4.2 },
  { name: 'Desk Calendar', category: 'Office', tags: ['planning', 'organization', 'work'], price: 15, description: 'Monthly desk calendar.', rating: 4.3 },
  { name: 'Footrest', category: 'Office', tags: ['ergonomic', 'comfort', 'work'], price: 45, description: 'Adjustable ergonomic footrest.', rating: 4.4 },
  { name: 'Monitor Light Bar', category: 'Office', tags: ['lighting', 'work', 'accessory'], price: 89, description: 'Screen-mounted light bar.', rating: 4.6 },
  { name: 'Printer', category: 'Office', tags: ['work', 'printing', 'wireless'], price: 199, description: 'All-in-one wireless printer.', rating: 4.4 },
  { name: 'Desk Phone Stand', category: 'Office', tags: ['accessory', 'organization', 'work'], price: 22, description: 'Adjustable phone stand.', rating: 4.3 },
  { name: 'Noise Machine', category: 'Office', tags: ['focus', 'work', 'wellness'], price: 49, description: 'White noise machine for focus.', rating: 4.5 },
  { name: 'Desk Fan', category: 'Office', tags: ['comfort', 'work', 'accessory'], price: 35, description: 'Quiet USB desk fan.', rating: 4.2 },
  { name: 'Document Scanner', category: 'Office', tags: ['work', 'scanning', 'portable'], price: 149, description: 'Portable document scanner.', rating: 4.5 },
  { name: 'Desk Drawer', category: 'Office', tags: ['storage', 'organization', 'accessory'], price: 59, description: 'Under-desk storage drawer.', rating: 4.3 },
  { name: 'Ergonomic Keyboard', category: 'Office', tags: ['ergonomic', 'work', 'accessory'], price: 99, description: 'Split ergonomic keyboard.', rating: 4.6 },
  
  // Kitchen (25 products)
  { name: 'Coffee Maker', category: 'Kitchen', tags: ['appliance', 'coffee', 'morning'], price: 89, description: 'Programmable coffee maker.', rating: 4.5 },
  { name: 'Blender', category: 'Kitchen', tags: ['appliance', 'smoothie', 'healthy'], price: 69, description: 'High-speed blender for smoothies.', rating: 4.4 },
  { name: 'Air Fryer', category: 'Kitchen', tags: ['appliance', 'cooking', 'healthy'], price: 129, description: 'Healthy air fryer for crispy food.', rating: 4.6 },
  { name: 'Toaster Oven', category: 'Kitchen', tags: ['appliance', 'cooking', 'baking'], price: 79, description: 'Convection toaster oven.', rating: 4.4 },
  { name: 'Rice Cooker', category: 'Kitchen', tags: ['appliance', 'cooking', 'rice'], price: 59, description: 'Automatic rice cooker.', rating: 4.5 },
  { name: 'Knife Set', category: 'Kitchen', tags: ['cooking', 'cutlery', 'essential'], price: 99, description: 'Professional knife set.', rating: 4.6 },
  { name: 'Cutting Board Set', category: 'Kitchen', tags: ['cooking', 'accessory', 'essential'], price: 35, description: 'Bamboo cutting board set.', rating: 4.4 },
  { name: 'Food Processor', category: 'Kitchen', tags: ['appliance', 'cooking', 'prep'], price: 149, description: 'Multi-function food processor.', rating: 4.5 },
  { name: 'Slow Cooker', category: 'Kitchen', tags: ['appliance', 'cooking', 'convenient'], price: 69, description: 'Programmable slow cooker.', rating: 4.6 },
  { name: 'Electric Kettle', category: 'Kitchen', tags: ['appliance', 'tea', 'coffee'], price: 45, description: 'Fast-boil electric kettle.', rating: 4.4 },
  { name: 'Stand Mixer', category: 'Kitchen', tags: ['appliance', 'baking', 'cooking'], price: 299, description: 'Professional stand mixer.', rating: 4.7 },
  { name: 'Espresso Machine', category: 'Kitchen', tags: ['appliance', 'coffee', 'premium'], price: 399, description: 'Barista-quality espresso machine.', rating: 4.8 },
  { name: 'Cookware Set', category: 'Kitchen', tags: ['cooking', 'pots', 'essential'], price: 179, description: 'Non-stick cookware set.', rating: 4.5 },
  { name: 'Instant Pot', category: 'Kitchen', tags: ['appliance', 'cooking', 'multi-function'], price: 119, description: 'Multi-use pressure cooker.', rating: 4.7 },
  { name: 'Kitchen Scale', category: 'Kitchen', tags: ['baking', 'accessory', 'precision'], price: 25, description: 'Digital kitchen scale.', rating: 4.3 },
  { name: 'Spice Rack', category: 'Kitchen', tags: ['organization', 'storage', 'accessory'], price: 39, description: 'Rotating spice rack.', rating: 4.4 },
  { name: 'Dish Rack', category: 'Kitchen', tags: ['organization', 'storage', 'accessory'], price: 29, description: 'Stainless steel dish rack.', rating: 4.3 },
  { name: 'Mixing Bowls Set', category: 'Kitchen', tags: ['cooking', 'baking', 'essential'], price: 35, description: 'Stainless steel mixing bowls.', rating: 4.5 },
  { name: 'Can Opener', category: 'Kitchen', tags: ['accessory', 'essential', 'tool'], price: 18, description: 'Electric can opener.', rating: 4.2 },
  { name: 'Measuring Cups', category: 'Kitchen', tags: ['baking', 'cooking', 'essential'], price: 15, description: 'Stainless steel measuring cups.', rating: 4.4 },
  { name: 'Colander', category: 'Kitchen', tags: ['cooking', 'accessory', 'essential'], price: 22, description: 'Large stainless steel colander.', rating: 4.3 },
  { name: 'Waffle Maker', category: 'Kitchen', tags: ['appliance', 'breakfast', 'cooking'], price: 49, description: 'Belgian waffle maker.', rating: 4.5 },
  { name: 'Hand Mixer', category: 'Kitchen', tags: ['appliance', 'baking', 'cooking'], price: 39, description: 'Electric hand mixer.', rating: 4.4 },
  { name: 'Vacuum Sealer', category: 'Kitchen', tags: ['appliance', 'storage', 'preservation'], price: 89, description: 'Food vacuum sealer.', rating: 4.5 },
  { name: 'Bread Maker', category: 'Kitchen', tags: ['appliance', 'baking', 'bread'], price: 159, description: 'Automatic bread maker.', rating: 4.6 },
];

const users = [
  { userId: 'user1', name: 'Alex (Gamer)', persona: 'Hardcore PC Gamer' },
  { userId: 'user2', name: 'Sarah (Athlete)', persona: 'Fitness Enthusiast' },
  { userId: 'user3', name: 'Mike (Remote Worker)', persona: 'Home Office Professional' },
  { userId: 'user4', name: 'Emma (Foodie)', persona: 'Cooking Enthusiast' }
];

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  await Product.deleteMany({});
  await Behavior.deleteMany({});
  await User.deleteMany({});

  const createdProducts = await Product.insertMany(products);
  const createdUsers = await User.insertMany(users);

  console.log('Products and Users seeded.');

  // Create realistic behaviors
  const findProduct = (name) => createdProducts.find(p => p.name === name);

  // Alex (Gamer) - Views and buys gaming gear
  await Behavior.create([
    { userId: 'user1', productId: findProduct('Gaming Laptop')._id, action: 'VIEW' },
    { userId: 'user1', productId: findProduct('Mechanical Keyboard')._id, action: 'VIEW' },
    { userId: 'user1', productId: findProduct('Gaming Laptop')._id, action: 'BUY' },
    { userId: 'user1', productId: findProduct('4K Monitor')._id, action: 'VIEW' },
    { userId: 'user1', productId: findProduct('Wireless Mouse')._id, action: 'CART' },
  ]);

  // Sarah (Athlete) - Fitness products
  await Behavior.create([
    { userId: 'user2', productId: findProduct('Yoga Mat')._id, action: 'VIEW' },
    { userId: 'user2', productId: findProduct('Running Shoes')._id, action: 'BUY' },
    { userId: 'user2', productId: findProduct('Dumbbells Set')._id, action: 'VIEW' },
    { userId: 'user2', productId: findProduct('Protein Powder')._id, action: 'BUY' },
    { userId: 'user2', productId: findProduct('Smart Watch')._id, action: 'VIEW' },
  ]);

  // Mike (Remote Worker) - Office setup
  await Behavior.create([
    { userId: 'user3', productId: findProduct('Ergonomic Chair')._id, action: 'VIEW' },
    { userId: 'user3', productId: findProduct('Standing Desk')._id, action: 'VIEW' },
    { userId: 'user3', productId: findProduct('Laptop Stand')._id, action: 'BUY' },
    { userId: 'user3', productId: findProduct('Desk Lamp')._id, action: 'CART' },
    { userId: 'user3', productId: findProduct('USB-C Hub')._id, action: 'VIEW' },
  ]);

  // Emma (Foodie) - Kitchen appliances
  await Behavior.create([
    { userId: 'user4', productId: findProduct('Coffee Maker')._id, action: 'BUY' },
    { userId: 'user4', productId: findProduct('Blender')._id, action: 'VIEW' },
    { userId: 'user4', productId: findProduct('Air Fryer')._id, action: 'VIEW' },
  ]);

  console.log('Behaviors seeded.');
  process.exit();
};

seed();

