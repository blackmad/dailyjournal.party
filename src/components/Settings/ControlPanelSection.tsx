import { useState } from "@hookstate/core";
import React from "react";

export function ControlPanelSection({
  title,
  children,
  open,
  onChange,
}: React.PropsWithChildren<{
  title: string;
  open?: boolean;
  onChange?: (state: boolean) => void;
}>) {
  const isOpen = useState(Boolean(open));
  return (
    <div
      className={`collapse w-full border rounded-box border-base-300 collapse-arrow ${
        isOpen.get() ? "overflow-visible" : ""
      }`}
      style={{
        minWidth: "24rem",
      }}
    >
      <input
        type="checkbox"
        checked={Boolean(isOpen.get())}
        onChange={(e) => {
          isOpen.set(e.target.checked);
          onChange?.(e.target.checked);
        }}
      />
      <div className="collapse-title text-left text-xl font-medium">
        {title}
      </div>
      <div
        className={`collapse-content ${isOpen.get() ? "overflow-visible" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
