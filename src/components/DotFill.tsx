/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import React from "react";
import styled from "styled-components";

const Dot = styled.div`
  color: ${(props) => props.theme.colors.dotColor};
`;

export function DotFill() {
  return (
    <div className="h-full w-full overflow-y-hidden flex flex-row flex-wrap max-h-full max-w-full absolute left-0 top-0 justify-center justify-items-center align-middle">
      {_.times(200, (i) => {
        return (
          <Dot
            className="flex justify-center justify-items-center align-middle"
            style={{ width: 20, height: 20, flexShrink: 0 }}
            key={`dot-${i}`}
          >
            ·
          </Dot>
        );
      })}
    </div>
  );
}
