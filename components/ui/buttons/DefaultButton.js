"use client";

import { Button } from "@material-tailwind/react";

const DefaultButton = ({
  variant,
  label,
  icon,
  style,
  color,
  onClick,
  disabled,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      className={`items-center gap-3 py-3 font-grotesque capitalize flex justify-center ${
        style ? style : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      placeholder={label}
    >
      {label}
      {icon && icon}
    </Button>
  );
};

export default DefaultButton;
