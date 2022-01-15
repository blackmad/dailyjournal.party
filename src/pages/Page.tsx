import React from "react";
import styled, { ThemeProvider } from "styled-components";
import * as _ from "lodash";
import { DateTime } from "luxon";

import { theme } from "../theme";
import { QuestionMap } from "../utils/question";
import { bookConfig } from "../bookConfig";
// import { convertUnits } from "../utils/convert";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // padding: 12pt;
  box-sizing: border-box;
  width: ${bookConfig.pageWidth}${bookConfig.pageUnits};
  height: ${bookConfig.pageHeight}${bookConfig.pageUnits};
`;

export type PageContentProps = Record<string, never>;

export type PageContent<Q extends string> = {
  title: string;
  dateCheck: (dt: DateTime) => boolean;
  component: React.FC<PageContentProps>;
  questionConfig: QuestionMap<Q>;
};

export const PageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-auto-rows: 1fr;
  grid-auto-flow: row dense;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding-top: 0.8em;
  // margin: 12pt;
  flex-grow: 1;
  overflow: hidden;
`;

export function Page(props: React.PropsWithChildren<any>) {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      <PageContainer className="page">{children}</PageContainer>
    </ThemeProvider>
  );
}

export function EmptyPage() {
  return <Page>This page semi-intentionally left blank</Page>;
}
