import { forwardRef } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
  dismissible?: boolean;
};

/**
 * Alert Component
 * 
 * A component for displaying status messages and alerts.
 * 
 * WCAG 2.2 AA Compliant:
 * - Proper role attribute
 * - Accessible icons with labels
 * - Sufficient contrast
 * - Keyboard dismissible
 * - Focus management
 * 
 * @example
 * ```tsx
 * <Alert variant="success">
 *   Operation completed successfully!
 * </Alert>
 * 
 * <Alert
 *   variant="error"
 *   title="Error"
 *   dismissible
 *   onClose={handleClose}
 * >
 *   Something went wrong.
 * </Alert>
 * ```
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "info",
      title,
      onClose,
      dismissible = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    // Variant configurations using CSS variables
    const variantConfig = {
      info: {
        icon: <Info className="h-5 w-5" />,
        iconColor: "text-[var(--brand-primary)]",
        bgColor: "bg-[var(--brand-light)]/20",
        borderColor: "border-[var(--brand-light)]",
        textColor: "text-[var(--brand-dark)]",
      },
      success: {
        icon: <CheckCircle className="h-5 w-5" />,
        iconColor: "text-[var(--success)]",
        bgColor: "bg-[var(--success-light)]/20",
        borderColor: "border-[var(--success-light)]",
        textColor: "text-[var(--success-dark)]",
      },
      warning: {
        icon: <AlertTriangle className="h-5 w-5" />,
        iconColor: "text-[var(--warning)]",
        bgColor: "bg-[var(--warning-light)]/20",
        borderColor: "border-[var(--warning-light)]",
        textColor: "text-[var(--warning-dark)]",
      },
      error: {
        icon: <AlertCircle className="h-5 w-5" />,
        iconColor: "text-[var(--error)]",
        bgColor: "bg-[var(--error-light)]/20",
        borderColor: "border-[var(--error-light)]",
        textColor: "text-[var(--error-dark)]",
      },
    };

    const config = variantConfig[variant];

    // Determine role based on variant
    const role = variant === "error" ? "alert" : "status";

    return (
      <div
        ref={ref}
        role={role}
        {...props}
        className={`rounded-lg border p-4 ${config.bgColor} ${config.borderColor} ${config.textColor} ${className}`}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={`shrink-0 ${config.iconColor}`}
            aria-hidden="true"
          >
            {config.icon}
          </div>

          {/* Content */}
          <div className="flex-1">
            {title && (
              <h4 className="mb-1 font-semibold text-[var(--text-primary)]">
                {title}
              </h4>
            )}
            <div className="text-sm">{children}</div>
          </div>

          {/* Close button */}
          {dismissible && onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss alert"
              className="shrink-0 rounded-lg p-1 transition-colors
                hover:bg-black/10
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };
export type { AlertProps, AlertVariant };
export default Alert;
