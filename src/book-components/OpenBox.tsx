import React from "react";
import styled from "styled-components";
import { AbstractBox, BoxWithTitleProps } from "./AbstractBox";
import { DotFill } from "./DotFill";

const OpenBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  // background: ${(props) => props.theme.colors.textBackgroundColor};
`;

export const OpenBackgroundBox = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.textBackgroundColor};
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.colors.textColor};
`;

const BoxTitleBox = styled.div`
  top: 0px;
  left: 50%;
  white-space: nowrap;
  text-decoration: underline;
  text-underline-offset: 4px;
  padding: 0.2em 0.2em;
  width: fit-content;
  background: ${(props) => props.theme.colors.backgroundColor};
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.colors.textColor};
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
    <OpenBoxWithTitle {...props}>
      <DotFill />
    </OpenBoxWithTitle>
  );
}
