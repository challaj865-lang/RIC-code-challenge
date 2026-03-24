import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.visible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <CartIcon />
            <h2 className={styles.title}>Your Cart</h2>
            <span className={styles.badge}>{items.reduce((s, i) => s + i.quantity, 0)}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <EmptyBagIcon />
              <p>Your cart is empty</p>
              <span>Add some products to get started</span>
            </div>
          ) : (
            <ul className={styles.list}>
              {items.map(item => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemImg}>
                    <img src={item.imageUrl} alt={item.title} onError={e => { e.target.style.display = 'none'; }} />
                  </div>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                    <div className={styles.itemControls}>
                      <div className={styles.stepper}>
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Decrease">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Increase">+</button>
                      </div>
                      <button className={styles.removeBtn} onClick={() => removeItem(item.id)} aria-label="Remove item">
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total</span>
              <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutBtn}>
              Proceed to Checkout
            </button>
            <button className={styles.clearBtn} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function CartIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
}
function CloseIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
}
function EmptyBagIcon() {
  return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
}
