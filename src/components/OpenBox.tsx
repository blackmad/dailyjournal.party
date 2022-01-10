import React from "react";
import styled from "styled-components";
import { AbstractBox, BoxWithFill, BoxWithTitleProps } from "./AbstractBox";
import { drawDots } from "./fillUtils";

const OpenBox = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.textBackgroundColor};
`;

const BoxTitleBox = styled.div`
  top: 0px;
  left: 50%;
  white-space: nowrap;
  text-decoration: underline;
  text-underline-offset: 4px;
  padding: 0.2em 1em 0em;
  background: ${(props) => props.theme.colors.textBackgroundColor};
`;

function BoxTitle({ title }: { title: string }) {
  return <BoxTitleBox>{title}</BoxTitleBox>;
}

// type OpenBoxProps = BoxWithTitleProps;

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
