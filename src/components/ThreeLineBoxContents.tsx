import _ from "lodash";
import React from "react";

import styled from "styled-components";

const BlankLineContainer = styled.div`
  border-bottom: 0.5px solid ${(props) => props.theme.colors.borderColor};
  width: 100%;
  //   flex-grow: 1;
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

export function NLineBoxContents({
  dotted,
  numLines,
}: {
  dotted?: boolean;
  numLines: number;
}) {
  return (
    <div className="flex flex-col items-center h-full align-middle justify-center">
      <div className="flex flex-col items-center px-[1em] w-full pb-[1em] pt-[1em]">
        {_.times(numLines).map((n) => {
          if (dotted) {
            return <DottedLine key={n.toString()} />;
          }
          return <BlankLine key={n.toString()} />;
        })}
      </div>
    </div>
  );
}

export default function ThreeLineBoxContents() {
  return <NLineBoxContents numLines={3} />;
}
