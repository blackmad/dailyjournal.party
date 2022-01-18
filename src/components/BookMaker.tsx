import React from "react";
import _ from "lodash";

import { BasicBorder } from "../book-components/BorderBox";
import PagePreview from "./PagePreview";
import { PrintSettings } from "./Settings/PrintSettings";
import { DateSettings } from "./Settings/DateSettings";

export default function BookMaker() {
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
            <div>
              <PagePreview />
            </div>
          </div>
        </div>
      </BasicBorder>
    </div>
  );
}
