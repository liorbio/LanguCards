import * as React from "react";

const SvgXVector = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.5 14.5 1 1M14.5 1 1 14.5"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

export default SvgXVector;
