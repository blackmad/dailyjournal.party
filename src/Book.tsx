import React from "react";
import { DateTime, Interval } from "luxon";
import DailyPlan from "./pages/DailyPlan";
import WeeklyPlan from "./pages/WeeklyPlan";
import { Page } from "./pages/Page";
import DailyReflect from "./pages/DailyReflect";

const PageContents = [WeeklyPlan, DailyPlan, DailyReflect];

export function Book() {
  const startDate = DateTime.fromJSDate(new Date());
  const endDate = startDate.plus({ days: 30 });

  const interval = Interval.fromDateTimes(startDate, endDate).splitBy({
    days: 1,
  });

  return (
    <>
      {interval.flatMap((date) => {
        return PageContents.map((pageContent) => {
          const {
            title,
            dateCheck,
            component: PageContentComponent,
          } = pageContent;
          if (!dateCheck(date.start)) {
            return null;
          }
          return (
            <Page
              title={title}
              key={date.start.toISODate() + title}
              date={date.start}
            >
              <PageContentComponent date={date.start} />
            </Page>
          );
        });
      })}
    </>
  );
}
