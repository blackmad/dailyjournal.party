import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Book } from "./Book";
import { theme } from "./theme";

import OpenGraph from "./OpenGraph";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Book />} />
          <Route path="opengraph" element={<OpenGraph />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
