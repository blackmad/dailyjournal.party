import React from "react";
import { useTheme } from "styled-components";
import { BorderBoxWithTitle, BorderBoxWithTitleBasicProps } from "./BorderBox";
import { Dimensions, drawDots, drawLines } from "./fillUtils";

export function BoxWithBackgroundImageFill(
  props: BorderBoxWithTitleBasicProps & {
    fillCb: typeof drawLines;
  }
) {
  const { fillCb } = props;
  const theme = useTheme();
  const styleCallback = (dimensions: Dimensions) => {
    return {
      backgroundImage: fillCb({ dimensions, theme }),
    };
  };
  return <BorderBoxWithTitle {...props} styleCallback={styleCallback} />;
}

export function RuledBox(props: BorderBoxWithTitleBasicProps) {
  return <BoxWithBackgroundImageFill fillCb={drawLines} {...props} />;
}

export function DottedBox(props: BorderBoxWithTitleBasicProps) {
  return <BoxWithBackgroundImageFill fillCb={drawDots} {...props} />;
}
