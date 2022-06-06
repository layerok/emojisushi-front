import {Routes, Route } from "react-router-dom";
import React from "react";
import {Home} from "./pages/Home";
import 'normalize.css';
import {theme} from "./theme";
import {ThemeProvider} from "styled-components";
import {ThankYou} from "./pages/ThankYou";
import {Delivery} from "./pages/Delivery"
import {Checkout} from "./pages/Checkout";
import {Category} from "./pages/Category";

function App() {
  return (
      <ThemeProvider theme={theme}>
          <div className="App">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/category/:categorySlug" element={<Category />} />
                  <Route path="/thankyou" element={<ThankYou />} />
                  <Route path="/dostavka-i-oplata" element={<Delivery />} />
                  <Route path="/checkout" element={<Checkout />} />
              </Routes>
          </div>
      </ThemeProvider>
  );
}

export default App;
