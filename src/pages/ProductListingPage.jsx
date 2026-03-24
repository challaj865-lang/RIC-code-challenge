import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SearchFilterBar from '../components/SearchFilterBar';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import styles from './ProductListingPage.module.css';

export default function ProductListingPage() {
  const { products, loading } = useProducts();
  const { addItem } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || p.category === category;
      return matchSearch && matchCat;
    });
  }, [products, search, category]);

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.heroEyebrow}>New Season Arrivals</p>
        <h1 className={styles.heroTitle}>Curated for<br /><em>Your Style</em></h1>
        <p className={styles.heroSub}>Premium products, thoughtfully selected</p>
      </div>

      <div className={styles.container}>
        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          totalResults={filtered.length}
        />

        {loading ? (
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={styles.skeleton} style={{ animationDelay: `${i * 0.07}s` }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <p>No products found</p>
            <span>Try adjusting your search or filter</span>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((product, idx) => (
              <div key={product.id} style={{ animationDelay: `${idx * 0.06}s` }}>
                <ProductCard
                  {...product}
                  onAddToCart={() => addItem(product)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
