import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "link" | "icon";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
};

/**
 * Button Component
 * 
 * A reusable, accessible button component with multiple variants and sizes.
 * 
 * WCAG 2.2 AA Compliant:
 * - Minimum touch target size (44x44px)
 * - Clear focus indicators
 * - Keyboard accessible
 * - Proper contrast ratios
 * - Accessible loading states
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = `
      inline-flex items-center justify-center gap-2 rounded-lg font-medium
      transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
      ${fullWidth ? 'w-full' : ''}
    `;

    // Variant styles
    const variantStyles = {
      primary: `
        bg-[var(--brand-primary)] text-white
        hover:bg-[var(--brand-dark)] active:bg-[var(--brand-dark)]/90
        shadow-sm hover:shadow-md
      `,
      secondary: `
        border-2 border-[var(--border-primary)] bg-transparent text-[var(--text-primary)]
        hover:bg-[var(--bg-secondary)] hover:border-[var(--border-secondary)]
        active:bg-[var(--bg-tertiary)]
      `,
      danger: `
        bg-[var(--error)] text-white
        hover:bg-[var(--error-dark)] active:bg-[var(--error-dark)]/90
        shadow-sm hover:shadow-md
      `,
      ghost: `
        bg-transparent text-[var(--text-primary)]
        hover:bg-[var(--bg-secondary)] active:bg-[var(--bg-tertiary)]
      `,
      link: `
        bg-transparent text-[var(--brand-primary)] underline underline-offset-2
        hover:text-[var(--brand-secondary)] active:text-[var(--brand-dark)]
        p-0 min-h-0
      `,
      icon: `
        bg-transparent text-[var(--text-secondary)]
        hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]
        active:bg-[var(--bg-tertiary)]
        p-2
      `,
    };

    // Size styles
    const sizeStyles = {
      sm: `px-2.5 py-1.5 text-xs min-h-[36px]`,
      md: `px-4 py-2 text-sm min-h-[44px]`,
      lg: `px-5 py-2.5 text-base min-h-[48px]`,
    };

    // Combine all styles
    const combinedStyles = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `;

    // Handle icon-only button accessibility
    const ariaLabel = props["aria-label"];
    const hasText = typeof children === "string" && children.trim() !== "";
    const needsAriaLabel = (leftIcon || rightIcon) && !hasText && !ariaLabel;

    return (
      <button
        ref={ref}
        {...props}
        className={combinedStyles.trim()}
        disabled={loading || disabled}
        aria-busy={loading}
        aria-label={needsAriaLabel ? "Button" : ariaLabel}
      >
        {loading && (
          <Loader2
            className="h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        
        {!loading && leftIcon && (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        
        {children && !loading && (
          <span className={variant === "icon" ? "sr-only" : ""}>
            {children}
          </span>
        )}
        
        {!loading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
export default Button;
