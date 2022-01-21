/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { ControlPanelSection } from "./ControlPanelSection";
import { BookForm } from "./BookForm";
import { AppPages } from "../../bookConfig";

export function QuestionSettings() {
  return (
    <ControlPanelSection title="Questions" key="questions">
      <BookForm pageContents={AppPages} />
    </ControlPanelSection>
  );
}
