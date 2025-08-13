import { Book } from "@/types";
import { useCart } from "./CartContext";
import { formatVND } from "@/utils/money";

type Props = {
  book: Book;
  quantity: number;
};

export default function CartItem({ book, quantity }: Props) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex gap-4 items-center py-3 border-b">
        <img src={book.images[0].base_url} alt={book.name} className="w-20 h-28 object-cover rounded" />
        <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{book.name}</h3>
            <p className="text-sm text-gray-500"> {book.authors?.map((a) => a.name).join(", ") }</p>
            <div className="mt-2 flex items-center gap-2">
            <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => updateQuantity(book.id, parseInt(e.target.value))}
                className="w-16 border rounded px-2 py-1"
            />
            <button
                onClick={() => removeFromCart(book.id)}
                className="text-red-500 hover:underline text-sm"
            >
                Xoá
            </button>
            </div>
        </div>
        <div className="font-semibold text-rose-600">{formatVND(book.price * quantity)}</div>
        </div>
    );
}
