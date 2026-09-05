import { addMosque } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormField } from "$/form-field";
import { Button } from "$/ui/button";
import { FieldGroup } from "$/ui/field";
import { Spinner } from "$/ui/spinner";

const mosqueFormSchema = z.object({
  name: z
    .string()
    .nonempty("يرجى إدخال اسم المسجد")
    .min(3, "اسم المسجد لا يمكن أن يقل عن ٣ أحرف"),
  address: z
    .string()
    .nonempty("يرجى أدخال عنوان المسجد")
    .min(8, "عنوان المسجد لا يمكن أن يقل عن ٨ أحرف"),
  location: z
    .url("يرجى إدخال رابط المسجد على الخرائط")
    .regex(
      /^https:\/\/maps.app.goo.gl\//,
      "مسموح برابط خرائط جوجل فقط"
    ),
});

type MosqueFormInputs = z.infer<typeof mosqueFormSchema>;

export function AddMosqueForm() {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<MosqueFormInputs>({
    defaultValues: {
      address: "",
      location: "",
      name: "",
    },
    resolver: zodResolver(mosqueFormSchema),
  });

  const onSubmit: SubmitHandler<MosqueFormInputs> = async ({
    address,
    location,
    name,
  }) => {
    try {
      const res = await addMosque({ address, location, name });
      if (res.success) toast.success("تم إضافة المسجد بنجاح");
      else toast.error("حدث خطأ ما أثناء إضافة المسجد");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("حدث خطأ ما أثناء إضافة المسجد");
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
          disabled={isSubmitting}
          label="موقع المسجد (رابط المسجد على الخريطة)"
          name="location"
          type="url"
        />
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              جار إضافة المسجد
              <Spinner />
            </>
          ) : (
            "أضف المسجد"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
