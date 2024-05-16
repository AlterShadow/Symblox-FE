import React from "react";

function NextBack() {
  return (
    <div className="flex items-center justify-between w-full pt-10 md:pb-0 pb-10">
      <div className="flex items-center gap-5">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          className="text-white text-opacity-40 text-[13px]"
        >
          <path
            d="M13.89 2.58 12.703 1.4 6.11 8l6.6 6.6 1.18-1.18L8.47 8l5.42-5.42zM2.667 1.338l1.673-.005L4.335 14.5H2.667V1.339z"
            fill="currentColor"
          ></path>
        </svg>
        <svg
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          className="text-white text-opacity-40 text-[13px]"
        >
          <path
            d="M7.89 1.58 6.703.4.11 7l6.6 6.6 1.18-1.18L2.47 7l5.42-5.42z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <p className="text-white text-opacity-40 text-[13px]">Page 1 of 0</p>

      <div className="flex items-center gap-5">
        <svg
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          className="text-white text-opacity-40 text-[13px]"
        >
          <path
            d="m.11 12.42 1.18 1.18L7.89 7 1.29.4.11 1.58 5.53 7 .11 12.42z"
            fill="currentColor"
          ></path>
        </svg>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          className="text-white text-opacity-40 text-[13px]"
        >
          <path
            d="M2.11 2.58 3.297 1.4 9.89 8l-6.6 6.6-1.18-1.18L7.53 8 2.11 2.58zm11.223-1.242-1.673-.005.005 13.166h1.668V1.339z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default NextBack;
