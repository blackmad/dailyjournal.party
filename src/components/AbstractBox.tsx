import React from "react";
import { DateContext } from "../providers/DateContext";
import { chooseOneQuestion, QuestionMapValue } from "../utils/question";

export type BoxWithTitleProps = React.PropsWithChildren<{
  question: QuestionMapValue;
  style?: React.CSSProperties;
  styleCallback?: () => React.CSSProperties | undefined;
  className?: string;
}>;

export type BoxWithTitleComponentType = React.FC<BoxWithTitleProps>;

type AbstractBoxWithTitleProps = {
  TitleBoxComponent: React.FC<{ title: string }>;
  ContentBoxComponent: React.FC<
    Pick<BoxWithTitleProps, "style" | "styleCallback">
  >;
} & BoxWithTitleProps;

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
  const { dt } = React.useContext(DateContext);
  const title = chooseOneQuestion(question, dt);

  return (
    <div
      className={`relative flex flex-col overflow-hidden ${className || ""} `}
    >
      <TitleBoxComponent title={title} />
      <div style={{ flexGrow: 1 }}>
        <ContentBoxComponent
          style={{
            ...(style || {}),
            ...styleCallback?.(),
          }}
        >
          {children}
        </ContentBoxComponent>
      </div>
    </div>
  );
}
