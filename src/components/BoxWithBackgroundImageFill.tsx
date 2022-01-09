import React from "react";
import { useTheme } from "styled-components";
import { BoxWithTitleProps } from "./AbstractBox";
import { BorderBoxWithTitle } from "./BorderBox";
import { Dimensions, drawDots, drawLines } from "./fillUtils";

export function BoxWithBackgroundImageFill(
  props: BoxWithTitleProps & {
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

export function RuledBox(props: BoxWithTitleProps) {
  return <BoxWithBackgroundImageFill fillCb={drawLines} {...props} />;
}

export function DottedBox(props: BoxWithTitleProps) {
  return <BoxWithBackgroundImageFill fillCb={drawDots} {...props} />;
}
