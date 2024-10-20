import React from "react";

const Button = ({
  id,
  name,
  width,
  color,
  rounded = "rounded-lg",
  icon = null,
  icon2 = null,
  onClick = null,
  padding = null,
  justify = "justify-center",
}) => (
  <button
    id={id}
    className={`${color} text-white ${rounded} py-3 ${width} flex gap-3 items-center ${justify} ${padding}`}
    onClick={onClick}
  >
    {icon && <span>{icon}</span>}
    <span className="font-medium">{name}</span>
    {icon2 && <span>{icon2}</span>}
  </button>
);

export default Button;
