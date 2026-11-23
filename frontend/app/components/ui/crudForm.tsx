"use client";

import { useState } from "react";
import type { CrudField } from "@/app/types/CRUD";
import Button from "./button";
import Input from "./input";

type CrudFormProps<T> = {
  fields: CrudField<T>[];
  initialValues?: T | null;
  onSubmit: (values: Partial<T>) => void;
  onCancel: () => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
};

/**
 * CRUD Form Component
 * 
 * A form component for Create, Read, Update, Delete operations.
 * Supports various field types and provides validation feedback.
 * 
 * WCAG 2.2 AA Compliant:
 * - Proper form structure with fieldset/legend
 * - Accessible form controls
 * - Clear error messages
 * - Focus management
 * - Keyboard accessible
 */
export default function CrudForm<T>({
  fields,
  initialValues,
  onSubmit,
  onCancel,
  submitText = "Save",
  cancelText = "Cancel",
  loading = false,
}: CrudFormProps<T>) {
  const [values, setValues] = useState<Record<string, unknown>>(
    initialValues ? { ...initialValues } : {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(name: string, value: unknown) {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    
    fields.forEach((field) => {
      const value = values[field.name];
      
      // Check required fields
      if (field.required) {
        if (value === undefined || value === null || value === "") {
          newErrors[field.name] = `${field.label} is required`;
        }
      }
      
      // Type-specific validation
      if (field.type === "email" && value && typeof value === "string") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = `${field.label} must be a valid email`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (!validate()) {
      // Focus on first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(`field-${firstErrorField}`);
        element?.focus();
      }
      return;
    }

    onSubmit(values as Partial<T>);
  }

  // Get field value with proper type conversion
  function getFieldValue(name: string) {
    const value = values[name];
    return value !== undefined ? value : "";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <fieldset disabled={loading} className="border-0 p-0 m-0">
        {fields.map((field) => {
          const value = getFieldValue(field.name);
          const error = errors[field.name];
          const fieldId = `field-${field.name}`;

          return (
            <div key={field.name} className="flex flex-col gap-1.5">
              {/* Label */}
              <label
                htmlFor={fieldId}
                className="text-sm font-medium text-[var(--text-primary)]"
              >
                {field.label}
                {field.required && (
                  <span className="ml-1 text-[var(--error)]" aria-hidden="true">
                    *
                  </span>
                )}
              </label>

              {/* Input based on type */}
              {field.type === "text" && (
                <Input
                  id={fieldId}
                  type="text"
                  value={String(value ?? "")}
                  onChange={(event) =>
                    handleChange(field.name, event.target.value)
                  }
                  variant={error ? "error" : "default"}
                  error={error}
                  required={field.required}
                  disabled={loading}
                />
              )}

              {field.type === "number" && (
                <Input
                  id={fieldId}
                  type="number"
                  value={String(value ?? "")}
                  onChange={(event) =>
                    handleChange(
                      field.name,
                      event.target.value === ""
                        ? ""
                        : Number(event.target.value)
                    )
                  }
                  variant={error ? "error" : "default"}
                  error={error}
                  required={field.required}
                  disabled={loading}
                />
              )}

              {field.type === "date" && (
                <Input
                  id={fieldId}
                  type="date"
                  value={String(value ?? "")}
                  onChange={(event) =>
                    handleChange(field.name, event.target.value)
                  }
                  variant={error ? "error" : "default"}
                  error={error}
                  required={field.required}
                  disabled={loading}
                />
              )}

              {field.type === "select" && (
                <div>
                  <select
                    id={fieldId}
                    value={String(value ?? "")}
                    onChange={(event) =>
                      handleChange(field.name, event.target.value)
                    }
                    disabled={loading || field.disabled}
                    required={field.required}
                    className={`w-full rounded-lg border bg-[var(--bg-elevated)] px-3 py-2.5 text-base text-[var(--text-primary)]
                      shadow-sm outline-none transition-all duration-200
                      ${error ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-2 focus:ring-[var(--error)]/20' : 'border-[var(--border-primary)] focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20'}
                      ${loading ? 'cursor-not-allowed opacity-50' : ''}
                      placeholder:text-[var(--text-tertiary)]`}
                    aria-invalid={Boolean(error)}
                    aria-errormessage={error ? `${fieldId}-error` : undefined}
                    aria-describedby={error ? `${fieldId}-error` : undefined}
                  >
                    {!field.required && (
                      <option value="">Select...</option>
                    )}
                    
                    {field.options?.map((option) => (
                      <option
                        key={String(option.value)}
                        value={String(option.value)}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {error && (
                    <p
                      id={`${fieldId}-error`}
                      className="mt-1 text-sm text-[var(--error)]"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}
                </div>
              )}

              {field.type === "checkbox" && (
                <div className="flex items-start gap-3">
                  <input
                    id={fieldId}
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(event) =>
                      handleChange(field.name, event.target.checked)
                    }
                    disabled={loading || field.disabled}
                    className={`mt-0.5 h-4 w-4 rounded border-[var(--border-primary)] text-[var(--brand-primary)]
                      focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:ring-offset-2
                      ${error ? 'border-[var(--error)]' : ''}
                      ${loading ? 'cursor-not-allowed' : ''}`}
                    aria-invalid={Boolean(error)}
                    aria-errormessage={error ? `${fieldId}-error` : undefined}
                  />
                  <div>
                    <label
                      htmlFor={fieldId}
                      className="text-sm font-medium text-[var(--text-primary)]"
                    >
                      {field.label}
                    </label>
                    {field.description && (
                      <p className="mt-1 text-sm text-[var(--text-tertiary)]">
                        {field.description}
                      </p>
                    )}
                  </div>
                  {error && (
                    <p
                      id={`${fieldId}-error`}
                      className="mt-1 text-sm text-[var(--error)]"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </fieldset>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-[var(--border-secondary)] pt-5">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelText}
        </Button>

        <Button
          type="submit"
          variant="primary"
          loading={loading}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
}

export type { CrudFormProps };

