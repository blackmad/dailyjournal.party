import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useState } from "@hookstate/core";

import { Book } from "./Book";

import OpenGraph from "./OpenGraph";
import Intro from "./Intro";
import DebugPreview from "./DebugPreview";
import { themeConfig } from "./state/themeConfig";

const GlobalFontStyle = createGlobalStyle`
  body { 
    font-family: ${(props) => props.theme.fontFamily}
  }
`;

export default function App() {
  const themeConfigState = useState(themeConfig);
  const theme = themeConfigState.get();

  return (
    <ThemeProvider theme={theme}>
      <GlobalFontStyle />
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
