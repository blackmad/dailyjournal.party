import React from "react";

export function Separator() {
  return <div>·</div>;
}

export function Footer() {
  return (
    <div className="py-4 flex justify-evenly w-full">
      <div>
        a thing by <a href="http://blackmad.com">blackmad</a>
      </div>
      <Separator />
      {/* <div>
        inspired by <a href="https://dailygreatness.co/">dailygreatness</a>,{" "}
        <a href="https://monkmanual.com/">monk manual</a>,{" "}
        <a href="http://www.artoflifecrafting.com/welcome/">
          art of lifecrafting
        </a>
      </div>
      <Separator /> */}
      <div>
        source on{" "}
        <a href="https://github.com/blackmad/dailyjournal.party">github</a>
      </div>
    </div>
  );
}
