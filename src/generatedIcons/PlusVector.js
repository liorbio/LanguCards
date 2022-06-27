import * as React from "react";

const SvgPlusVector = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      d="M1 8h14M8 15V1"
    />
  </svg>
);

export default SvgPlusVector;
