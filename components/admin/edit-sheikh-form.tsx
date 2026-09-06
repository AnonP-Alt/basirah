import { user } from "@/db/schema/auth.sql";
import { editSheikh } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "$/auth/register-form/schemas";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormField } from "$/form-field";
import { Button } from "$/ui/button";
import { FieldGroup } from "$/ui/field";
import { Spinner } from "$/ui/spinner";

type EditSheikhInputs = z.infer<typeof editUserSchema>;

type Props = {
  sheikh: typeof user.$inferInsert;
};

export function EditSheikhForm({ sheikh }: Props) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<EditSheikhInputs>({
    defaultValues: sheikh,
    resolver: zodResolver(editUserSchema),
  });

  const onSubmit: SubmitHandler<EditSheikhInputs> = async (
    inputs
  ) => {
    try {
      const { success } = await editSheikh({
        ...sheikh,
        ...inputs,
      });
      if (success) toast.success("تم تعديل بيانات الشيخ بنجاح");
      else toast.error("حدث خطأ ما أثناء تعديل بيانات الشيخ");
    } catch {
      toast.error("حدث خطأ ما أثناء تعديل بيانات الشيخ");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormField
          control={control}
          disabled={isSubmitting}
          label="الاسم"
          name="name"
        />
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
          label="الرقم القومي"
          lang="en"
          name="nationalId"
        />
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              يرجى الانتظار
              <Spinner />
            </>
          ) : (
            "قم بالتعديل"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
