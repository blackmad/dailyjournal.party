import React from "react";
import useDimensions from "use-react-dimensions";
import {
  BackgroundImageFillFunction,
  Dimensions,
  wrapInBackgroundImageCallback,
} from "./fillUtils";

export type BoxWithTitleProps = React.PropsWithChildren<{
  title: string;
  style?: React.CSSProperties;
  styleCallback?: (d: Dimensions) => React.CSSProperties | undefined;
  className?: string;
}>;

export type BoxWithTitleComponentType = React.FC<BoxWithTitleProps>;

type AbstractBoxWithTitleProps = {
  TitleBoxComponent: React.FC<Pick<BoxWithTitleProps, "title">>;
  ContentBoxComponent: React.FC<
    Pick<BoxWithTitleProps, "style" | "styleCallback">
  >;
} & BoxWithTitleProps;

export function BoxWithFill(
  props: Exclude<BoxWithTitleProps, "styleCallback"> & {
    bgFillCallback: BackgroundImageFillFunction;
    BoxComponent: React.FC<BoxWithTitleProps>;
  }
) {
  const { bgFillCallback, BoxComponent } = props;
  const styleCallback = wrapInBackgroundImageCallback(bgFillCallback);
  return <BoxComponent {...props} styleCallback={styleCallback} />;
}

export function AbstractBox(props: AbstractBoxWithTitleProps) {
  const {
    title,
    style,
    className,
    children,
    styleCallback,
    TitleBoxComponent,
    ContentBoxComponent,
  } = props;
  const { ref, dimensions } = useDimensions<HTMLDivElement>({});

  return (
    <div className={`${className || ""} relative`} ref={ref}>
      <TitleBoxComponent title={title} />
      <ContentBoxComponent
        style={{
          ...(style || {}),
          ...styleCallback?.(dimensions),
        }}
      >
        {children}
      </ContentBoxComponent>
    </div>
  );
}
