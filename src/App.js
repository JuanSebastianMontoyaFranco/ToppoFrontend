import React, { useContext } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './pages/HomePage';
import { CartProvider } from './context/CartContext';  // Importar el CartProvider

import { Context, Provider } from './context/Context';

function App() {
  const [auth, saveAuth] = useContext(Context);

  return (
    <BrowserRouter>
      <Provider value={[auth, saveAuth]}>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </Provider>

    </BrowserRouter>
  );
}

export default App;