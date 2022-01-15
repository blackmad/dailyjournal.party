import React from "react";
import useDimensions from "use-react-dimensions";
import { DateContext } from "../providers/DateContext";
import { chooseOneQuestion, QuestionMapValue } from "../utils/question";
import {
  BackgroundImageFillFunction,
  Dimensions,
  wrapInBackgroundImageCallback,
} from "./fillUtils";

export type BoxWithTitleProps = React.PropsWithChildren<{
  question: QuestionMapValue;
  style?: React.CSSProperties;
  styleCallback?: (d: Dimensions) => React.CSSProperties | undefined;
  className?: string;
}>;

export type BoxWithTitleComponentType = React.FC<BoxWithTitleProps>;

type AbstractBoxWithTitleProps = {
  TitleBoxComponent: React.FC<{ title: string }>;
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
    question,
    style,
    className,
    children,
    styleCallback,
    TitleBoxComponent,
    ContentBoxComponent,
  } = props;
  const { ref, dimensions } = useDimensions<HTMLDivElement>({});
  const { dt } = React.useContext(DateContext);
  const title = chooseOneQuestion(question, dt);

  return (
    <div
      className={`relative flex flex-col overflow-hidden ${className || ""} `}
    >
      <TitleBoxComponent title={title} />
      <div ref={ref} style={{ flexGrow: 1 }}>
        <ContentBoxComponent
          style={{
            ...(style || {}),
            ...styleCallback?.(dimensions),
          }}
        >
          {children}
        </ContentBoxComponent>
      </div>
    </div>
  );
}
