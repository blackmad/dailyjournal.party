import _ from "lodash";
import React from "react";

import styled from "styled-components";

const BlankLineContainer = styled.div`
  border-bottom: 0.5px solid ${(props) => props.theme.colors.borderColor};
  width: 100%;
  align-items: end;
  display: flex;
`;

const DottedLineContainer = styled(BlankLineContainer)`
  border-bottom: 0.5px dotted ${(props) => props.theme.colors.borderColor};
`;

function BlankLine(props: React.PropsWithChildren<Record<string, unknown>>) {
  const { children } = props;
  return <BlankLineContainer>{children}&nbsp;</BlankLineContainer>;
}

function DottedLine(props: React.PropsWithChildren<Record<string, unknown>>) {
  const { children } = props;
  return <DottedLineContainer>{children}&nbsp;</DottedLineContainer>;
}

export type NLineBoxContentsProps = {
  dotted?: boolean;
  numLines: number;
};

export function NLineBoxContents({ dotted, numLines }: NLineBoxContentsProps) {
  return (
    <div className="flex flex-col items-center h-full align-middle justify-center">
      <div className="flex flex-col items-center px-[1em] w-full h-full">
        <div style={{ flexGrow: 1.2, minHeight: "1em" }} />
        {_.times(numLines).map((n) => {
          if (dotted) {
            return <DottedLine key={n.toString()} />;
          }
          return <BlankLine key={n.toString()} />;
        })}
        <div style={{ flexGrow: 1, minHeight: "1em" }} />
      </div>
    </div>
  );
}

export default function ThreeLineBoxContents() {
  return <NLineBoxContents numLines={3} />;
}
