"use client";

import { editMosque } from "@/lib/actions";
import { useGlobalStore } from "@/stores/useGlobalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormField } from "$/form-field";
import { Button } from "$/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "$/ui/dialog";
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

export function EditMosqueForm() {
  const {
    editMosqueData,
    editMosqueFormOpen,
    setEditMosqueFormOpen,
  } = useGlobalStore();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm<MosqueFormInputs>({
    defaultValues: editMosqueData ?? {},
    resolver: zodResolver(mosqueFormSchema),
  });

  useEffect(() => {
    if (editMosqueData) reset(editMosqueData);
  }, [editMosqueData, reset]);

  const onSubmit: SubmitHandler<MosqueFormInputs> = async (
    inputs
  ) => {
    try {
      const res = await editMosque({
        ...editMosqueData,
        ...inputs,
      });
      if (res.success) toast.success("تم تعديل المسجد بنجاح");
      else toast.error("حدث خطأ ما أثناء تعديل المسجد");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("حدث خطأ ما أثناء تعديل المسجد");
    }
  };

  return (
    <Dialog
      defaultOpen={false}
      open={editMosqueFormOpen}
      onOpenChange={setEditMosqueFormOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل بيانات المسجد</DialogTitle>
        </DialogHeader>
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
                  جار تعديل المسجد
                  <Spinner />
                </>
              ) : (
                "قم بالتعديل"
              )}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
