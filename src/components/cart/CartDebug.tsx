import { useCart } from './CartContext';
import { authStore } from '@/store/authStore';

export default function CartDebug() {
  const { items, count, total, loading, error } = useCart();
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const token = authStore((state) => state.token);

  return (
    <div className="fixed top-4 right-4 bg-white p-4 border rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">Cart Debug Info</h3>
      <div className="text-xs space-y-1">
        <div>
          <strong>Auth:</strong> {isAuthenticated ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : 'No'}
        </div>
        <div>
          <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Error:</strong> {error || 'None'}
        </div>
        <div>
          <strong>Items:</strong> {items.length}
        </div>
        <div>
          <strong>Count:</strong> {count}
        </div>
        <div>
          <strong>Total:</strong> {total}
        </div>
      </div>

      {items.length > 0 && (
        <div className="mt-2">
          <strong>Cart Items:</strong>
          {items.map((item, index) => (
            <div key={index} className="text-xs">
              {item.book.title || item.book.name} x{item.quantity}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
