"use client";

import styles from "./nav.module.css";
import { reykjavik } from "../../../lib/fonts";

export default function MenuItem({ index, title }) {
  return (
    <div className="px-8 cursor-pointer select-none">
      <h1 data-text={title}>
        <span
          className={`
            ${styles.menuSweep}
            ${reykjavik.variable}
            block
            uppercase
            font-semibold
            tracking-wide
            text-4xl md:text-7xl
            leading-[1.5]
          `}
        >
          {title}
        </span>
      </h1>
    </div>
  );
}
