import * as React from "react";

const SvgSketchpadVector = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m20.763 6-8.08 8.079L9 15l.921-3.684L18 3.237M20.763 6l2.052-2.052c.92-.92-1.842-3.684-2.763-2.763L18 3.237M20.763 6 18 3.237"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 11.778V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h7.222l2-2H5a5 5 0 0 0-5 5v12a5 5 0 0 0 5 5h12a5 5 0 0 0 5-5V9.778l-2 2Z"
      fill="#000"
    />
  </svg>
);

export default SvgSketchpadVector;
