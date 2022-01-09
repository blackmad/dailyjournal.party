import React from "react";
import styled from "styled-components";
import { AbstractBox, BoxWithTitleProps } from "./AbstractBox";

const OpenBox = styled.div`
  width: 100%;
  height: calc(100% - 1em);
  margin-top: 1em;
`;

const BoxTitleBox = styled.div`
  top: 0px;
  left: 50%;
  padding: 0.2em;
  white-space: nowrap;
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
