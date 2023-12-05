"use client";

const Button = ({ title, secondary, prependIcon, ...buttonProps }) => (
  <button
    className={`rounded-md border-2 border-grey:700 h-10${
      secondary ? "bg-white text-black" : " bg-black text-white"
    }`}
    {...buttonProps}
  >
    {prependIcon && <prependIcon />} {title}
  </button>
);

export default Button;
