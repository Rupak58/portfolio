export const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop"
    ],
    category: "clothing",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    description: "Premium cotton t-shirt with a perfect fit for everyday wear.",
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    featured: true
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    category: "clothing",
    sizes: ["28", "30", "32", "34"],
    colors: ["Blue", "Black"],
    description: "Comfortable slim fit jeans made from premium denim.",
    inStock: true,
    rating: 4.3,
    reviewCount: 89,
    featured: false
  },
  {
    id: 3,
    name: "Leather Sneakers",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
    category: "shoes",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White", "Black"],
    description: "Modern leather sneakers with comfortable cushioning.",
    inStock: true,
    rating: 4.7,
    reviewCount: 256,
    featured: true
  },
  {
    id: 4,
    name: "Winter Jacket",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    category: "clothing",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Green"],
    description: "Warm and stylish winter jacket for cold weather.",
    inStock: false,
    rating: 4.6,
    reviewCount: 167,
    featured: true
  },
  {
    id: 5,
    name: "Casual Summer Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop",
    category: "clothing",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Yellow", "Blue", "Pink"],
    description: "Light and comfortable dress perfect for summer days.",
    inStock: true,
    rating: 4.4,
    reviewCount: 203,
    featured: false
  },
  {
    id: 6,
    name: "Sports Running Shoes",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "shoes",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Red", "Blue", "Black"],
    description: "High-performance running shoes with extra cushioning.",
    inStock: true,
    rating: 4.2,
    reviewCount: 142,
    featured: false
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'shoes', name: 'Shoes' },
  { id: 'accessories', name: 'Accessories' }
];