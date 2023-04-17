import Link from "next/link";
import { useState } from "react";

export default function Dash({ children }) {
  return (
    <>
      <section className="body-font ">
        <div className="w-full h-auto ">{children}</div>
      </section>
    </>
  );
}
