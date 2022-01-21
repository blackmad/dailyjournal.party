/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef, useCallback } from "react";

import { useState } from "@hookstate/core";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

import { dateConfig, getTimeRange } from "../../state/dateConfig";

import "react-datepicker/dist/react-datepicker.css";

function DateControl({
  title,
  dateTime,
  onChange,
}: {
  title: string;
  dateTime: DateTime;
  onChange: (newDateString: string | undefined) => void;
}) {
  const dateValue = dateTime.toJSDate();

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref) => (
    <button
      type="button"
      className="btn btn-outline"
      onClick={onClick}
      ref={ref as any}
    >
      {value}
    </button>
  ));

  const wrappedOnChange = useCallback(
    (date) => {
      const newDt = date ? DateTime.fromJSDate(date) : undefined;
      onChange(newDt?.toISODate());
    },
    [onChange]
  );

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text w-full"> {title}</span>
        <DatePicker
          selected={dateValue}
          onChange={wrappedOnChange}
          customInput={<ExampleCustomInput />}
        />
      </label>
    </div>
  );
}

export function DateSettings() {
  const dateConfigState = useState(dateConfig);
  const { startDate, endDate } = getTimeRange(dateConfigState.get());

  const startCb = useCallback(
    (newDateString) => dateConfig.merge({ startDate: newDateString }),
    []
  );

  const endCb = useCallback(
    (newDateString) => dateConfig.merge({ endDate: newDateString }),
    []
  );

  return (
    <div>
      <DateControl title="State Date" dateTime={startDate} onChange={startCb} />
      <DateControl title="End Date" dateTime={endDate} onChange={endCb} />
    </div>
  );
}
