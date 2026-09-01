"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { emailTaken, nationalIdTaken } from "@/lib/actions";
import { authClient } from "@/lib/auth-client";
import {
  authErrorsI18n,
  type Code,
} from "@/lib/auth-errors-i18n";
import { checkArabic } from "@/lib/utils";
import { useGlobalStore } from "@/stores/useGlobalStore";
import { useRegisterFormStore } from "@/stores/useRegisterFormStore";
import { useRouter } from "next/navigation";
import {
  Controller,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { PasswordInput } from "$/password-input";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTrigger,
} from "$/reui/stepper";
import { Button } from "$/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "$/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "$/ui/field";
import { Input } from "$/ui/input";
import { Spinner } from "$/ui/spinner";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

// Schemas and Types

const personalInfoSchema = z.object({
  name: z
    .string()
    .nonempty("يرجى إدخال الاسم")
    .refine(
      (name) => checkArabic(name),
      "الاسم يجب أن يكون باللغة العربية"
    )
    .refine((name) => {
      const nameParts = name
        .trim()
        .replaceAll(/\s+/g, " ")
        .split(" ");

      return (
        nameParts.length === 4 &&
        nameParts.every((part) => part.length >= 3)
      );
    }, "يرجى إدخال الاسم رباعيًا"),
  nationalId: z
    .string()
    .nonempty("يرجى إدخال الرقم القومي")
    .regex(/^\d{14}$/, "يرجى إدخال الرقم القومي بشكل صحيح"),
  address: z
    .string()
    .nonempty("يرجى إدخال العنوان")
    .min(3, "العنوان لا يمكن أن يقل عن ٣ أحرف")
    .refine(
      (address) => checkArabic(address),
      "العنوان يجب أن يكون باللغة العربية"
    )
    .refine((address) => {
      const addressParts = address
        .trim()
        .replaceAll(/\s+/g, " ")
        .split(" ");
      if (addressParts.length > 1)
        return addressParts.every((part) => part.length >= 3);
      return true;
    }, "يرجى إدخال العنوان بشكل صحيح"),
});

type PersonalInfoInputs = z.infer<typeof personalInfoSchema>;

const loginInfoSchema = z.object({
  username: z
    .string()
    .nonempty("يرجى إدخال رقم الهاتف")
    .regex(
      /^01[0125]\d{8}$/,
      "يرجى إدخال رقم الهاتف بشكل صحيح"
    ),
  email: z.email("يرجى إدخال البريد الإلكتروني"),
  password: z
    .string("يرجى إدخال كلمة المرور")
    .min(8, "كلمة المرور لا يمكن أن تقل عن ٨ أحرف"),
});

type LoginInfoInputs = z.infer<typeof loginInfoSchema>;

// JSX

function PersonalInfoForm() {
  const { setRegisterFormStep } = useGlobalStore();
  const {
    address,
    name,
    nationalId,
    setAddress,
    setName,
    setNationalId,
  } = useRegisterFormStore();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = useForm<PersonalInfoInputs>({
    defaultValues: {
      address,
      name,
      nationalId,
    },
    resolver: zodResolver(personalInfoSchema),
  });

  const onSubmit: SubmitHandler<PersonalInfoInputs> = async ({
    address,
    name,
    nationalId,
  }) => {
    const idTaken = await nationalIdTaken(nationalId);
    if (idTaken)
      setError("nationalId", {
        message: "الرقم القومي مسجل بالفعل",
      });
    else {
      setName(name);
      setNationalId(nationalId);
      setAddress(address);
      setRegisterFormStep(2);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={control}
          name="name"
          render={({
            field: { disabled, ...field },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={field.name}>
                الاسم رباعي
              </FieldLabel>
              <Input
                aria-invalid={invalid}
                disabled={disabled || isSubmitting}
                id={field.name}
                type="text"
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
          name="nationalId"
          render={({
            field: { disabled, ...field },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={field.name}>
                الرقم القومي
              </FieldLabel>
              <Input
                aria-invalid={invalid}
                dir="ltr"
                disabled={disabled || isSubmitting}
                id={field.name}
                lang="en"
                type="text"
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
          name="address"
          render={({
            field: { disabled, ...field },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={field.name}>
                محل الإقامة
              </FieldLabel>
              <Input
                aria-invalid={invalid}
                disabled={disabled || isSubmitting}
                id={field.name}
                type="text"
                {...field}
              />
              {error && (
                <FieldError>{error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          التالي
          {isSubmitting ? <Spinner /> : <ArrowLeft />}
        </Button>
      </FieldGroup>
    </form>
  );
}

function LoginInfoForm() {
  const router = useRouter();

  const { setRegisterFormStep } = useGlobalStore();
  const { address, name, nationalId } = useRegisterFormStore();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = useForm<LoginInfoInputs>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    resolver: zodResolver(loginInfoSchema),
  });

  const onSubmit: SubmitHandler<LoginInfoInputs> = async ({
    email,
    password,
    username,
  }) => {
    try {
      const eTaken = await emailTaken(email);
      const { data } = await authClient.isUsernameAvailable({
        username,
      });

      if (!data?.available)
        setError("username", {
          message: "رقم الهاتف مسجل بالفعل",
        });
      if (eTaken)
        setError("email", {
          message: "البريد الإلكتروني مسجل بالفعل",
        });

      if (!eTaken && data?.available) {
        await authClient.signUp.email(
          {
            address,
            email,
            name,
            nationalId,
            password,
            username,
          },
          {
            onError: ({ error }) => {
              toast.error(authErrorsI18n(error.code as Code));
            },
            onSuccess: async () => {
              toast.success("تم إنشاء حساب جديد بنجاح");
              await new Promise((res) => setTimeout(res, 1500));
              router.push("/user/dashboard");
            },
          }
        );
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else
        toast.error(
          "حدث خطأ ما!. يرجى المحاولة مرة أخرى لاحقًا"
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                disabled={disabled || isSubmitting}
                id={field.name}
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
          name="email"
          render={({
            field: { disabled, ...field },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={field.name}>
                البريد الإلكتروني
              </FieldLabel>
              <Input
                aria-invalid={invalid}
                dir="ltr"
                disabled={disabled || isSubmitting}
                id={field.name}
                lang="en"
                type="email"
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
        <div className="flex items-center justify-between px-2">
          <Button
            disabled={isSubmitting}
            onClick={() => setRegisterFormStep(1)}
            variant="secondary"
          >
            <ArrowRight />
            السابق
          </Button>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <>
                <Spinner /> يرجى الإنتظار
              </>
            ) : (
              "أنشئ الحساب"
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();

  const {
    registerFormStep: step,
    setRegisterFormStep: setStep,
  } = useGlobalStore();

  return (
    <Card className="max-w-xl min-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">إنشاء حساب</CardTitle>
        <CardAction>
          <Button
            onClick={() => router.push("/auth/login")}
            variant="link"
          >
            تسجيل الدخول
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Stepper
          indicators={{
            completed: <Check className="size-4" />,
            loading: <Spinner className="size-4" />,
          }}
          onValueChange={setStep}
          value={step}
        >
          <StepperNav className="px-16">
            <StepperItem
              className="pointer-events-none"
              step={1}
            >
              <StepperTrigger>
                <StepperIndicator>1</StepperIndicator>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem
              className="pointer-events-none"
              step={2}
            >
              <StepperTrigger>
                <StepperIndicator>2</StepperIndicator>
              </StepperTrigger>
            </StepperItem>
          </StepperNav>
          <StepperPanel>
            <StepperContent value={1}>
              <PersonalInfoForm />
            </StepperContent>
            <StepperContent value={2}>
              <LoginInfoForm />
            </StepperContent>
          </StepperPanel>
        </Stepper>
      </CardContent>
    </Card>
  );
}
