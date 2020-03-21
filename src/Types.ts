import * as Yup from "yup";

export type YupSchemaValues = Yup.Schema<any> | Yup.Ref;

export type YupSchema<T extends object> = {
  [K in keyof T]: YupSchemaValues;
};

export type CallbacksSchema<T extends object> = {
  [K in keyof T]: (object: T) => boolean;
};

export type FormValidationSchema<T extends object> = {
  [K in keyof T]: ((object: T) => boolean) | YupSchemaValues;
};

export type FormValidationError<T extends object> = {
  [K in keyof T]: string;
};

export interface FormValidation<T extends object> {
  canValidate: boolean;
  errors: FormValidationError<T>[];
}

export type FormSelectItemCommon = {
  label: string;
  value: string;
};

export type FormSelectItemSemanticUI = {
  key: string;
  value: string;
  text: string;
};

export type FormSelectItem = Partial<FormSelectItemCommon> &
  Partial<FormSelectItemSemanticUI>;

export type FormSelectStore<T extends object> = {
  get: (key: keyof T) => Partial<FormSelect<T>>;
  store: (key: keyof T, values: FormSelect<T>) => void;
};

export interface FormSelect<T extends object> {
  suggestions: FormSelectItem[];
  onSelect: (object: T) => void;
  onClear: () => void;
  itemSelected: FormSelectItem | undefined;
  objectSelected: T | undefined;
}

export interface FormSelectComponentProps<T extends object> {
  id: keyof T;
  formSelectStore: FormSelectStore<T>;
  render: (values: FormSelectItem[]) => JSX.Element;
  objects: T[];
  format: (object: T) => FormSelectItem;
  defaultItem?: T;
}
