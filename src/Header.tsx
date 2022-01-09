import React from "react";
import { DateTime } from "luxon";

import styled from "styled-components";

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

export function Header(props: { title: string; date: DateTime }) {
  const { date, title } = props;

  const quarter = date.toFormat("q");
  const year = date.toFormat("yyyy");
  const mon = date.toFormat("MMM");
  const week = date.toFormat("W");
  const daydate = date.toFormat("ccc, d");

  return (
    <HeaderContainer>
      <HeaderComponents>
        <HeaderComponent>{year}</HeaderComponent>
        <HeaderComponent>Q{quarter}</HeaderComponent>
        <HeaderComponent>{mon}</HeaderComponent>
        <HeaderComponent>Week {week}</HeaderComponent>
        <HeaderComponent>{daydate}</HeaderComponent>
        <HeaderComponentLeft>{title}</HeaderComponentLeft>
      </HeaderComponents>
    </HeaderContainer>
  );
}
