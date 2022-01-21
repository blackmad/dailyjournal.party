/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from "react";
import _ from "lodash";
import { Downgraded, useState } from "@hookstate/core";

import { BasicBorder } from "../book-components/BorderBox";
import { PrintSettings } from "./Settings/PrintSettings";
import { DateSettings } from "./Settings/DateSettings";
import {
  fullAppQuestionMapState,
  generatePages,
  printConfig,
} from "../bookConfig";
import { convertUnits } from "../utils/convert";
import { QuestionSettings } from "./Settings/QuestionSettings";
import { dateConfig } from "../state/dateConfig";
import { BookPage } from "../Book";

export default function BookMaker() {
  const pageIndex = useState(0);
  const printconfigState = useState(printConfig);
  const printconfigValue = printconfigState.get();

  const zoomStyle = useMemo(() => {
    const heightInPx = convertUnits(
      printconfigValue.pageHeight,
      printconfigValue.pageUnits,
      "px"
    );
    const maxHeight = 600;
    const zoomFactor = maxHeight / heightInPx;

    return { zoom: zoomFactor };
  }, [printconfigValue]);

  const dateConfigState = useState(dateConfig);

  const { startDate: startDateString, endDate: endDateString } =
    dateConfigState.get();

  const pages = generatePages(startDateString, endDateString);

  const fullAppQuestionConfig = useState(fullAppQuestionMapState);

  const currentPage = pages[pageIndex.get()];
  const questionConfig = fullAppQuestionConfig.get()[currentPage.pageKey];

  return (
    <div className="w-11/12 ">
      <BasicBorder className="text-center hero-content">
        <div className="w-full">
          <div className="flex flex-row p-6">
            <div className="pr-6">
              {/* <ControlPanelSection title="Layout Settings" key="layout" /> */}
              {/* <ControlPanelSection title="Date Settings" key="date" /> */}
              <QuestionSettings />
              <DateSettings />
              <PrintSettings />
            </div>
            <div className="flex flex-col">
              <div style={zoomStyle}>
                <BookPage
                  date={currentPage.date}
                  pageContent={currentPage.pageContent}
                  questionConfig={questionConfig || ({} as any)}
                />
              </div>
              <div className="flex justify-center">
                <div className="btn-group">
                  <button
                    type="button"
                    className={`btn btn-outline ${
                      pageIndex.get() === 0 ? "btn-disabled" : ""
                    }`}
                    onClick={() => pageIndex.set(pageIndex.get() - 1)}
                  >
                    ❮
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-wide btn-disabled"
                  >
                    Page {pageIndex.get() + 1} of {pages.length}
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline ${
                      pageIndex.get() === pages.length - 1 ? "btn-disabled" : ""
                    }`}
                    onClick={() => pageIndex.set(pageIndex.get() + 1)}
                  >
                    ❯
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasicBorder>
    </div>
  );
}
