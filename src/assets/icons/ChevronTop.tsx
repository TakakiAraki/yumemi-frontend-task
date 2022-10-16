import * as React from "react";

const SvgComponent = (props: any) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(180)"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.678 7.987a1 1 0 0 1 1.41-.109l9.412 8.067 9.412-8.067a1 1 0 0 1 1.301 1.519l-10.062 8.625a1 1 0 0 1-1.302 0L.787 9.397a1 1 0 0 1-.109-1.41Z"
    />
  </svg>
);

export default SvgComponent;
