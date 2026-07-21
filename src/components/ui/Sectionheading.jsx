import React from "react";
import Reveal from "./Reveal";

const Sectionheading = ({ eyebrow, title, align = "left" }) => (
  <Reveal className={align === "center" ? "text-center" : "text-left"}>
    <p className="text-[12px] uppercase tracking-[0.25em] text-[var(--muted)] mb-3">
      {eyebrow}
    </p>
    <h2 className="font-serif italic font-medium text-[var(--text)] text-[2.25rem] md:text-[3rem] leading-tight">
      {title}
    </h2>
  </Reveal>
);

export default Sectionheading;