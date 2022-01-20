/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { ControlPanelSection } from "./ControlPanelSection";
import { AppPageConfig } from "../../bookConfig";
import { BookForm } from "./BookForm";

export function QuestionSettings() {
  return (
    <ControlPanelSection title="Questions" key="questions">
      <BookForm pageContents={Object.values(AppPageConfig)} />
    </ControlPanelSection>
  );
}
