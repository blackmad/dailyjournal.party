import React from "react";
import { useTheme } from "styled-components";
import { BorderBoxWithTitle, BorderBoxWithTitleProps } from "./BorderBox";
import { Dimensions, drawDots, drawLines } from "./fillUtils";

export function BoxWithBackgroundImageFill(
  props: BorderBoxWithTitleProps & {
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

export function RuledBox(props: BorderBoxWithTitleProps) {
  return <BoxWithBackgroundImageFill fillCb={drawLines} {...props} />;
}

export function DottedBox(props: BorderBoxWithTitleProps) {
  return <BoxWithBackgroundImageFill fillCb={drawDots} {...props} />;
}
