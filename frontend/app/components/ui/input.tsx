import { forwardRef } from "react";

type InputVariant = "default" | "error" | "success";
type InputSize = "sm" | "md" | "lg";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: InputVariant;
  size?: InputSize;
  helperText?: string;
  error?: string;
  success?: string;
  required?: boolean;
  fullWidth?: boolean;
};

/**
 * Input Component
 * 
 * A reusable, accessible input component with label, validation states, and helper text.
 * 
 * WCAG 2.2 AA Compliant:
 * - Proper label associations
 * - Clear error messages
 * - Focus indicators
 * - Keyboard accessible
 * - Sufficient contrast
 * - Touch target sizing
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      variant = "default",
      size = "md",
      helperText,
      error,
      success,
      required = false,
      fullWidth = true,
      className = "",
      id,
      type = "text",
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success);
    const showHelper = !hasError && !hasSuccess && helperText;

    // Size styles
    const sizeStyles = {
      sm: `px-3 py-2 text-sm min-h-[36px]`,
      md: `px-3 py-2.5 text-base min-h-[44px]`,
      lg: `px-4 py-3 text-lg min-h-[48px]`,
    };

    // Variant border colors
    const getBorderColor = () => {
      if (hasError) return "var(--error)";
      if (hasSuccess) return "var(--success)";
      return "var(--border-primary)";
    };

    const getFocusBorderColor = () => {
      if (hasError) return "var(--error)";
      if (hasSuccess) return "var(--success)";
      return "var(--brand-primary)";
    };

    const getFocusRingColor = () => {
      if (hasError) return "var(--error)";
      if (hasSuccess) return "var(--success)";
      return "var(--brand-primary)";
    };

    // Container styles
    const containerStyles = `
      flex flex-col gap-1.5
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;

    // Input styles
    const inputStyles = `
      rounded-lg border bg-[var(--bg-elevated)] px-3 py-2.5
      text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
      shadow-sm outline-none transition-all duration-200
      border-[${getBorderColor()}]
      focus:border-[${getFocusBorderColor()}] focus:ring-2 focus:ring-[${getFocusRingColor()}]/20
      ${hasError ? 'border-[var(--error)]' : hasSuccess ? 'border-[var(--success)]' : 'border-[var(--border-primary)]'}
      ${sizeStyles[size as InputSize]}
      ${disabled ? 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] cursor-not-allowed' : ''}
    `;

    return (
      <div className={containerStyles}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--text-primary)]"
          >
            {label}
            {required && (
              <span className="ml-1 text-[var(--error)]" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={inputId}
          type={type}
          {...props}
          className={inputStyles.trim()}
          aria-invalid={hasError}
          aria-errormessage={hasError ? `${inputId}-error` : undefined}
          aria-describedby={showHelper ? `${inputId}-helper` : hasError ? `${inputId}-error` : undefined}
          required={required}
          disabled={disabled}
        />

        {/* Helper text */}
        {showHelper && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-[var(--text-tertiary)]"
          >
            {helperText}
          </p>
        )}

        {/* Success message */}
        {hasSuccess && (
          <p
            id={`${inputId}-success`}
            className="text-sm text-[var(--success)]"
            role="status"
          >
            {success}
          </p>
        )}

        {/* Error message */}
        {hasError && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-[var(--error)]"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps, InputVariant, InputSize };
export default Input;
