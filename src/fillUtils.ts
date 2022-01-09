import * as _ from "lodash";
import { Theme } from "./theme";

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
  theme: Theme;
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
  theme: Theme;
  dimensions: Dimensions;
}) {
  const lineHeight = 20;
  const { width, height } = dimensions;

  return drawWrapper((context) => {
    context.fillStyle = theme.colors.dotColor;
    context.lineWidth = 0.2;
    _.times(width / lineHeight, (i) => {
      _.times(height / lineHeight, (j) => {
        if (i === 0 || j === 0) {
          return;
        }
        context.beginPath();
        context.arc(i * lineHeight, j * lineHeight, 1, 0, 2 * Math.PI);
        context.fill();
      });
    });
  });
}

export type Dimensions = { width: number; height: number };
