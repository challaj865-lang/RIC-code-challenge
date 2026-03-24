import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import ProductListingPage from './pages/ProductListingPage';
import './styles/global.css';

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Header onCartClick={() => setCartOpen(true)} />
      <ProductListingPage />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}
