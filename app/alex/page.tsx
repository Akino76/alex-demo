"use client";

import { useState } from "react";
import Link from "next/link";

export default function AlexPage() {
  const [showStop, setShowStop] = useState(false);

  return (
    <div className="alex-home">
      <Link href="/" className="alex-back" aria-label="Back to desktop">
        ← Desktop
      </Link>
      <main className="alex-content">
        <h1 className="alex-logo" aria-label="Alex">
          <span className="alex-a">A</span>
          <span className="alex-l">l</span>
          <span className="alex-e">e</span>
          <span className="alex-x">x</span>
        </h1>

        <form
          className="alex-search"
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <input
            className="alex-input"
            type="text"
            aria-label="Search"
            onChange={(e) => setShowStop(e.currentTarget.value.length > 0)}
          />
        </form>

        <div className="alex-buttons" role="group" aria-label="Search buttons">
          <button className="alex-btn" type="button">
            Google Search
          </button>
          <button className="alex-btn" type="button">
            I'm Feeling Lucky
          </button>
        </div>

        {showStop && (
          <div className="alex-overlay" role="dialog" aria-modal="true">
            <div className="alex-overlay-content">please stop</div>
          </div>
        )}
      </main>
    </div>
  );
}
