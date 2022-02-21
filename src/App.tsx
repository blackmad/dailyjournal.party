import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useState } from "@hookstate/core";

import Make from "./pages/Make";
import OpenGraph from "./pages/OpenGraph";
import Intro from "./pages/Intro";
import DebugPreview from "./pages/DebugPreview";

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

          <Route path="debug">
            <Route path="preview" element={<DebugPreview />}>
              <Route path=":page" element={<DebugPreview />} />
            </Route>
          </Route>

          <Route path="/make" element={<Make />} />
          <Route path="opengraph" element={<OpenGraph />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
