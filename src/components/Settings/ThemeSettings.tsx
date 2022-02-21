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

export function getThemeExample(key: string, value: DefaultTheme) {
  return (
    <div
      style={{
        background: value.colors.textBackgroundColor,
        fontFamily: value.fontFamily,
        color: value.colors.textColor,
        border: "1px solid",
        borderColor: value.colors.borderColor,
        padding: 4,
        margin: 4,
        borderRadius: value.borderRadius,
      }}
    >
      {key}
    </div>
  );
}

export function ThemeSettings() {
  const themeConfigState = useState(themeConfig).attach(Downgraded);

  const options: Array<ThemeOption> = _.map(daisyUIThemes, (value, key) => {
    return {
      name: key,
      key,
      option: getThemeExample(key, value),
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
