import React from "react";
import styled, { ThemeProvider } from "styled-components";
import * as _ from "lodash";

import { Header } from "./Header";
import { theme } from "./theme";
import { DottedBox } from "./DottedBox";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 900px;
`;

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 1.2em 1.2em;
  flex-grow: 1;
`;

// function DottedBox({ className, title }: { className: string; title: string }) {
//   const { ref, dimensions } = useDimensions<HTMLDivElement>({});

//   return (
//     <div className={`${className} relative`} ref={ref}>
//       <BoxTitle>{title}</BoxTitle>
//       <BorderBox
//         style={{
//           backgroundImage: drawDots({ dimensions, theme }),
//           backgroundSize: "2000px 2000px",
//         }}
//       />
//     </div>
//   );
// }

// function RuledBox({ className, title }: { className: string; title: string }) {
//   const { ref, dimensions } = useDimensions<HTMLDivElement>({});

//   return (
//     <div className={`${className} relative`} ref={ref}>
//       <BoxTitle>{title}</BoxTitle>
//       <BorderBox
//         style={{
//           backgroundImage: drawLines({ dimensions, theme }),
//           backgroundSize: "2000px 2000px",
//         }}
//       />
//     </div>
//   );
// }

export function Page() {
  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
        <Header />
        <PageGrid>
          <DottedBox className="col-span-12" title="who is your daddy" />

          <DottedBox className="col-span-4" title="who is your daddy" />
          <DottedBox className="col-span-4" title="who is your daddy" />
          <DottedBox className="col-span-4" title="who is your daddy" />

          <DottedBox className="col-span-12" title="who is your daddy" />
        </PageGrid>
      </PageContainer>
    </ThemeProvider>
  );
}
