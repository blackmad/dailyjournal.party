import React from "react";
import styled from "styled-components";
import { AbstractBox, BoxWithTitleProps } from "./AbstractBox";
import { DotFill } from "./DotFill";
import { NLineBoxContentsProps } from "./ThreeLineBoxContents";

export const BasicBorder = styled.div`
  border: solid 1px ${(props) => props.theme.colors.borderColor};
  border-radius: 10px;
  background: ${(props) => props.theme.colors.backgroundColor};
`;

export const BasicButton = styled.button`
  border: solid 2px ${(props) => props.theme.colors.borderColor};
  border-radius: 10px;
  color: ${(props) => props.theme.colors.borderColor};
  // background: ${(props) => props.theme.colors.backgroundColor};
  font-weight: bold;
  filter: brightness(0.8);
`;

const BorderBoxInner = styled(BasicBorder)`
  width: 100%;
  height: calc(100% - 1em);
  margin-top: 1em;
  position: relative;
  overflow: hidden;
`;

export function BorderBox(props: React.PropsWithChildren<any>) {
  const { children } = props;
  return (
    <div className="w-full h-full flex flex-row">
      <BorderBoxInner>{children}</BorderBoxInner>
    </div>
  );
}

const BoxTitleBox = styled(BasicBorder)`
  padding: 0.2em 1em;
  white-space: nowrap;
  z-index: 1000;
`;

export function BoxTitle({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        position: "absolute",
        top: 0,
        paddingLeft: "1em",
      }}
    >
      <BoxTitleBox>{title}</BoxTitleBox>
    </div>
  );
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
    <BorderBoxWithTitle {...props}>
      <DotFill />
    </BorderBoxWithTitle>
  );
}

export function BorderRuledBox(
  props: BoxWithTitleProps & NLineBoxContentsProps
) {
  return (
    <BorderBoxWithTitle {...props}>
      {/* <NLineBoxContents {...props} /> */}
    </BorderBoxWithTitle>
  );
}
