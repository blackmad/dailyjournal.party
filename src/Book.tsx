import React, { useMemo } from "react";
import _ from "lodash";
import { DateTime, Interval } from "luxon";

import DailyPlan from "./pages/DailyPlan";
import WeeklyPlan from "./pages/WeeklyPlan";
import { Page, PageContent } from "./pages/Page";
import WeeklyReflect from "./pages/WeeklyReflect";
import DailyReflect from "./pages/DailyReflect";
import { DateContext } from "./providers/DateContext";

const PageContents = [WeeklyReflect, DailyPlan, WeeklyPlan, DailyReflect];

function BookPage<T extends string>({
  date,
  pageContent,
}: {
  date: DateTime;
  pageContent: PageContent<T>;
}) {
  const dateContext = useMemo(() => {
    return { dt: date };
  }, [date]);

  const { title, component: PageContentComponent } = pageContent;

  return (
    <React.Fragment key={`${date}-${title}`}>
      <DateContext.Provider value={dateContext}>
        <Page title={title} key={date.toISODate() + title}>
          <PageContentComponent />
        </Page>
      </DateContext.Provider>
    </React.Fragment>
  );
}

function makeBookPages({ date }: { date: DateTime }) {
  return PageContents.flatMap((pageContent) => {
    const { dateCheck } = pageContent;
    if (!dateCheck(date)) {
      return [];
    }

    return [
      <BookPage
        pageContent={pageContent}
        date={date}
        key={`${pageContent.title}-${date}`}
      />,
    ];
  });
}

export function Book() {
  const startDate = DateTime.fromJSDate(new Date());
  const endDate = startDate.plus({ days: 7 });

  const interval = Interval.fromDateTimes(startDate, endDate).splitBy({
    days: 1,
  });

  return (
    <div className="content">
      {interval.flatMap((date) => makeBookPages({ date: date.start }))}
    </div>
  );
}
