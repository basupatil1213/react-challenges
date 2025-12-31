/**
 * ProductFilters Component
 * 
 * A product filtering system that demonstrates:
 * - useReducer for complex filter state management
 * - Debounced search with custom useDebounce hook
 * - Multiple filter types (search, category, stock status)
 * - Memoized filtered results for performance
 * - Clean UI with responsive product grid
 */

import { useReducer, useMemo } from "react";
import { useDebounce } from "../hooks/use-debounce";

/**
 * Sample products data for demonstration
 */
const PRODUCTS = [
  { id: 1, name: "iPhone 14", category: "mobile", price: 999, inStock: true, emoji: "📱", rating: 4.5 },
  { id: 2, name: "Galaxy S23", category: "mobile", price: 899, inStock: false, emoji: "📱", rating: 4.3 },
  { id: 3, name: "MacBook Pro", category: "laptop", price: 1999, inStock: true, emoji: "💻", rating: 4.8 },
  { id: 4, name: "Dell XPS 13", category: "laptop", price: 1499, inStock: true, emoji: "💻", rating: 4.4 },
  { id: 5, name: "Apple Watch", category: "watches", price: 399, inStock: false, emoji: "⌚", rating: 4.6 },
  { id: 6, name: "Fossil Gen 6", category: "watches", price: 299, inStock: true, emoji: "⌚", rating: 4.1 },
  { id: 7, name: "Nike Air Max", category: "shoes", price: 120, inStock: true, emoji: "👟", rating: 4.7 },
  { id: 8, name: "Adidas Ultraboost", category: "shoes", price: 180, inStock: false, emoji: "👟", rating: 4.5 }
];

/**
 * Category options with display labels
 */
const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "mobile", label: "Mobile" },
  { value: "laptop", label: "Laptop" },
  { value: "watches", label: "Watches" },
  { value: "shoes", label: "Shoes" }
];

/**
 * Filter action types
 */
const FILTER_ACTIONS = {
  SET_SEARCH: "SET_SEARCH",
  SET_CATEGORY: "SET_CATEGORY",
  TOGGLE_IN_STOCK: "TOGGLE_IN_STOCK",
  CLEAR_FILTERS: "CLEAR_FILTERS"
};

/**
 * Initial filter state
 */
const initialState = {
  searchText: "",
  category: "all",
  inStockOnly: false
};

/**
 * Filter reducer for managing filter state
 * @param {Object} state - Current filter state
 * @param {Object} action - Action object with type and payload
 */
function reducer(state, action) {
  switch (action.type) {
    case FILTER_ACTIONS.SET_SEARCH:
      return { ...state, searchText: action.value };
    case FILTER_ACTIONS.SET_CATEGORY:
      return { ...state, category: action.value };
    case FILTER_ACTIONS.TOGGLE_IN_STOCK:
      return { ...state, inStockOnly: !state.inStockOnly };
    case FILTER_ACTIONS.CLEAR_FILTERS:
      return initialState;
    default:
      return state;
  }
}

/**
 * Main ProductFilters Component
 */
export default function ProductFilters() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Debounce search input for better performance
  const debouncedSearch = useDebounce(state.searchText, 300);

  /**
   * Memoized filtered products
   * Only recalculates when filters change
   */
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search filter
      const matchesSearch = product.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      // Category filter
      const matchesCategory =
        state.category === "all" || product.category === state.category;

      // Stock filter
      const matchesStock = !state.inStockOnly || product.inStock;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [debouncedSearch, state.category, state.inStockOnly]);

  /**
   * Stats for display
   */
  const stats = useMemo(() => ({
    showing: filteredProducts.length,
    total: PRODUCTS.length,
    inStock: PRODUCTS.filter(p => p.inStock).length
  }), [filteredProducts.length]);

  /**
   * Handles clearing all filters
   */
  const handleClearFilters = () => {
    dispatch({ type: FILTER_ACTIONS.CLEAR_FILTERS });
  };

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = state.searchText || state.category !== "all" || state.inStockOnly;

  return (
    <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
      {/* Header with stats */}
      <div className="bg-bg-secondary px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-text-primary">Product Catalog</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-text-muted">
              Showing: <span className="font-medium text-text-primary">{stats.showing}</span>
            </span>
            <span className="text-text-muted">
              Total: <span className="font-medium text-text-primary">{stats.total}</span>
            </span>
            <span className="text-text-muted">
              In Stock: <span className="font-medium text-success">{stats.inStock}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter controls */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search input */}
          <div className="flex-1 relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={state.searchText}
              onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET_SEARCH, value: e.target.value })}
              placeholder="Search products..."
              className="w-full pl-12 pr-12 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
            {state.searchText && (
              <button
                onClick={() => dispatch({ type: FILTER_ACTIONS.SET_SEARCH, value: "" })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category select */}
          <select
            value={state.category}
            onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET_CATEGORY, value: e.target.value })}
            className="px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* In stock toggle */}
          <button
            onClick={() => dispatch({ type: FILTER_ACTIONS.TOGGLE_IN_STOCK })}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
              state.inStockOnly
                ? "bg-success text-white"
                : "bg-bg-secondary border border-border text-text-secondary hover:bg-bg-tertiary"
            }`}
          >
            {state.inStockOnly ? "✓ In Stock Only" : "In Stock Only"}
          </button>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-4 py-3 text-danger hover:bg-danger-light rounded-lg font-medium transition-all duration-200 whitespace-nowrap"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-sm text-text-muted">Active filters:</span>
            {state.searchText && (
              <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm">
                Search: "{state.searchText}"
              </span>
            )}
            {state.category !== "all" && (
              <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm capitalize">
                {state.category}
              </span>
            )}
            {state.inStockOnly && (
              <span className="px-3 py-1 bg-success-light text-success rounded-full text-sm">
                In Stock
              </span>
            )}
          </div>
        )}
      </div>

      {/* Products grid */}
      <div className="p-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} searchQuery={state.searchText} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-text-primary font-medium mb-2">No products found</p>
            <p className="text-text-muted text-sm">
              Try adjusting your filters or{" "}
              <button onClick={handleClearFilters} className="text-primary hover:underline">
                clear all filters
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ProductCard Component
 * 
 * Displays individual product information in a card format.
 */
function ProductCard({ product, searchQuery }) {
  /**
   * Highlights matching text in the product name
   */
  const highlightMatch = (text) => {
    if (!searchQuery.trim()) return text;

    const regex = new RegExp(`(${searchQuery.trim()})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-primary-light text-primary rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  /**
   * Render star rating
   */
  const renderRating = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < Math.floor(rating) ? "text-warning" : "text-text-muted"}`}>
            ★
          </span>
        ))}
        <span className="text-xs text-text-muted ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="bg-bg-secondary rounded-lg p-4 hover:bg-bg-tertiary transition-all duration-200 border border-border hover:border-primary">
      {/* Product emoji */}
      <span className="text-4xl block text-center mb-3">{product.emoji}</span>

      {/* Product name */}
      <p className="font-medium text-text-primary text-center mb-2">
        {highlightMatch(product.name)}
      </p>

      {/* Rating */}
      <div className="flex justify-center mb-3">
        {renderRating(product.rating)}
      </div>

      {/* Product details */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-muted capitalize">{product.category}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            product.inStock
              ? "bg-success-light text-success"
              : "bg-danger-light text-danger"
          }`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-primary text-center">
          ${product.price.toLocaleString()}
        </p>
      </div>

      {/* Add to cart button */}
      <button
        disabled={!product.inStock}
        className={`w-full mt-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          product.inStock
            ? "bg-primary text-white hover:bg-primary-hover"
            : "bg-bg-tertiary text-text-muted cursor-not-allowed"
        }`}
      >
        {product.inStock ? "Add to Cart" : "Unavailable"}
      </button>
    </div>
  );
}
