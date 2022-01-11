import _ from "lodash";
import React from "react";
import styled from "styled-components";
import useDimensions from "use-react-dimensions";

const DotSpacing = 20;
const DotSize = 2;

const Dot = styled.div`
  color: ${(props) => props.theme.colors.dotColor};
  background: ${(props) => props.theme.colors.borderColor};
  border-radius: 100px;
  width: ${DotSize}px;
  height: ${DotSize}px;
  position: absolute;
`;

export function DotFill() {
  const { ref, dimensions } = useDimensions<HTMLDivElement>({});

  const { width, height } = dimensions;

  const numXDots = Math.floor(width / DotSpacing);
  const numYDots = Math.floor(height / DotSpacing);

  const extraXSpace = width - (numXDots - 1) * DotSpacing;
  const extraYSpace = height - (numYDots - 1) * DotSpacing;

  return (
    <div className="h-full w-full relative" ref={ref}>
      {/* dots go here w: {width} <br />
      h: {height} <br />
      {numXDots} {numYDots} <br />
      {extraXSpace}, {extraYSpace} <br /> */}
      {_.times(numXDots, (xi) => {
        return _.times(numYDots, (yi) => {
          return (
            <Dot
              key={`${xi},${yi}`}
              style={{
                left: extraXSpace / 2 + xi * DotSpacing - DotSize / 2,
                top: extraYSpace / 2 + yi * DotSpacing - DotSize / 2,
              }}
            />
          );
        });
      })}
    </div>
  );
}
