import { useState, useEffect } from 'react';
import { mockProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Try local API first, fall back to mock data
        const res = await fetch('http://localhost:4000/products');
        const data = await res.json();
        setProducts(data);
      } catch {
        // Use mock data as fallback
        await new Promise(r => setTimeout(r, 600));
        setProducts(mockProducts.products);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, error };
}
