import React from "react";
import styled from "styled-components";
import { AbstractBox, BoxWithFill, BoxWithTitleProps } from "./AbstractBox";
import { drawDots } from "./fillUtils";

const OpenBox = styled.div`
  width: 100%;
  height: 100%;
`;

const BoxTitleBox = styled.div`
  top: 0px;
  left: 50%;
  white-space: nowrap;
  text-decoration: underline;
`;

function BoxTitle({ title }: { title: string }) {
  return <BoxTitleBox>{title}</BoxTitleBox>;
}

export function OpenBoxWithTitle(props: BoxWithTitleProps) {
  return (
    <AbstractBox
      {...props}
      TitleBoxComponent={BoxTitle}
      ContentBoxComponent={OpenBox}
    />
  );
}

export function OpenDottedBox(props: BoxWithTitleProps) {
  return (
    <BoxWithFill
      {...props}
      bgFillCallback={drawDots}
      BoxComponent={OpenBoxWithTitle}
    />
  );
}
