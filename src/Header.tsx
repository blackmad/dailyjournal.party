import React from "react";

import styled from "styled-components";
import { DateContext } from "./providers/DateContext";

const HeaderContainer = styled.div`
  border-bottom: solid 3px ${(props) => props.theme.colors.borderColor};
  border-right: solid 3px ${(props) => props.theme.colors.borderColor};
  border-left: solid 3px ${(props) => props.theme.colors.borderColor};
  box-sizing: border-box;
  width: 100%;
`;

const HeaderComponents = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderComponent = styled.div`
  padding: 0.4em 0.4em 0.1em;
  font-size: x-large;
  font-weight: 400;
  border-left: solid 1px ${(props) => props.theme.colors.borderColor};
`;

const HeaderComponentLeft = styled(HeaderComponent)`
  border-left: unset;
  flex-grow: 1;
  justify-content: end;
  text-align: end;
`;

export function Header(props: {
  title: string;
  omitDay?: boolean;
  overrideDay?: string;
  omitWeek?: boolean;
  overrideWeek?: string;
}) {
  const { title, omitDay, overrideDay, omitWeek, overrideWeek } = props;
  const { dt } = React.useContext(DateContext);

  // const quarter = dt.toFormat("q");
  const year = dt.toFormat("yyyy");
  const mon = dt.toFormat("MMM");
  const week = dt.toFormat("W");
  const daydate = dt.toFormat("ccc, d");

  return (
    <HeaderContainer>
      <HeaderComponents>
        <HeaderComponent style={{ borderLeft: "unset" }}>
          {year}
        </HeaderComponent>
        {/* <HeaderComponent>Q{quarter}</HeaderComponent> */}
        <HeaderComponent>{mon}</HeaderComponent>
        {!omitWeek && (
          <HeaderComponent>{overrideWeek || `Week ${week}`}</HeaderComponent>
        )}
        {!omitDay && (
          <HeaderComponent>{overrideDay || daydate}</HeaderComponent>
        )}
        <HeaderComponentLeft>{title}</HeaderComponentLeft>
      </HeaderComponents>
    </HeaderContainer>
  );
}
