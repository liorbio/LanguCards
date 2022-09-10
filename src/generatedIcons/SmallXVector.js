import * as React from "react";

const SvgSmallXVector = (props) => (
  <svg
    width={11}
    height={11}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.5 10.5 1 1M10.5 1 1 10.5"
      stroke="#000"
      strokeLinecap="round"
    />
  </svg>
);

export default SvgSmallXVector;
