/**
 * ShoppingCart Component
 * 
 * A shopping cart that demonstrates:
 * - useReducer for complex state management
 * - useMemo for optimized price calculations
 * - Component composition patterns
 * - Immutable state updates with actions
 * - Amazon-style layout with product grid and cart sidebar
 */

import { useReducer, useState, useMemo } from 'react';

/**
 * Default sample products for demonstration
 * Images from picsum.photos for realistic product appearance
 */
const defaultProducts = [
  { 
    id: 1, 
    name: 'React T-Shirt', 
    price: 29.99, 
    image: 'https://picsum.photos/seed/react-tshirt/200/200',
    rating: 4.5,
    reviews: 128
  },
  { 
    id: 2, 
    name: 'JavaScript Hoodie', 
    price: 49.99,
    image: 'https://picsum.photos/seed/js-hoodie/200/200',
    rating: 4.8,
    reviews: 256
  },
  { 
    id: 3, 
    name: 'TypeScript Cap', 
    price: 19.99,
    image: 'https://picsum.photos/seed/ts-cap/200/200',
    rating: 4.2,
    reviews: 89
  },
  { 
    id: 4, 
    name: 'Node.js Mug', 
    price: 14.99,
    image: 'https://picsum.photos/seed/node-mug/200/200',
    rating: 4.6,
    reviews: 342
  },
  { 
    id: 5, 
    name: 'CSS Stickers Pack', 
    price: 9.99,
    image: 'https://picsum.photos/seed/css-stickers/200/200',
    rating: 4.3,
    reviews: 67
  },
  { 
    id: 6, 
    name: 'Vue.js Backpack', 
    price: 59.99,
    image: 'https://picsum.photos/seed/vue-backpack/200/200',
    rating: 4.7,
    reviews: 198
  },
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
 * Amazon-style layout: Products grid on left, Cart sidebar on right
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
   * Update item quantity
   */
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
    } else {
      dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
    }
  };

  /**
   * Clear entire cart
   */
  const handleClearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Products Section - Left Side */}
      <div className="flex-1">
        <div className="bg-bg-primary rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              <h2 className="text-xl font-semibold text-text-primary">Shop Products</h2>
            </div>
            <span className="text-sm text-text-muted">{items.length} items</span>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map((item) => (
              <ProductCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </div>

      {/* Cart Section - Right Sidebar */}
      <div className="lg:w-80 xl:w-96 lg:sticky lg:top-4 lg:self-start">
        <Cart
          cartItems={cartItems}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onClear={handleClearCart}
        />
      </div>
    </div>
  );
};

/**
 * Star Rating Component
 * Displays star rating with review count
 */
const StarRating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? 'text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-text-muted">({reviews})</span>
    </div>
  );
};

/**
 * ProductCard Component
 * Amazon-style product card with image, rating, and add to cart
 */
const ProductCard = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <div className="bg-bg-secondary rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all duration-200 overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-medium text-text-primary text-sm mb-1 line-clamp-2 min-h-[2.5rem]">
          {item.name}
        </h3>
        
        {/* Rating */}
        {item.rating && (
          <StarRating rating={item.rating} reviews={item.reviews} />
        )}

        {/* Price */}
        <div className="mt-2 mb-3">
          <span className="text-lg font-bold text-text-primary">${item.price.toFixed(2)}</span>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label htmlFor={`qty-${item.id}`} className="text-xs text-text-muted">
              Qty:
            </label>
            <select
              id={`qty-${item.id}`}
              value={quantity}
              onChange={handleQuantityChange}
              className="flex-1 px-2 py-1.5 bg-bg-primary border border-border rounded text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAdd}
            className="w-full px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover active:scale-[0.98] transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Cart Component
 * Amazon-style cart sidebar with items, totals, and checkout
 */
const Cart = ({ cartItems, onRemove, onUpdateQuantity, onClear }) => {
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
    <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
      {/* Cart Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h2 className="text-lg font-semibold text-text-primary">Shopping Cart</h2>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-danger hover:text-danger-hover transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Cart Content */}
      <div className="p-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-5xl mb-3 block">🛒</span>
            <p className="text-text-muted font-medium">Your cart is empty</p>
            <p className="text-sm text-text-muted mt-1">Add items to get started</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onRemove={onRemove}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>

            {/* Subtotal */}
            <div className="border-t border-border mt-4 pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-text-muted">
                  Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):
                </span>
                <span className="text-xl font-bold text-text-primary">${totalPrice.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full py-3 bg-success text-white font-medium rounded-lg hover:bg-success-hover active:scale-[0.98] transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * CartItem Component
 * Compact cart item with image, quantity selector, and remove
 */
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex gap-3 p-3 bg-bg-secondary rounded-lg border border-border">
      {/* Item Image */}
      <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-text-primary text-sm truncate">{item.name}</p>
        <p className="text-xs text-text-muted">${item.price.toFixed(2)} each</p>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-border rounded overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 text-text-muted hover:bg-bg-primary transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm text-text-primary bg-bg-primary min-w-[2.5rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 text-text-muted hover:bg-bg-primary transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          <button
            onClick={() => onRemove(item.id)}
            className="text-xs text-danger hover:text-danger-hover transition-colors"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <span className="font-semibold text-text-primary">${itemTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ShoppingCart;
