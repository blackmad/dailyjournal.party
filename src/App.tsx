import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useState } from "@hookstate/core";

import Make from "./pages/Make";
import OpenGraph from "./pages/OpenGraph";
import Intro from "./pages/Intro";
import DebugPreview from "./pages/DebugPreview";
import DebugThemes from "./pages/DebugThemes";

import { themeConfig } from "./state/themeConfig";

export default function App() {
  const themeConfigState = useState(themeConfig);
  const theme = themeConfigState.get();

  return (
    <ThemeProvider theme={theme}>
      {/* <GlobalFontStyle /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />

          <Route path="debug">
            <Route path="themes" element={<DebugThemes />} />
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
