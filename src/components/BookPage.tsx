import React, { useMemo } from "react";

import _ from "lodash";
import { DateTime } from "luxon";

import { DateContext } from "../providers/DateContext";

import { Page, PageContent } from "../bookPages/Page";
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
