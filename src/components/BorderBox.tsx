import React from "react";
import styled from "styled-components";
import { AbstractBox, BoxWithTitleProps, BoxWithFill } from "./AbstractBox";
import { drawDots, drawLines } from "./fillUtils";

const BasicBorder = styled.div`
  border: solid 1px ${(props) => props.theme.colors.borderColor};
  border-radius: 10px;
  background: ${(props) => props.theme.colors.backgroundColor};
  overflow: hidden;
`;

const BorderBox = styled(BasicBorder)`
  width: 100%;
  height: calc(100% - 1em);
  margin-top: 1em;
`;

const BoxTitleBox = styled(BasicBorder)`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 0.2em;
  white-space: nowrap;
`;

function BoxTitle({ title }: { title: string }) {
  return <BoxTitleBox>{title}</BoxTitleBox>;
}

export function BorderBoxWithTitle(props: BoxWithTitleProps) {
  return (
    <AbstractBox
      {...props}
      TitleBoxComponent={BoxTitle}
      ContentBoxComponent={BorderBox}
    />
  );
}

BorderBoxWithTitle.defaultProps = {
  className: "",
  styleCallback: undefined,
  style: undefined,
};

export function BorderDottedBox(props: BoxWithTitleProps) {
  return (
    <BoxWithFill
      {...props}
      bgFillCallback={drawDots}
      BoxComponent={BorderBoxWithTitle}
    />
  );
}

export function BorderRuledBox(props: BoxWithTitleProps) {
  return (
    <BoxWithFill
      {...props}
      bgFillCallback={drawLines}
      BoxComponent={BorderBoxWithTitle}
    />
  );
}
