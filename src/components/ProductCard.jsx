import React, { useState } from 'react';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ title, price, imageUrl, rating, onAddToCart, size = 'normal', id, category, brand, stock }) {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const { items } = useCart();
  const cartQty = items.find(i => i.id === id)?.quantity || 0;

  const handleAdd = () => {
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className={`${styles.card} ${size === 'large' ? styles.large : ''}`}>
      <div className={styles.imageWrap}>
        {imgError ? (
          <div className={styles.imgFallback}>
            <span>{title[0]}</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={title}
            className={styles.image}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
        <span className={styles.categoryBadge}>{category}</span>
        {stock <= 20 && <span className={styles.stockBadge}>Only {stock} left</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.brand}>{brand}</span>
          <StarRating rating={rating} />
        </div>

        <h3 className={styles.title}>{title}</h3>

        <div className={styles.footer}>
          <span className={styles.price}>${price.toFixed(2)}</span>
          <button
            className={`${styles.addBtn} ${added ? styles.added : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${title} to cart`}
          >
            {added ? (
              <><CheckIcon /> Added{cartQty > 0 ? ` (${cartQty + 1})` : ''}</>
            ) : (
              <><CartIcon /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

function CartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
