/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef } from "react";

import { useState } from "@hookstate/core";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

import { ControlPanelSection } from "./ControlPanelSection";
import { dateConfig } from "../../state/dateConfig";

import "react-datepicker/dist/react-datepicker.css";

function DateControl({
  title,
  dateString,
  onChange,
}: {
  title: string;
  dateString: string | undefined;
  onChange: (newDateString: string | undefined) => void;
}) {
  const dateValue = (
    dateString ? DateTime.fromISO(dateString) : DateTime.now()
  ).toJSDate();

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref) => (
    <button type="button" className="btn" onClick={onClick} ref={ref as any}>
      {value}
    </button>
  ));

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text w-full"> {title}</span>
        <DatePicker
          selected={dateValue}
          onChange={(date) => {
            const dt = date ? DateTime.fromJSDate(date) : undefined;
            onChange(dt?.toISODate());
          }}
          customInput={<ExampleCustomInput />}
        />
      </label>
    </div>
  );
}

export function DateSettings() {
  const dateConfigState = useState(dateConfig);

  return (
    <ControlPanelSection title="Date Settings" key="printing">
      <DateControl
        title="State Date"
        dateString={dateConfigState.get().startDate}
        onChange={(newDateString) =>
          dateConfigState.merge({ startDate: newDateString })
        }
      />
      <DateControl
        title="End Date"
        dateString={dateConfigState.get().endDate}
        onChange={(newDateString) =>
          dateConfigState.merge({ endDate: newDateString })
        }
      />
    </ControlPanelSection>
  );
}
