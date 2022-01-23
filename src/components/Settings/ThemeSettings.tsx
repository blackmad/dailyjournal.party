/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from "lodash";
import { Downgraded, useState } from "@hookstate/core";
import React, { useCallback } from "react";
import { DefaultTheme } from "styled-components";

import daisyUIThemes from "../../daisyUIthemes";
import Dropdown, { BaseOption } from "../Dropdown";

import { themeConfig } from "../../state/themeConfig";

type ThemeOption = BaseOption<{
  value: DefaultTheme;
}>;

export function ThemeSettings() {
  const themeConfigState = useState(themeConfig).attach(Downgraded);

  const options: Array<ThemeOption> = _.map(daisyUIThemes, (value, key) => {
    return {
      name: key,
      key,
      option: <div>{key}</div>,
      value,
      selected: _.isEqual(value, themeConfigState.get()),
    };
  });

  const onClick = useCallback((option: ThemeOption) => {
    themeConfig.set(option.value);
  }, []);

  return (
    <div>
      Theme: <Dropdown options={options} onClick={onClick} />
    </div>
  );
}
