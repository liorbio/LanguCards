import * as React from "react";

const SvgMagnifVector = (props) => (
  <svg
    width={23}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17 9.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
      stroke="#000"
      strokeWidth={2.3}
    />
    <path
      stroke="#000"
      strokeWidth={2.5}
      strokeLinecap="round"
      d="M14.768 15 21 21.232"
    />
  </svg>
);

export default SvgMagnifVector;
