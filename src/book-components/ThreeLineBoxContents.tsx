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
  includeCheckbox?: boolean;
};

const Checkbox = styled.div`
  border: solid 0.5px ${(props) => props.theme.colors.borderColor};
  height: 0.65em;
  width: 0.65em;
  margin-right: 0.4em;
`;

export function NLineBoxContents({
  dotted,
  numLines,
  includeCheckbox,
}: NLineBoxContentsProps) {
  return (
    <div className="flex flex-col items-center h-full align-middle justify-center">
      <div className="flex flex-col items-center px-[1em] w-full h-full">
        <div style={{ flexGrow: 1.2, minHeight: "1em" }} />
        {_.times(numLines).map((n) => (
          <div className="w-full flex flex-row justify-center align-middle items-center">
            {includeCheckbox && <Checkbox />}
            {dotted && <DottedLine key={n.toString()} />}
            {!dotted && <BlankLine key={n.toString()} />}
          </div>
        ))}

        <div style={{ flexGrow: 1, minHeight: "1em" }} />
      </div>
    </div>
  );
}

export default function ThreeLineBoxContents({
  includeCheckbox,
}: {
  includeCheckbox?: boolean;
}) {
  return <NLineBoxContents numLines={3} includeCheckbox={includeCheckbox} />;
}
