import React from "react";
import styled, { ThemeProvider } from "styled-components";
import * as _ from "lodash";
import { DateTime } from "luxon";

import { Header } from "../Header";
import { theme } from "../theme";
import { QuestionMap } from "../utils/question";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 900px;
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
  padding: 1.2em 1.2em;
  flex-grow: 1;
  overflow: hidden;
`;

export function Page(
  props: React.PropsWithChildren<{
    title: string;
  }>
) {
  const { title, children } = props;
  return (
    <ThemeProvider theme={theme}>
      <PageContainer className="page">
        <Header title={title} />
        {children}
      </PageContainer>
    </ThemeProvider>
  );
}
