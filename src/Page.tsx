import React from "react";
import tw from "tailwind-styled-components";

const BorderBox = tw.div`
    border-2
    rounded
    w-full
    h-full
`;

const FullRow = tw.div`
col-span-12
`;

export function Page() {
  return (
    <div className="grid grid-cols-12 grid-rows-6 grid-flow-row-dense ">
      <FullRow>
        <RuledBox />
      </FullRow>
    </div>
  );
}

function RuledBox() {
  return <BorderBox></BorderBox>;
}
