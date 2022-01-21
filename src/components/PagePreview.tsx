import React, { useMemo } from "react";
import { DateTime } from "luxon";

import DailyPlan from "../pages/DailyPlan";
import { DateContext } from "../providers/DateContext";
import { BookPage } from "../Book";
import { PageContent } from "../pages/Page";

export default function PagePreview({
  zoom = 0.65,
  pageContent = DailyPlan,
}: {
  zoom?: number;
  pageContent?: PageContent<any>;
}) {
  const date = DateTime.fromJSDate(new Date());
  const dateContext = useMemo(() => {
    return { dt: date };
  }, [date]);

  return (
    <DateContext.Provider value={dateContext}>
      <div className="flex flex-col align-middle justify-center justify-items-center ">
        <div
          className="border border-slate-300"
          style={{
            zoom,
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
