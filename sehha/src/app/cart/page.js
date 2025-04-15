// sehha/src/app/cart/page.js
import CartClient from '../components/CartClient';

async function fetchCart(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/cart?userId=${userId}`, {
      cache: 'no-store', // Ensure fresh data
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching cart on server:', error);
    return { items: [], totalAmount: 0 };
  }
}

export default async function CartPage() {
  const userId = 'guest'; // Replace with real user ID if using authentication
  const initialCart = await fetchCart(userId);

  return <CartClient initialCart={initialCart} userId={userId} />;
}