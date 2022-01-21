/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import stringify from "json-stable-stringify";
import { useState } from "@hookstate/core";
import { PrintConfig, printConfig } from "../../bookConfig";

function PageSizeSetting({
  value,
  name,
}: {
  value: PrintConfig;
  name: string;
}) {
  return <option value={stringify(value)}>{name}</option>;
}

export function PrintSettings() {
  const printconfigState = useState(printConfig);

  return (
    <div>
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
          value={stringify(printconfigState.get())}
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
    </div>
  );
}
