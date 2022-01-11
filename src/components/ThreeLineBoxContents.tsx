import React from "react";

import styled from "styled-components";

const BlankLineContainer = styled.div`
  border-bottom: 0.5px solid ${(props) => props.theme.colors.borderColor};
  width: 100%;
  //   flex-grow: 1;
  align-items: end;
  display: flex;
`;

function BlankLine(props: React.PropsWithChildren<Record<string, unknown>>) {
  const { children } = props;
  return <BlankLineContainer>{children}&nbsp;</BlankLineContainer>;
}

export default function ThreeLineBoxContents() {
  return (
    <div className="flex flex-col items-center justify-between h-full pt-[1em] pb-[2em] px-[1em]">
      <BlankLine key="1" />
      <BlankLine key="2" />
      <BlankLine key="3" />
    </div>
  );
}
