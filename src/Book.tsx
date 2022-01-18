import React, { useEffect, useMemo } from "react";
import _ from "lodash";
import { DateTime, Interval } from "luxon";
import { createGlobalStyle } from "styled-components";
import { Downgraded, useState } from "@hookstate/core";

import { EmptyPage, Page, PageContent } from "./pages/Page";
import { DateContext } from "./providers/DateContext";
import {
  AppPage,
  AppPageConfig,
  printConfig,
  fullAppQuestionMapState,
} from "./bookConfig";
import BookMaker from "./components/BookMaker";
import { inPrintMode } from "./state/printMode";

export function BookPage<T extends string>({
  date,
  pageKey,
  pageContent,
}: {
  date: DateTime;
  pageKey: AppPage;
  pageContent: PageContent<T>;
}) {
  const dateContext = useMemo(() => {
    return { dt: date };
  }, [date]);

  const { title, component: PageContentComponent } = pageContent;
  const fullAppQuestionConfig = useState(fullAppQuestionMapState);
  const questionConfig = fullAppQuestionConfig.attach(Downgraded).get()[
    pageKey
  ];

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

function makeBookPages({ date }: { date: DateTime }) {
  return _.entries(AppPageConfig).flatMap(([pageContentKey, pageContent]) => {
    const { dateCheck } = pageContent;
    if (!dateCheck(date)) {
      return [];
    }

    return [
      <BookPage
        pageContent={pageContent as any}
        pageKey={pageContentKey as any}
        date={date}
        key={`${pageContent.title}-${date}`}
      />,
    ];
  });
}

function chunkPagesForPrinting<T>(pages: T[]) {
  return _.times(pages.length / 2).map((spreadIndex) => {
    const lowPage = pages[spreadIndex];
    const highPage = pages[pages.length - spreadIndex - 1];
    if (spreadIndex % 2 === 0) {
      return [highPage, lowPage];
    } else {
      return [lowPage, highPage];
    }
  });
}

export function Book() {
  const printConfigState = useState(printConfig);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const inPrintModeState = useState(inPrintMode);

  useEffect(() => {
    const beforeprintCb = () => {
      inPrintMode.set(true);
    };
    window.addEventListener("beforeprint", beforeprintCb);

    const afterprintCb = () => {
      inPrintMode.set(false);
    };
    window.addEventListener("afterprint", afterprintCb);

    return () => {
      window.removeEventListener("beforeprint", beforeprintCb);
      window.removeEventListener("afterprint", afterprintCb);
    };
  }, []);

  const startDate = DateTime.fromJSDate(new Date());
  const endDate = startDate.plus({ days: 7 });

  const interval = Interval.fromDateTimes(startDate, endDate).splitBy({
    days: 1,
  });

  const pages = interval.flatMap((date) => makeBookPages({ date: date.start }));

  if (pages.length % 4 !== 0) {
    _.times(4 - (pages.length % 4)).forEach((i) => {
      pages.push(<EmptyPage key={`empty-${i}`} />);
    });
  }

  const chunkedPages = chunkPagesForPrinting(pages);

  const pageSpreads = printConfigState.get().doubleSidedPrinting
    ? chunkedPages
    : pages;

  const GlobalStyle = createGlobalStyle`
  @media print {
    .page-spread {
      zoom: 99%;
      page-break-after: always;
      // page-break-inside: avoid;
    }

    .print-hidden {
      display: none !important;
    }

    .preview-hidden {
      display: block !important;
    }
  }

  .preview-hidden {
    display: none;
  }

  @page {
    margin: 0;
    size: ${printConfigState.get().pageWidth}${
    printConfigState.get().pageUnits
  } ${printConfigState.get().pageHeight}${printConfigState.get().pageUnits};
  }
`;

  return (
    <>
      <GlobalStyle />
      <div className="print-hidden">
        <BookMaker />
        {/* <BookForm pageContents={Object.values(AppPageConfig)} /> */}
        Print this double sided with <i>short edge</i> binding.
      </div>

      {inPrintModeState.get() && (
        <div className="content preview-hidden">
          {pageSpreads.map((pageSpread, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="page-spread flex" key={`spread-${i}`}>
              {pageSpread}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
