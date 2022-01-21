import React, { useMemo } from "react";
import { DateTime } from "luxon";

import DailyPlan from "../pages/DailyPlan";
import { DateContext } from "../providers/DateContext";
import { BookPage } from "../Book";

export default function PagePreview() {
  const date = DateTime.fromJSDate(new Date());
  const dateContext = useMemo(() => {
    return { dt: date };
  }, [date]);
  const pageContent = DailyPlan;

  return (
    <DateContext.Provider value={dateContext}>
      <div className="flex flex-col align-middle justify-center justify-items-center ">
        <div
          className="border border-slate-300"
          style={{
            zoom: 0.65,
            height: "fit-content",
          }}
        >
          <BookPage
            pageContent={pageContent as any}
            questionConfig={pageContent.defaultQuestionConfig}
            date={date}
            key={`${pageContent.title}-${date}`}
          />
        </div>
      </div>
    </DateContext.Provider>
  );
}
