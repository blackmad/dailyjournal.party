/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState } from "@hookstate/core";
import _ from "lodash";
import React from "react";
import { PrintConfig, printConfig } from "./bookConfig";
import { BasicBorder } from "./components/BorderBox";
import PagePreview from "./ui/PagePreview";

function ControlPanelSection({
  title,
  children,
  open,
}: React.PropsWithChildren<{ title: string; open?: boolean }>) {
  return (
    <div className="collapse w-96 border rounded-box border-base-300 collapse-arrow">
      <input type="checkbox" defaultChecked={Boolean(open)} />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
}

function PageSizeSetting({
  value,
  name,
}: {
  value: PrintConfig;
  name: string;
}) {
  return <option value={JSON.stringify(value)}>{name}</option>;
}

function PrintSettings() {
  const printconfigState = useState(printConfig);

  return (
    <ControlPanelSection title="Print Settings" key="printing" open>
      {/* <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text">Prepare for double-sided printing</span>
          <input
            type="checkbox"
            checked={Boolean(printconfigState.get().doubleSidedPrinting)}
            className="checkbox"
            onChange={(e) => {
              printconfig.merge({
                doubleSidedPrinting: e.target.checked,
              });
            }}
          />
        </label>
      </div> */}

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Page Size</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={JSON.stringify(printconfigState.get())}
          onChange={(e) => {
            printConfig.merge(JSON.parse(e.target.value));
          }}
        >
          <PageSizeSetting
            value={{
              pageWidth: 11,
              pageHeight: 8.5,
              pageUnits: "in",
              doubleSidedPrinting: true,
            }}
            name="Letter (Landscape, Booklet)"
          />
          <PageSizeSetting
            value={{
              pageWidth: 8.5,
              pageHeight: 11,
              pageUnits: "in",
              doubleSidedPrinting: false,
            }}
            name="Letter (Portrait)"
          />
          <PageSizeSetting
            value={{
              pageWidth: 297,
              pageHeight: 210,
              pageUnits: "mm",
              doubleSidedPrinting: true,
            }}
            name="A4 (Landscape, Booklet)"
          />
          <PageSizeSetting
            value={{
              pageWidth: 210,
              pageHeight: 297,
              pageUnits: "mm",
              doubleSidedPrinting: false,
            }}
            name="A4 (Portrait)"
          />

          <PageSizeSetting
            value={{
              pageWidth: 6,
              pageHeight: 9,
              pageUnits: "in",
              doubleSidedPrinting: false,
            }}
            name={'6x9" (Portrait)'}
          />
        </select>
      </div>

      {printconfigState.get().doubleSidedPrinting && (
        <div className="pt-4">
          Make sure to select <i>Short-Edge binding</i> in the print dialog
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button type="button" className="btn" onClick={() => window.print()}>
          Print
        </button>
      </div>
    </ControlPanelSection>
  );
}

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
