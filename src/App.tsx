import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Book } from "./Book";
import { theme } from "./theme";

import OpenGraph from "./OpenGraph";
import Intro from "./Intro";
import DebugPreview from "./DebugPreview";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="preview" element={<DebugPreview />}>
            <Route path=":page" element={<DebugPreview />} />
          </Route>

          <Route path="/make" element={<Book />} />
          <Route path="opengraph" element={<OpenGraph />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
