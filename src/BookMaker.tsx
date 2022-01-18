/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from "react";
import { BasicBorder } from "./components/BorderBox";
import PagePreview from "./ui/PagePreview";

function ControlPanelSection({
  title,
  children,
  open,
}: React.PropsWithChildren<{ title: string; open?: boolean }>) {
  return (
    <div className="collapse w-96 border rounded-box border-base-300 collapse-arrow">
      <input type="checkbox" checked={Boolean(open)} />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">
        <p>{children}</p>
      </div>
    </div>
  );
}

function PrintSettings() {
  return (
    <ControlPanelSection title="Print Settings" key="printing" open>
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text">Prepare for double-sided printing</span>
          <input type="checkbox" checked={false} className="checkbox" />
        </label>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Page Size</span>
        </label>
        <select className="select select-bordered w-full">
          <option>Letter</option>
          <option>A4</option>
        </select>
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
