import React from "react";
import { useTheme } from "styled-components";
import { BorderBoxWithTitle, BorderBoxWithTitleBasicProps } from "./BorderBox";
import { Dimensions, drawDots } from "./fillUtils";

export function DottedBox(props: BorderBoxWithTitleBasicProps) {
  const theme = useTheme();
  const styleCallback = (dimensions: Dimensions) => {
    return {
      backgroundImage: drawDots({ dimensions, theme }),
    };
  };
  return <BorderBoxWithTitle {...props} styleCallback={styleCallback} />;
}
