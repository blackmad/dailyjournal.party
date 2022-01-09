import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import useDimensions from "use-react-dimensions";
import * as _ from "lodash";

import { Header } from "./Header";

const theme = {
  colors: {
    backgroundColor: "#FFFDF9",
    textColor: "#06B49A",
    dotColor: "#06B49A",
    borderColor: "#AFDBD2",
  },
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 900px;
`;

const BasicBorder = styled.div`
  border: solid 1px ${(props) => props.theme.colors.borderColor};
  border-radius: 10px;
  background: ${(props) => props.theme.colors.backgroundColor};
  overflow: hidden;
`;

const BorderBox = styled(BasicBorder)`
  width: 100%;
  height: 100%;
`;

const BoxTitle = styled(BasicBorder)`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, -1em);
  padding: 0.2em;
  white-space: nowrap;
`;

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 2.2em 1.2em;
  flex-grow: 1;
`;

type DrawCallback = (ctx: CanvasRenderingContext2D) => void;

function drawWrapper(cb: DrawCallback) {
  const offScreenCanvas = document.createElement("canvas");
  offScreenCanvas.width = 2000;
  offScreenCanvas.height = 2000;
  const context = offScreenCanvas.getContext("2d");

  if (context) {
    cb(context);
  }
  return `url(${offScreenCanvas.toDataURL()})`;
}

function drawLines() {
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

function drawDots() {
  const lineHeight = 20;

  return drawWrapper((context) => {
    const offScreenCanvas = context.canvas;
    context.fillStyle = theme.colors.dotColor;
    context.lineWidth = 0.2;
    _.times(offScreenCanvas.height / lineHeight, (i) => {
      _.times(offScreenCanvas.width / lineHeight, (j) => {
        context.beginPath();
        context.arc(i * lineHeight, j * lineHeight, 1, 0, 2 * Math.PI);
        context.fill();
      });
    });
  });
}

function DottedBox({ className, title }: { className: string; title: string }) {
  const { ref, dimensions } = useDimensions<HTMLDivElement>({});
  const [savedDim, setSavedDim] = useState<
    { width: number; height: number } | undefined
  >(undefined);

  const { width, height } = dimensions;

  if (!savedDim && width) {
    setSavedDim({ width, height });
  }

  return (
    <div className={`${className} relative`} ref={ref}>
      <BoxTitle>{title}</BoxTitle>
      <BorderBox
        style={{
          backgroundImage: drawDots(),
          backgroundSize: "2000px 2000px",
        }}
      />
    </div>
  );
}

function RuledBox({ className, title }: { className: string; title: string }) {
  // const { ref, dimensions } = useDimensions<HTMLDivElement>({});
  // const [savedDim, setSavedDim] = useState<
  //   { width: number; height: number } | undefined
  // >(undefined);

  // const { width, height } = dimensions;

  // if (!savedDim && width) {
  //   setSavedDim({ width, height });
  // }

  // console.log({ width, height });

  // const targetLineHeightPx = 20;
  // const topMarginPx = 10;

  // if (!savedDim) {
  //   return null;
  // }

  // const maxLines = Math.floor(
  //   (savedDim.height - topMarginPx) / targetLineHeightPx
  // );
  // const extraMargin = savedDim.height - topMarginPx - maxLines * topMarginPx;

  return (
    <div className={`${className} relative`}>
      <BoxTitle>{title}</BoxTitle>
      <BorderBox
        style={{
          backgroundImage: drawLines(),
          backgroundSize: "2000px 2000px",
        }}
      />
    </div>
  );
}

export function Page() {
  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <Header />
        <PageGrid>
          <DottedBox className="col-span-12" title="who is your daddy" />

          <RuledBox className="col-span-4" title="who is your daddy" />
          <RuledBox className="col-span-4" title="who is your daddy" />
          <RuledBox className="col-span-4" title="who is your daddy" />

          <RuledBox className="col-span-12" title="who is your daddy" />
        </PageGrid>
      </PageContainer>
    </ThemeProvider>
  );
}
