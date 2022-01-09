import React from "react";
import styled from "styled-components";
import useDimensions from "use-react-dimensions";
import { Dimensions } from "./fillUtils";

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

const BoxTitle = styled(BasicBorder)`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 0.2em;
  white-space: nowrap;
`;

type BorderBoxWithTitleProps = React.PropsWithChildren<{
  title: string;
  style?: React.CSSProperties;
  styleCallback?: (d: Dimensions) => React.CSSProperties | undefined;
  className?: string;
}>;

export type BorderBoxWithTitleBasicProps = Pick<
  BorderBoxWithTitleProps,
  "title" | "className"
>;

export function BorderBoxWithTitle(props: BorderBoxWithTitleProps) {
  const { title, style, className, children, styleCallback } = props;
  const { ref, dimensions } = useDimensions<HTMLDivElement>({});

  return (
    <div className={`${className || ""} relative`} ref={ref}>
      <BoxTitle>{title}</BoxTitle>
      <BorderBox
        style={{
          ...(style || {}),
          ...styleCallback?.(dimensions),
        }}
      >
        {children}
      </BorderBox>
    </div>
  );
}

BorderBoxWithTitle.defaultProps = {
  className: "",
  styleCallback: undefined,
  style: undefined,
};
