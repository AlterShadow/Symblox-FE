import React from "react";

function Loader() {
  return (
    <div>
      <svg
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        className="sc-cuOiQm fCrhKh"
      >
        <defs>
          <linearGradient
            x1="8.042%"
            y1="0%"
            x2="65.682%"
            y2="23.865%"
            id="loader_svg__a"
          >
            <stop stop-color="#42DDFF" stop-opacity="0" offset="0%"></stop>
            <stop
              stop-color="#42DDFF"
              stop-opacity="0.631"
              offset="63.146%"
            ></stop>
            <stop stop-color="#42DDFF" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g transform="translate(1 1)" fill="none" fill-rule="evenodd">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            stroke="url(#loader_svg__a)"
            stroke-width="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
          <circle fill="#42DDFF" cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
      </svg>
    </div>
  );
}

export default Loader;
