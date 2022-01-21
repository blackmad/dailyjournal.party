import React from "react";
import styled from "styled-components";
import * as _ from "lodash";
import { DateTime } from "luxon";
import { useState } from "@hookstate/core";

import { QuestionMap } from "../utils/question";
import { printConfig } from "../bookConfig";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 12pt;
  box-sizing: border-box;
`;

export interface PageContent<Q extends string> {
  title: string;
  dateCheck: (dt: DateTime) => boolean;
  component: React.FC<{ questionConfig: QuestionMap<Q> }>;
  defaultQuestionConfig: QuestionMap<Q>;
  questionTranslations?: Partial<Record<Q, string>>;
  key: string;
}

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

  const printconfigState = useState(printConfig);
  const printconfigValue = printconfigState.get();

  return (
    <PageContainer
      className="page"
      style={{
        width: `${
          printconfigValue.pageWidth /
          (printconfigValue.doubleSidedPrinting ? 2 : 1)
        }${printconfigValue.pageUnits}`,
        height: `${printconfigValue.pageHeight}${printconfigValue.pageUnits}`,
      }}
    >
      {children}
    </PageContainer>
  );
}

export function EmptyPage() {
  return <Page>This page semi-intentionally left blank</Page>;
}
