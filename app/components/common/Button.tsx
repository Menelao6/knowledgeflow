import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({
  variant = "primary",
  children,
  className,
  ...rest
}) => {
  const classes = clsx(
    "btn",
    {
      "btn-primary": variant === "primary",
      "btn-secondary": variant === "secondary",
      "btn-ghost": variant === "ghost",
    },
    className
  );

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
