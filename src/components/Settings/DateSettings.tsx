/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef } from "react";

import { useState } from "@hookstate/core";
import DatePicker from "react-datepicker";

import { ControlPanelSection } from "./ControlPanelSection";
import { dateConfig } from "../../state/dateConfig";

import "react-datepicker/dist/react-datepicker.css";

export function DateSettings() {
  const dateConfigState = useState(dateConfig);

  const startDate = new Date(
    dateConfigState.get().startDate || new Date().toISOString().substring(0, 10)
  );

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref) => (
    <button type="button" className="btn" onClick={onClick} ref={ref as any}>
      {value}
    </button>
  ));

  return (
    <ControlPanelSection title="Date Settings" key="printing">
      <DatePicker
        selected={startDate}
        onChange={(date) =>
          dateConfigState.merge({
            startDate: date?.toISOString().substring(0, 10),
          })
        }
        customInput={<ExampleCustomInput />}
      />
    </ControlPanelSection>
  );
}
