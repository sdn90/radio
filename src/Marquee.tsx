import * as React from "react";
import "./Marquee.css";

export default function Marquee(props: { children: React.ReactNode }) {
  return (
    <div className="marquee">
      <div className="marquee-content">{props.children}</div>
    </div>
  );
}
