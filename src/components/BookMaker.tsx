/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo } from "react";
import _ from "lodash";
import { Downgraded, useState } from "@hookstate/core";
import useMobileDetect from "use-mobile-detect-hook";
import { useWindowWidth } from "@react-hook/window-size";

import { BasicBorder } from "../book-components/BorderBox";
import { PrintSettings } from "./Settings/PrintSettings";
import { DateSettings } from "./Settings/DateSettings";
import {
  AppPage,
  fullAppQuestionMapState,
  GeneratedPages,
  generatePages,
  printConfig,
} from "../bookConfig";
import { convertUnits } from "../utils/convert";
import { QuestionSettings } from "./Settings/QuestionSettings";
import { dateConfig } from "../state/dateConfig";
import { BookPage } from "../Book";
import { openQuestionsSettingPanel } from "../state/openQuestionsSettingPanel";
import { Footer } from "./Footer";
import { PageContent } from "../pages/Page";

function SpreadPreview({ pages }: { pages: GeneratedPages }) {
  const detectMobile = useMobileDetect();

  const pageIndex = useState(0);
  const printConfigState = useState(printConfig);
  const printConfigValue = printConfigState.get();

  const fullAppQuestionConfig = useState(fullAppQuestionMapState);

  const windowWidth = useWindowWidth();

  const numPages = pages.length;

  const currentPage = pages[pageIndex.get()];
  const nextPage = pages[(pageIndex.get() + 1) % numPages];

  const zoomStyle = useMemo(() => {
    const heightInPx = convertUnits(
      printConfigValue.pageHeight,
      printConfigValue.pageUnits,
      "px"
    );

    const widthInPx = convertUnits(
      printConfigValue.pageWidth,
      printConfigValue.pageUnits,
      "px"
    );

    let zoomFactor: number;
    if (detectMobile.isMobile()) {
      const maxWidth = windowWidth;
      zoomFactor = maxWidth / widthInPx;
    } else {
      const maxHeight = 600;
      zoomFactor = maxHeight / heightInPx;
    }

    return { zoom: zoomFactor, WebkitTextSizeAdjust: "none" };
  }, [printConfigValue, detectMobile, windowWidth]);

  const questionConfig = fullAppQuestionConfig.attach(Downgraded).get()[
    currentPage.pageKey
  ];

  const nextQuestionConfig = fullAppQuestionConfig.attach(Downgraded).get()[
    currentPage.pageKey
  ];

  return (
    <div className="flex flex-col">
      <div style={zoomStyle} className="flex flex-row">
        <BookPage
          date={currentPage.date}
          pageContent={currentPage.pageContent}
          questionConfig={questionConfig || ({} as any)}
        />

        {detectMobile.isMobile() && (
          <BookPage
            date={nextPage.date}
            pageContent={nextPage.pageContent}
            questionConfig={questionConfig || ({} as any)}
          />
        )}
      </div>
      <div className="flex justify-center py-2 sm:py-0">
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
            Page {pageIndex.get() + 1} of {numPages}
          </button>
          <button
            type="button"
            className={`btn btn-outline ${
              pageIndex.get() === numPages - 1 ? "btn-disabled" : ""
            }`}
            onClick={() => pageIndex.set(pageIndex.get() + 1)}
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookMaker() {
  const pageIndex = useState(0);
  const printConfigState = useState(printConfig);
  const printConfigValue = printConfigState.get();

  const openQuestionsSettingPanelState = useState(openQuestionsSettingPanel);
  const lastOpenQuestionsSettingPanelState = useState<undefined | AppPage>(
    undefined
  );

  const dateConfigState = useState(dateConfig);
  const pages = generatePages(dateConfigState.get());

  const currentPage = pages[pageIndex.get()];

  const openPanel = openQuestionsSettingPanelState.get();
  if (openPanel !== lastOpenQuestionsSettingPanelState.get()) {
    if (openPanel && currentPage.pageKey !== openPanel) {
      const newPageIndex = pages.findIndex((p) => p.pageKey === openPanel);
      if (newPageIndex !== -1) {
        pageIndex.set(newPageIndex);
      }
    }

    lastOpenQuestionsSettingPanelState.set(
      openQuestionsSettingPanelState.get()
    );
  }

  return (
    <div className="w-full h-full sm:w-fit sm:min-w-[800px] sm:h-fit sm:pt-10">
      <BasicBorder className="text-center">
        <div className="w-full">
          <div className="flex flex-row p-6">
            <div className="sm:pr-6 flex-grow w-[700px] max-w-[900px]">
              <QuestionSettings />
              <div className="flex pt-6 sm:py-6 flex-col sm:flex-row">
                <BasicBorder className="p-2 sm:basis-2/5">
                  <DateSettings />
                </BasicBorder>
                <div className="p-2" />
                <BasicBorder className="p-2 sm:basis-1/3 sm:flex-grow">
                  <PrintSettings />
                </BasicBorder>
              </div>
            </div>
          </div>
        </div>
        <SpreadPreview pages={pages} />
      </BasicBorder>
      <Footer />
    </div>
  );
}
