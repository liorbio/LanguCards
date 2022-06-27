import * as React from "react";

const SvgCircledPlus = (props) => (
  <svg
    width={27}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.188 1c-16.5 0-16 24 0 24s15.5-24 0-24Z"
      stroke="#848484"
      strokeWidth={2}
    />
    <path
      d="M11.976 7v4.941H7v2.118h4.976V19h2.341v-4.941H19V11.94h-4.682V7h-2.342Z"
      fill="#848484"
    />
  </svg>
);

export default SvgCircledPlus;
