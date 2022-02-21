import React, { useEffect } from "react";
import _ from "lodash";
import { createGlobalStyle } from "styled-components";
import { Downgraded, useState } from "@hookstate/core";

import { EmptyPage } from "../bookPages/Page";
import {
  printConfig,
  fullAppQuestionMapState,
  PrintConfig,
  generatePages,
} from "../bookConfig";
import BookMaker from "../components/BookMaker";
import { inPrintMode } from "../state/printMode";
import { dateConfig } from "../state/dateConfig";
import BookPage from "../components/BookPage";

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

export function useGetAllPages(pageFilter?: string) {
  const dateConfigState = useState(dateConfig);
  const fullAppQuestionConfig = useState(fullAppQuestionMapState);

  const pageObjects = generatePages(dateConfigState.get());
  const pages = pageObjects
    .map((pageObject) => {
      const { pageKey } = pageObject;

      if (pageFilter && pageFilter !== pageKey) {
        return undefined;
      }

      const questionConfig = fullAppQuestionConfig.attach(Downgraded).get()[
        pageKey
      ];

      return (
        <BookPage
          {...pageObject}
          questionConfig={questionConfig || ({} as any)}
        />
      );
    })
    .filter((o) => !_.isUndefined(o));

  return pages;
}

function PageSpreads() {
  const printConfigState = useState(printConfig);

  useEffect(() => {
    window.print();
  }, []);

  const pages = useGetAllPages();

  if (pages.length % 4 !== 0) {
    _.times(4 - (pages.length % 4)).forEach((i) => {
      pages.push(<EmptyPage key={`empty-${i}`} />);
    });
  }

  const chunkedPages = chunkPagesForPrinting(pages);

  const pageSpreads = printConfigState.get().doubleSidedPrinting
    ? chunkedPages
    : pages;

  return (
    <div className="content preview-hidden">
      {pageSpreads.map((pageSpread, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="page-spread flex" key={`spread-${i}`}>
          {pageSpread}
        </div>
      ))}
    </div>
  );
}

const GlobalStyle = createGlobalStyle<PrintConfig>`
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
    size: ${(props) =>
      `${props.pageWidth}${props.pageUnits} ${props.pageHeight}${props.pageUnits}`};
  }
`;

export default function Make() {
  const printConfigState = useState(printConfig);
  const inPrintModeState = useState(inPrintMode);

  useEffect(() => {
    const afterprintCb = () => {
      inPrintMode.set(false);
    };
    window.addEventListener("afterprint", afterprintCb);

    return () => {
      window.removeEventListener("afterprint", afterprintCb);
    };
  }, []);

  return (
    <>
      <GlobalStyle {...printConfigState.get()} />
      <div className="print-hidden h-screen flex justify-center align-middle">
        <BookMaker />
      </div>

      {inPrintModeState.get() && <PageSpreads />}
    </>
  );
}
