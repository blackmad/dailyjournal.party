import React, { useMemo } from "react";
import { DateTime, Interval } from "luxon";
import DailyPlan from "./pages/DailyPlan";
import WeeklyPlan from "./pages/WeeklyPlan";
import { Page } from "./pages/Page";
import WeeklyReflect from "./pages/WeeklyReflect";
import DailyReflect from "./pages/DailyReflect";
import { BookForm } from "./BookForm";

const PageContents = [WeeklyReflect, WeeklyPlan, DailyPlan, DailyReflect];
// const PageContents = [WeeklyPlan];

export const DateContext = React.createContext<{ dt: DateTime }>({
  dt: DateTime.fromJSDate(new Date()),
});

function BookDate({ date }: { date: DateTime }) {
  const dateContext = useMemo(() => {
    return { dt: date };
  }, [date]);
  return (
    <DateContext.Provider value={dateContext}>
      {PageContents.map((pageContent) => {
        const {
          title,
          dateCheck,
          component: PageContentComponent,
        } = pageContent;
        if (!dateCheck(date)) {
          return null;
        }
        return (
          <Page title={title} key={date.toISODate() + title}>
            <PageContentComponent />
          </Page>
        );
      })}
    </DateContext.Provider>
  );
}

export function Book() {
  const startDate = DateTime.fromJSDate(new Date());
  const endDate = startDate.plus({ days: 2 });

  const interval = Interval.fromDateTimes(startDate, endDate).splitBy({
    days: 1,
  });

  return (
    <>
      <BookForm />
      {interval.map((date) => {
        return <BookDate date={date.start} key={date.start.toISODate()} />;
      })}
    </>
  );
}
