import _ from "lodash";
import React from "react";
import { ThemeProvider } from "styled-components";
import daisyUIThemes from "../daisyUIthemes";
import { useGetAllPages } from "./Book";

export default function DebugThemes() {
  const pages = useGetAllPages("WeeklyPlan")[0];

  return (
    <>
      {_.map(daisyUIThemes, (value, key) => {
        return (
          <ThemeProvider theme={value}>
            <h1>{key}</h1>
            {pages}
          </ThemeProvider>
        );
      })}
    </>
  );
}
