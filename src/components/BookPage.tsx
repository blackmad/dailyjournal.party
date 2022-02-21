import React, { useEffect, useMemo } from "react";

import _ from "lodash";
import { DateTime } from "luxon";
import { createGlobalStyle } from "styled-components";
import { Downgraded, useState } from "@hookstate/core";
import { DateContext } from "../providers/DateContext";

import { EmptyPage, Page, PageContent } from "../bookPages/Page";
import {
  printConfig,
  fullAppQuestionMapState,
  PrintConfig,
  generatePages,
} from "../bookConfig";
import BookMaker from "../components/BookMaker";
import { inPrintMode } from "../state/printMode";
import { dateConfig } from "../state/dateConfig";
import { QuestionMap } from "../utils/question";

export default function BookPage<T extends string>({
  date,
  pageContent,
  questionConfig,
}: {
  date: DateTime;
  pageContent: PageContent<T>;
  questionConfig: QuestionMap<T>;
}) {
  const dateContext = useMemo(() => {
    return { dt: date };
  }, [date]);
  const { title, component: PageContentComponent } = pageContent;

  return (
    <React.Fragment key={`${date}-${title}`}>
      <DateContext.Provider value={dateContext}>
        <Page title={title} key={date.toISODate() + title}>
          <PageContentComponent questionConfig={questionConfig as any} />
        </Page>
      </DateContext.Provider>
    </React.Fragment>
  );
}
