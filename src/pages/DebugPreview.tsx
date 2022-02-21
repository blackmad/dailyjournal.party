import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllPages } from "./Book";

export default function DebugPreview() {
  const { page } = useParams();
  const pages = useGetAllPages(page);

  return (
    <>
      {pages.map((p) => (
        <div>{p}</div>
      ))}
    </>
  );
}
