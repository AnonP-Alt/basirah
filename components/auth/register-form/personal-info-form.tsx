"use client";

import { nationalIdTaken } from "@/lib/actions";
import { useGlobalStore } from "@/stores/useGlobalStore";
import { useRegisterFormStore } from "@/stores/useRegisterFormStore";
import {
  type PersonalInfoInputs,
  personalInfoSchema,
} from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { FormField } from "$/form-field";
import { Button } from "$/ui/button";
import { FieldGroup } from "$/ui/field";
import { Spinner } from "$/ui/spinner";
import { ArrowLeft } from "lucide-react";

export function PersonalInfoForm() {
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
    defaultValues: { address, name, nationalId },
    resolver: zodResolver(personalInfoSchema),
  });

  const onSubmit: SubmitHandler<PersonalInfoInputs> = async ({
    address,
    name,
    nationalId,
  }) => {
    const idTaken = await nationalIdTaken(nationalId);
    if (idTaken) {
      setError("nationalId", {
        message: "الرقم القومي مسجل بالفعل",
      });
      return;
    }
    setName(name);
    setNationalId(nationalId);
    setAddress(address);
    setRegisterFormStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormField
          control={control}
          disabled={isSubmitting}
          label="الاسم رباعي"
          name="name"
        />
        <FormField
          control={control}
          dir="ltr"
          disabled={isSubmitting}
          label="الرقم القومي"
          lang="en"
          name="nationalId"
        />
        <FormField
          control={control}
          disabled={isSubmitting}
          label="محل الإقامة"
          name="address"
        />
        <Button disabled={isSubmitting} type="submit">
          التالي
          {isSubmitting ? <Spinner /> : <ArrowLeft />}
        </Button>
      </FieldGroup>
    </form>
  );
}
