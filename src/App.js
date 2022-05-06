import {Routes, Route } from "react-router-dom";
import React from "react";
import {Home} from "./pages/Home";
import 'normalize.css';
import {theme} from "./theme";
import {ThemeProvider} from "styled-components";
import {ThankYou} from "./pages/ThankYou";

function App() {
  return (
      <ThemeProvider theme={theme}>
          <div className="App">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/thankyou" element={<ThankYou />} />
              </Routes>
          </div>
      </ThemeProvider>
  );
}

export default App;
