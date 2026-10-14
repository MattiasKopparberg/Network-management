import type { ReactNode } from "react";

export type CrudField<T> = {
  name: keyof T & string;
  label: string;
  type: "text" | "number" | "date" | "select" | "checkbox";
  required?: boolean;

  options?: {
    label: string;
    value: string | number;
  }[];
};

export type CrudColumn<T> = {
  key: keyof T & string;
  label: string;

  render?: (item: T) => ReactNode;
};

export type CrudConfig<T> = {
  title: string;
  entityName: string;

  endpoint: string;

  columns: CrudColumn<T>[];
  fields: CrudField<T>[];

  getId: (item: T) => string | number;
};