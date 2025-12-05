import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

export type TextareaVariant = "primary" | "secondary" | "ghost";
export type TextareaSize = "sm" | "md" | "lg";

export type TextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: TextareaVariant;
  size?: TextareaSize;
};

export default function Textarea(props: TextareaProps) {
  const [local, rest] = splitProps(props, ["variant", "size", "class"]);

  const variant = local.variant ?? "primary";
  const size = local.size ?? "md";
  const className = local.class;

  const base =
    "w-full rounded-md border transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<TextareaVariant, string> = {
    primary:
      "bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    secondary:
      "bg-gray-50 text-gray-900 border-gray-200 focus:ring-gray-300 focus:border-gray-300",
    ghost: "bg-transparent text-gray-700 border-gray-200 focus:ring-blue-300",
  };

  const sizes: Record<TextareaSize, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
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
    <textarea class={classes} {...rest}>
      {props.children}
    </textarea>
  );
}
