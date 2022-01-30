import _ from "lodash";
import React from "react";

import { useState } from "@hookstate/core";

import { dateConfig, getTimeRange } from "../state/dateConfig";
import { PageContent } from "./Page";

export default function CoverComponent({
  isBackCover,
}: {
  isBackCover?: boolean;
} = {}) {
  const dateConfigState = useState(dateConfig);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { startDate, endDate } = getTimeRange(dateConfigState.get());

  return (
    <div
      className="flex flex-col h-full"
      style={{
        transform: isBackCover ? "scaleX(-1)" : "",
      }}
    >
      <div className="flex-grow">
        <svg viewBox="0 0 56 18" style={{ width: "60%" }}>
          <text x="0" y="15">
            daily
          </text>
        </svg>
        <svg viewBox="0 0 56 18" style={{ width: "60%" }}>
          <text x="0" y="15">
            journal
          </text>
        </svg>
        <svg viewBox="0 0 56 18" style={{ width: "60%" }}>
          <text x="0" y="15">
            party
          </text>
        </svg>
      </div>

      <div>
        <svg viewBox="0 0 56 18" style={{ width: "100%" }}>
          <text x="0" y="15">
            {startDate.monthShort} {startDate.day}
          </text>
        </svg>

        <div>
          <svg viewBox="0 0 56 18" style={{ width: "100%" }}>
            <text x="0" y="15">
              {endDate.monthShort} {endDate.day}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export const FrontCover: PageContent<never> = {
  title: "FrontCover",
  dateCheck: () => true,
  component: () => <CoverComponent isBackCover={false} />,
  defaultQuestionConfig: {},
  key: "FrontCover",
} as const;

export const BackCover: PageContent<never> = {
  title: "BackCover",
  dateCheck: () => true,
  component: () => <CoverComponent isBackCover />,
  defaultQuestionConfig: {},
  key: "BackCover",
} as const;

export const EmptyPage: PageContent<never> = {
  title: "EmptyPage",
  dateCheck: () => true,
  component: () => <div />,
  defaultQuestionConfig: {},
  key: "EmptyPage",
} as const;
