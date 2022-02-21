import { DateTime } from "luxon";
import React, { useMemo } from "react";
import BookPage from "../components/BookPage";
// import { printconfig } from "../bookConfig";
// import { Book } from "../Book";
import { BasicBorder } from "../book-components/BorderBox";
import DailyPlan from "../bookPages/DailyPlan";
import { DateContext } from "../providers/DateContext";

export default function OpenGraph() {
  const date = DateTime.fromJSDate(new Date());
  const dateContext = useMemo(() => {
    return { dt: date };
  }, [date]);

  const pageContent = DailyPlan;

  return (
    <DateContext.Provider value={dateContext}>
      <div
        className="ogcard"
        style={{
          width: 1200,
          height: 630,
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        <BasicBorder>
          <div className="flex flex-row h-full w-full p-4 ">
            <div className="flex-grow flex flex-col p-10">
              <div className="text-6xl pb-6 leading-snug">
                Join the <br />
                Daily Journal Party.
              </div>
              <div className="text-4xl leading-normal	">
                A tool for making printable daily gratitude journals.
              </div>
              <div className="pt-20 text-4xl leading-normal flex-grow justify-end flex align-bottom justify-items-end">
                only at dailyjournal.party <br />a thing by blackmad
              </div>
            </div>
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
          </div>
        </BasicBorder>
      </div>
    </DateContext.Provider>
  );
}
