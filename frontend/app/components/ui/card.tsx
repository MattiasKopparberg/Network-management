import { forwardRef } from "react";

type CardVariant = "default" | "elevated" | "bordered";
type CardPadding = "none" | "sm" | "md" | "lg";

// Card can be either a div or a button depending on clickable prop
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  padding?: CardPadding;
  fullWidth?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

/**
 * Card Component
 * 
 * A reusable card component with configurable padding, variants, and interactive states.
 * 
 * WCAG 2.2 AA Compliant:
 * - Proper semantic structure
 * - Focus indicators for interactive cards
 * - Sufficient contrast
 * - Keyboard accessible for clickable cards
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      fullWidth = true,
      hoverable = false,
      clickable = false,
      header,
      footer,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles = {
      default: `bg-[var(--bg-elevated)] border border-[var(--border-primary)]`,
      elevated: `bg-[var(--bg-elevated)] border border-[var(--border-primary)] shadow-md dark:shadow-black/20`,
      bordered: `bg-[var(--bg-elevated)] border-2 border-[var(--border-primary)]`,
    };

    // Padding styles
    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
    };

    // Combine all styles
    const cardStyles = `
      rounded-xl
      ${variantStyles[variant]}
      ${paddingStyles[padding]}
      ${fullWidth ? 'w-full' : ''}
      ${hoverable ? 'transition-shadow duration-200 hover:shadow-lg' : ''}
      ${clickable ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2' : ''}
      ${className}
    `;

    // If clickable, add proper semantic element
    if (clickable) {
      // Filter out div-specific props that don't apply to button
      const { onCopy, onCopyCapture, onCut, onCutCapture, onPaste, onPasteCapture, ...buttonProps } = props as any;
      
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          {...buttonProps}
          className={cardStyles.trim()}
          role="button"
          tabIndex={0}
        >
          {header && (
            <div className="mb-4 border-b border-[var(--border-secondary)] pb-4">
              {header}
            </div>
          )}
          {children}
          {footer && (
            <div className="mt-4 border-t border-[var(--border-secondary)] pt-4">
              {footer}
            </div>
          )}
        </button>
      );
    }

    // Standard card
    return (
      <div
        ref={ref}
        {...props}
        className={cardStyles.trim()}
      >
        {header && (
          <div className="mb-4 border-b border-[var(--border-secondary)] pb-4">
            {header}
          </div>
        )}
        {children}
        {footer && (
          <div className="mt-4 border-t border-[var(--border-secondary)] pt-4">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
export type { CardProps, CardVariant, CardPadding };
export default Card;
