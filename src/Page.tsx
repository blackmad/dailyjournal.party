import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Header } from "./Header";

const theme = {
  colors: {
    backgroundColor: "#FFFDF9",
    textColor: "#06B49A",
    dotColor: "#06B49A",
    borderColor: "#AFDBD2",
  },
};

const BasicBorder = styled.div`
  border: solid 1px ${(props) => props.theme.colors.borderColor};
  border-radius: 10px;
  background: ${(props) => props.theme.colors.backgroundColor};
  overflow: hidden;
`;

const BorderBox = styled(BasicBorder)`
  width: 100%;
  height: 100%;
`;

const BoxTitle = styled(BasicBorder)`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, -1em);
  padding: 0.2em;
  white-space: nowrap;
`;

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 1.2em;
`;

const WithDots = styled.div`
  background: linear-gradient(
        90deg,
        ${(props) => props.theme.colors.backgroundColor} 20px,
        transparent 1%
      )
      center,
    linear-gradient(
        ${(props) => props.theme.colors.backgroundColor} 20px,
        transparent 1%
      )
      center,
    ${(props) => props.theme.colors.dotColor};
  background-size: 22px 22px;

  width: calc(100% - 20px);
  height: calc(100% - 20px);
  margin: 10px;
`;

const WithLines = styled.div`
  background-image: linear-gradient(
    0deg,
    ${(props) => props.theme.colors.dotColor} 2.38%,
    ${(props) => props.theme.colors.backgroundColor} 2.38%,
    ${(props) => props.theme.colors.backgroundColor} 50%,
    ${(props) => props.theme.colors.dotColor} 50%,
    ${(props) => props.theme.colors.dotColor} 52.38%,
    ${(props) => props.theme.colors.backgroundColor} 52.38%,
    ${(props) => props.theme.colors.backgroundColor} 100%
  );
  background-size: 42px 42px;

  width: 100%;
  height: 100%;
  // margin: 10px;
`;

function DottedBox({ className, title }: { className: string; title: string }) {
  return (
    <div className={`${className} relative`}>
      <BoxTitle>{title}</BoxTitle>
      <BorderBox>
        <WithDots />
      </BorderBox>
    </div>
  );
}

function RuledBox({ className, title }: { className: string; title: string }) {
  return (
    <div className={`${className} relative`}>
      <BoxTitle>{title}</BoxTitle>
      <BorderBox>
        <WithLines />
      </BorderBox>
    </div>
  );
}

export function Page() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <PageGrid>
        <RuledBox className="col-span-12" title="who is your daddy" />

        <RuledBox className="col-span-4" title="who is your daddy" />
        <RuledBox className="col-span-4" title="who is your daddy" />
        <RuledBox className="col-span-4" title="who is your daddy" />

        <DottedBox className="col-span-12" title="who is your daddy" />
      </PageGrid>
    </ThemeProvider>
  );
}
