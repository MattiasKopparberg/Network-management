type FieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "checkbox";

type CrudField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: {
    label: string;
    value: string | number;
  }[];
};