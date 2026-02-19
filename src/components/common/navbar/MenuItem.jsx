"use client";

import styles from "./nav.module.css";
import { reykjavik } from "../../../lib/fonts";

export default function MenuItem({ index, title }) {
  return (
    <div className="pr-8 cursor-pointer select-none text-left menu-item">
      <h1 data-text={title}>
        <span
          className={`
            ${styles.menuSweep}
            ${reykjavik.variable}
            block
            uppercase
            font-semibold
            tracking-wide
            text-4xl md:text-5xl
            leading-[1.2]
          `}
        >
          {title}
        </span>
      </h1>
    </div>
  );
}
