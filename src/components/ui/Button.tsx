import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ["variant", "size", "class"]);

  const variant = local.variant ?? "primary";
  const size = local.size ?? "md";
  const className = local.class;

  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-blue-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledClass = rest.disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const classes = [
    base,
    variants[variant],
    sizes[size],
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button class={classes} {...rest}>
      {props.children}
    </button>
  );
}
