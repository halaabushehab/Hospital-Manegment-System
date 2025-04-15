// src/app/api/seed/route.js
import connectMongoDB from "../../../../../JS/config"; // Fixed path
import AnimalProduct from "../../../../../JS/models/AnimalProduct"; // Fixed path

export async function GET() {
  await connectMongoDB();
  try {
    await AnimalProduct.deleteMany();
    await AnimalProduct.insertMany([
      {
        name: "Flea Treatment for Dogs",
        description: "Effective flea treatment for dogs, lasts up to 3 months.",
        price: 29.99,
        category: "Dog Care",
        image: "https://example.com/flea-treatment.jpg",
        stock: 50,
      },
      {
        name: "Worming Tablets for Cats",
        description: "Worming tablets for cats, suitable for all breeds.",
        price: 15.99,
        category: "Cat Care",
        image: "https://example.com/worming-tablets.jpg",
        stock: 30,
      },
    ]);
    return new Response(JSON.stringify({ message: "Sample data added" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error seeding data" }), { status: 500 });
  }
}