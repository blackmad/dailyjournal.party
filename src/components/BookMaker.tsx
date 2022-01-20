import React from "react";
import _ from "lodash";
import { useState } from "@hookstate/core";

import { BasicBorder } from "../book-components/BorderBox";
import { PrintSettings } from "./Settings/PrintSettings";
import { DateSettings } from "./Settings/DateSettings";
import { printConfig } from "../bookConfig";
import { convertUnits } from "../utils/convert";

export default function BookMaker({ pages }: { pages: JSX.Element[] }) {
  const pageIndex = useState(0);
  const printconfigState = useState(printConfig);
  const printconfigValue = printconfigState.get();

  const heightInPx = convertUnits(
    printconfigValue.pageHeight,
    printconfigValue.pageUnits,
    "px"
  );
  const maxHeight = 600;
  const zoomFactor = maxHeight / heightInPx;

  return (
    <div className="hero min-h-screen">
      <BasicBorder className="text-center hero-content">
        <div className="w-full">
          <div className="flex flex-row p-6">
            <div className="pr-6">
              {/* <ControlPanelSection title="Layout Settings" key="layout" /> */}
              {/* <ControlPanelSection title="Date Settings" key="date" /> */}
              {/* <ControlPanelSection title="Question Settings" key="questions" /> */}
              <DateSettings />
              <PrintSettings />
            </div>
            <div className="flex flex-col">
              <div
                style={{
                  zoom: zoomFactor,
                }}
              >
                {pages[pageIndex.get()]}
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
