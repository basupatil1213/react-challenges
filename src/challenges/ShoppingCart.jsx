/**
 * ShoppingCart Component
 * 
 * A shopping cart that demonstrates:
 * - useReducer for complex state management
 * - useMemo for optimized price calculations
 * - Component composition patterns
 * - Immutable state updates with actions
 */

import { useReducer, useState, useMemo } from 'react';

/**
 * Default sample products for demonstration
 */
const defaultProducts = [
  { id: 1, name: 'React T-Shirt', price: 29.99 },
  { id: 2, name: 'JavaScript Hoodie', price: 49.99 },
  { id: 3, name: 'TypeScript Cap', price: 19.99 },
  { id: 4, name: 'Node.js Mug', price: 14.99 },
  { id: 5, name: 'CSS Stickers Pack', price: 9.99 },
];

/**
 * Cart action types
 */
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

/**
 * Cart reducer for managing cart state
 * @param {Array} state - Current cart items
 * @param {Object} action - Action object with type and payload
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { item, quantity } = action.payload;
      const existing = state.find((i) => i.id === item.id);

      if (existing) {
        return state.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }

      return [...state, { ...item, quantity }];
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return state.filter((i) => i.id !== action.payload);

    case CART_ACTIONS.UPDATE_QUANTITY:
      return state.map((i) =>
        i.id === action.payload.id
          ? { ...i, quantity: action.payload.quantity }
          : i
      );

    case CART_ACTIONS.CLEAR_CART:
      return [];

    default:
      return state;
  }
};

/**
 * Main ShoppingCart Component
 */
const ShoppingCart = ({ items = defaultProducts }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  /**
   * Add item to cart
   */
  const handleAddToCart = (item, quantity) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { item, quantity } });
  };

  /**
   * Remove item from cart
   */
  const handleRemoveFromCart = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id });
  };

  /**
   * Clear entire cart
   */
  const handleClearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  return (
    <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
      {/* Products Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🛍️</span>
          <h2 className="text-lg font-semibold text-text-primary">Products</h2>
        </div>
        <div className="grid gap-3">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <Cart
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
      />
    </div>
  );
};

/**
 * ProductCard Component
 * Displays a single product with quantity input and add to cart button
 */
const ProductCard = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  /**
   * Handle quantity change with validation
   */
  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(99, Number(e.target.value)));
    setQuantity(value);
  };

  /**
   * Handle add to cart and reset quantity
   */
  const handleAdd = () => {
    onAddToCart(item, quantity);
    setQuantity(1);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg border border-border hover:border-primary transition-colors">
      <div className="flex-1">
        <p className="font-medium text-text-primary">{item.name}</p>
        <p className="text-sm text-success font-semibold">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor={`qty-${item.id}`} className="text-xs text-text-muted">
            Qty:
          </label>
          <input
            id={`qty-${item.id}`}
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 px-2 py-1 bg-bg-primary border border-border rounded text-text-primary text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

/**
 * Cart Component
 * Displays cart items with totals and remove functionality
 */
const Cart = ({ cartItems, onRemove, onClear }) => {
  /**
   * Memoized total price calculation
   */
  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  /**
   * Memoized total items count
   */
  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <h2 className="text-lg font-semibold text-text-primary">
            Cart ({totalItems} items)
          </h2>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-danger hover:text-danger-hover transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <span className="text-4xl mb-2 block">🛒</span>
          <p className="text-text-muted">Your cart is empty</p>
          <p className="text-sm text-text-muted mt-1">Add some products to get started</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} onRemove={onRemove} />
            ))}
          </div>

          {/* Cart Total */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span className="text-text-primary">Total:</span>
              <span className="text-success">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/**
 * CartItem Component
 * Displays a single cart item with quantity and remove button
 */
const CartItem = ({ item, onRemove }) => {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg border border-border">
      <div className="flex-1">
        <p className="font-medium text-text-primary">{item.name}</p>
        <p className="text-sm text-text-muted">
          ${item.price.toFixed(2)} × {item.quantity}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-semibold text-text-primary">${itemTotal.toFixed(2)}</span>
        <button
          onClick={() => onRemove(item.id)}
          className="p-1 text-danger hover:bg-danger-light rounded transition-colors"
          aria-label={`Remove ${item.name} from cart`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
