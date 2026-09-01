"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import {
  authErrorsI18n,
  type Code,
} from "@/lib/auth-errors-i18n";
import { useRouter } from "next/navigation";
import {
  Controller,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { PasswordInput } from "$/password-input";
import { Button } from "$/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "$/ui/card";
import { Checkbox } from "$/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "$/ui/field";
import { Input } from "$/ui/input";
import { Spinner } from "$/ui/spinner";

const loginFormSchema = z.object({
  username: z
    .string()
    .nonempty("يرجى إدخال رقم الهاتف")
    .regex(
      /^01[0125]\d{8}$/,
      "يرجى إدخال رقم الهاتف بشكل صحيح"
    ),
  password: z
    .string()
    .nonempty("يرجى إدخال كلمة المرور")
    .min(8, "كلمة المرور لا يمكن أن تقل عن ٨ أحرف"),
  rememberMe: z.boolean(),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const router = useRouter();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (
    inputs
  ) => {
    try {
      await authClient.signIn.username(inputs, {
        onError: ({ error }) => {
          toast.error(authErrorsI18n(error.code as Code));
        },
        onSuccess: ({
          data: {
            user: { role },
          },
        }) => {
          if (role === "MODERATOR")
            router.push("/moderator/dashboard");
          else router.push("/user/dashboard");
        },
      });
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else
        toast.error(
          "حدث خطأ ما!. يرجى المحاولة مرة أخرى لاحقًا"
        );
    }
  };

  return (
    <Card className="max-w-xl min-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">تسجيل الدخول</CardTitle>
        <CardAction>
          <Button
            onClick={() => router.push("/auth/register")}
            variant="link"
          >
            إنشاء حساب
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={control}
              name="username"
              render={({
                field: { disabled, ...field },
                fieldState: { invalid, error },
              }) => (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>
                    رقم الهاتف
                  </FieldLabel>
                  <Input
                    aria-invalid={invalid}
                    dir="ltr"
                    disabled={disabled || isSubmitting}
                    id={field.name}
                    lang="en"
                    type="tel"
                    {...field}
                  />
                  {error && (
                    <FieldError>{error.message}</FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({
                field: { disabled, ...field },
                fieldState: { invalid, error },
              }) => (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>
                    كلمة المرور
                  </FieldLabel>
                  <PasswordInput
                    aria-invalid={invalid}
                    dir="ltr"
                    disabled={disabled || isSubmitting}
                    id={field.name}
                    lang="en"
                    {...field}
                  />
                  {error && (
                    <FieldError>{error.message}</FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="rememberMe"
              render={({
                field: {
                  disabled,
                  name,
                  onChange,
                  value,
                  ...field
                },
                fieldState: { invalid },
              }) => (
                <Field
                  data-invalid={invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    aria-invalid={invalid}
                    checked={value}
                    className="cursor-pointer"
                    disabled={disabled || isSubmitting}
                    id={name}
                    onCheckedChange={onChange}
                    {...field}
                  />
                  <FieldLabel htmlFor={name}>تذكرني</FieldLabel>
                </Field>
              )}
            />
            <Button
              disabled={isSubmitting}
              form="login-form"
              type="submit"
            >
              {isSubmitting ? "يرجى الانتظار" : "تسجيل الدخول"}
              {isSubmitting && <Spinner />}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
