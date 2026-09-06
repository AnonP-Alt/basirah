import { mosque } from "@/db/schema/app.sql";
import { addMosque, editMosque } from "@/lib/actions";
import { checkArabic } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormField } from "$/form-field";
import { Button } from "$/ui/button";
import { FieldGroup } from "$/ui/field";
import { Spinner } from "$/ui/spinner";

const mosqueDetailsSchema = z.object({
  name: z
    .string()
    .nonempty("يرجى إدخال اسم المسجد")
    .min(3, "اسم المسجد لا يمكن أن يقل عن ٣ أحرف")
    .refine(
      (name) => checkArabic(name),
      "اسم المسجد يجب أن يكون باللغة العربية"
    ),
  address: z
    .string()
    .nonempty("يرجى إدخال عنوان المسجد")
    .min(8, "عنوان المسجد لا يمكن أن يقل عن ٨ أحرف")
    .refine(
      (name) => checkArabic(name),
      "عنوان المسجد يجب أن يكون باللغة العربية"
    ),
  location: z
    .url("يرجى إدخال رابط المسجد على الخريطة")
    .regex(
      /^https:\/\/maps.app.goo.gl\//,
      "مسموح بروابط خراـذط جوجل فقط"
    ),
});

type MosqueDetails = z.infer<typeof mosqueDetailsSchema>;

type Props =
  | {
      action: "add";
    }
  | {
      action: "edit";
      mosque: typeof mosque.$inferInsert;
    };

export function MosqueDetails(props: Props) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<MosqueDetails>({
    defaultValues:
      props.action === "add"
        ? {
            address: "",
            location: "",
            name: "",
          }
        : props.mosque,
    resolver: zodResolver(mosqueDetailsSchema),
  });

  const onSubmit: SubmitHandler<MosqueDetails> = async (
    inputs
  ) => {
    try {
      let res: { success: boolean };

      if (props.action === "add") res = await addMosque(inputs);
      else
        res = await editMosque({
          ...props.mosque,
          ...inputs,
        });

      if (res.success)
        toast.success(
          props.action === "add"
            ? "تم إضافة المسجد بنجاح"
            : "تم تعديل بيانات المسجد بنجاح"
        );
      else toast.error("حدث خطأ ما، يرجى المحاولة مرة أخرى");
    } catch {
      toast.error("حدث خطأ ما، يرجى المحاولة لاحقاً");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormField
          control={control}
          disabled={isSubmitting}
          label="اسم المسجد"
          name="name"
        />
        <FormField
          control={control}
          disabled={isSubmitting}
          label="عنوان المسجد"
          name="address"
        />
        <FormField
          control={control}
          dir="ltr"
          disabled={isSubmitting}
          label="رابط موقع المسجد"
          lang="en"
          name="location"
        />
        <Button type="submit">
          {props.action === "add"
            ? "أضف المسجد"
            : "قم بالتعديل"}
          {isSubmitting && (
            <>
              يرجى الانتظار
              <Spinner />
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
