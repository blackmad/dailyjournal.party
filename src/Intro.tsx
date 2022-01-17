import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookPage } from "./Book";
// import { bookConfig } from "./bookConfig";
// import { Book } from "./Book";
import { BasicBorder, BasicButton } from "./components/BorderBox";
import DailyPlan from "./pages/DailyPlan";
import { DateContext } from "./providers/DateContext";

export default function Intro() {
  const date = DateTime.fromJSDate(new Date());
  const dateContext = useMemo(() => {
    return { dt: date };
  }, [date]);

  const navigate = useNavigate();

  const pageContent = DailyPlan;

  return (
    <DateContext.Provider value={dateContext}>
      <div className="flex w-screen h-screen justify-center align-middle">
        <div
          className="container-lg"
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
                  dailyjournal.party
                </div>
                <div className="text-4xl leading-normal	">
                  This is a tool for making customizable <i>printable</i> daily
                  gratitude journals.
                </div>
                <div className="pt-20 text-4xl leading-normal flex-grow justify-end flex align-bottom justify-items-end">
                  <div>
                    <BasicButton
                      onClick={() => navigate("/make")}
                      className="p-6"
                    >
                      Make one!
                    </BasicButton>
                  </div>
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
                    pageKey="DailyPlan"
                    date={date}
                    key={`${pageContent.title}-${date}`}
                  />
                </div>
              </div>
            </div>
          </BasicBorder>
        </div>
      </div>
    </DateContext.Provider>
  );
}
