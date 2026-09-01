"use client";

import { type ComponentProps, type ElementType } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "$/ui/field";
import { Input } from "$/ui/input";

type FormFieldProps<T extends FieldValues> = {
  as?: ElementType;
  control: Control<T>;
  disabled?: boolean;
  label: string;
  name: Path<T>;
} & Omit<ComponentProps<typeof Input>, "disabled" | "name">;

export function FormField<T extends FieldValues>({
  as: Component = Input,
  control,
  disabled,
  label,
  name,
  ...inputProps
}: FormFieldProps<T>) {
  const Comp = Component as ElementType;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { disabled: fieldDisabled, ...field },
        fieldState: { invalid, error },
      }) => (
        <Field data-invalid={invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Comp
            aria-invalid={invalid}
            disabled={fieldDisabled || disabled}
            id={field.name}
            {...inputProps}
            {...field}
          />
          {error && <FieldError>{error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
