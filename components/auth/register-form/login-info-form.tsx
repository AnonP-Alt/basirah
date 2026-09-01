"use client";

import { emailTaken } from "@/lib/actions";
import { authClient } from "@/lib/auth-client";
import {
  authErrorsI18n,
  type Code,
} from "@/lib/auth-errors-i18n";
import { useGlobalStore } from "@/stores/useGlobalStore";
import { useRegisterFormStore } from "@/stores/useRegisterFormStore";
import {
  type LoginInfoInputs,
  loginInfoSchema,
} from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormField } from "$/form-field";
import { PasswordInput } from "$/password-input";
import { Button } from "$/ui/button";
import { FieldGroup } from "$/ui/field";
import { Spinner } from "$/ui/spinner";
import { ArrowRight } from "lucide-react";

export function LoginInfoForm() {
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
      const [eTaken, { data }] = await Promise.all([
        emailTaken(email),
        authClient.isUsernameAvailable({ username }),
      ]);

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
        <FormField
          control={control}
          disabled={isSubmitting}
          label="رقم الهاتف"
          name="username"
          type="tel"
        />
        <FormField
          control={control}
          dir="ltr"
          disabled={isSubmitting}
          label="البريد الإلكتروني"
          lang="en"
          name="email"
          type="email"
        />
        <FormField
          as={PasswordInput}
          control={control}
          dir="ltr"
          disabled={isSubmitting}
          label="كلمة المرور"
          lang="en"
          name="password"
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
                يرجى الإنتظار
                <Spinner />
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
