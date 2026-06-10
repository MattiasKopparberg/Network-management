import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white border-blue-600",

    secondary:
      "bg-gray-200 hover:bg-gray-300 text-black border-gray-300",

    danger:
      "bg-red-600 hover:bg-red-700 text-white border-red-600",
  };

  return (
    <button
      className={`
        px-4 py-2
        rounded-lg
        border
        font-medium
        transition
        duration-200
        cursor-pointer
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}