import React from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import styles from './Header.module.css';

export default function Header({ onCartClick }) {
  const { totalItems } = useCart();
  const { isDark, toggle } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◆</span>
          <span className={styles.logoText}>NOVA<em>SHOP</em></span>
        </div>

        <nav className={styles.nav}>
          <span className={styles.navLink}>Collections</span>
          <span className={styles.navLink}>Brands</span>
          <span className={styles.navLink}>Sale</span>
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.themeBtn}
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button className={styles.cartBtn} onClick={onCartClick} aria-label={`Cart, ${totalItems} items`}>
            <CartIcon />
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
}
function MoonIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
}
function SunIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
}
