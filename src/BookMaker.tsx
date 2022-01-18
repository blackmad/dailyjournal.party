/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from "react";
import { BasicBorder } from "./components/BorderBox";
import PagePreview from "./ui/PagePreview";

function ControlPanelSection({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) {
  return (
    <div
      tabIndex={0}
      className="collapse w-96 border border-base-300 collapse-arrow"
    >
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
}

export default function BookMaker() {
  return (
    <div className="hero min-h-screen">
      <BasicBorder className="text-center hero-content">
        <div className="w-full">
          <div className="flex flex-row p-6">
            <div className="pr-6">
              <ControlPanelSection title="Layout Settings" key="layout" />
              <ControlPanelSection title="Date Settings" key="date" />
              <ControlPanelSection title="Question Settings" key="questions" />
              <ControlPanelSection title="Print Settings" key="printing" />
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
