import React from 'react';
import styles from './SearchFilterBar.module.css';

const CATEGORIES = ['All', 'Shoes', 'Clothing', 'Accessories'];

export default function SearchFilterBar({ search, onSearchChange, category, onCategoryChange, totalResults }) {
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <div className={styles.searchWrap}>
          <SearchIcon />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search products..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            aria-label="Search products by title"
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => onSearchChange('')} aria-label="Clear search">
              <ClearIcon />
            </button>
          )}
        </div>

        <select
          className={styles.select}
          value={category}
          onChange={e => onCategoryChange(e.target.value)}
          aria-label="Filter by category"
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <span className={styles.count}>
        {totalResults} {totalResults === 1 ? 'product' : 'products'}
      </span>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
