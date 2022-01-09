import React from "react";
import styled, { ThemeProvider } from "styled-components";
import * as _ from "lodash";
import { DateTime } from "luxon";

import { Header } from "../Header";
import { theme } from "../theme";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 900px;
`;

export type PageContentProps = {
  date: DateTime;
};

export type PageContent = {
  title: string;
  dateCheck: (dt: DateTime) => boolean;
  component: React.FC<PageContentProps>;
};

export const PageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 1.2em 1.2em;
  flex-grow: 1;
`;

export function Page(
  props: React.PropsWithChildren<{
    title: string;
    date: DateTime;
  }>
) {
  const { title, children, date } = props;
  return (
    <ThemeProvider theme={theme}>
      <PageContainer className="page">
        <Header title={title} date={date} />
        {children}
      </PageContainer>
    </ThemeProvider>
  );
}
