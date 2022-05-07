import {Routes, Route } from "react-router-dom";
import React from "react";
import {Home} from "./pages/Home";
import 'normalize.css';
import {theme} from "./theme";
import {ThemeProvider} from "styled-components";
import {ThankYou} from "./pages/ThankYou";
import {Delivery} from "./pages/Delivery"

function App() {
  return (
      <ThemeProvider theme={theme}>
          <div className="App">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/thankyou" element={<ThankYou />} />
                  <Route path="/dostavka-i-oplata" element={<Delivery />} />
              </Routes>
          </div>
      </ThemeProvider>
  );
}

export default App;
