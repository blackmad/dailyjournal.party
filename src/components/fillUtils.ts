import * as _ from "lodash";
import { DefaultTheme, useTheme } from "styled-components";

export type DrawCallback = (ctx: CanvasRenderingContext2D) => void;

export function drawWrapper(cb: DrawCallback) {
  const offScreenCanvas = document.createElement("canvas");
  offScreenCanvas.width = 2000;
  offScreenCanvas.height = 2000;
  const context = offScreenCanvas.getContext("2d");

  if (context) {
    cb(context);
  }
  return `url(${offScreenCanvas.toDataURL()})`;
}

export function drawLines({
  theme,
  dimensions: _dimensions,
}: {
  theme: DefaultTheme;
  dimensions: Dimensions;
}) {
  const lineHeight = 20;

  return drawWrapper((context) => {
    const offScreenCanvas = context.canvas;
    context.strokeStyle = theme.colors.dotColor;
    context.lineWidth = 0.2;
    _.times(offScreenCanvas.height / lineHeight, (i) => {
      context.beginPath();
      context.moveTo(0, i * lineHeight);
      context.lineTo(offScreenCanvas.width, i * lineHeight);
      context.stroke();
    });
  });
}

export function drawDots({
  theme,
  dimensions,
}: {
  theme: DefaultTheme;
  dimensions: Dimensions;
}) {
  const lineHeight = 20;
  const { width, height } = dimensions;
  //   const width = 90;
  //   const height = 50;

  // subtract lineHeight / 2 so we're not right on the edges of our box
  const numColumns = Math.floor((width - lineHeight / 2) / lineHeight);
  const numRows = Math.floor((height - lineHeight / 2) / lineHeight);

  const extraYPadding = height - numRows * lineHeight;
  const extraXPadding = width - numColumns * lineHeight;

  //   console.log({
  //     width,
  //     height,
  //     lineHeight,
  //     numColumns,
  //     numRows,
  //     extraXPadding,
  //     extraYPadding,
  //   });

  /*
  height = 50
  width = 90

  lineHeight = 20

  numRows = 2
  extraY = hiehgt - (lineHeight*numRows) = 50 - 40 = 10
  dots at Y = 5, 25, 45

  */

  return drawWrapper((context) => {
    context.fillStyle = theme.colors.dotColor;
    context.lineWidth = 0.2;
    _.times(numColumns + 1, (i) => {
      _.times(numRows + 1, (j) => {
        context.beginPath();
        context.arc(
          extraXPadding + i * lineHeight,
          extraYPadding / 2 + j * lineHeight,
          1,
          0,
          2 * Math.PI
        );
        context.fill();
      });
    });
  });
}

export type BackgroundImageFillFunction = typeof drawDots;

export function wrapInBackgroundImageCallback(cb: BackgroundImageFillFunction) {
  const theme = useTheme();

  return (dimensions: Dimensions) => {
    return {
      backgroundImage: cb({ dimensions, theme }),
    };
  };
}

export type Dimensions = { width: number; height: number };
