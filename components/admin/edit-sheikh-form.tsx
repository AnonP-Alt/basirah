import { editSheikh } from "@/lib/actions";
import { useGlobalStore } from "@/stores/useGlobalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "$/auth/register-form/schemas";
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

type EditSheikhInputs = z.infer<typeof editUserSchema>;

export function EditSheikhForm() {
  const {
    editSheikhData,
    editSheikhFormOpen,
    setEditSheikhFormOpen,
  } = useGlobalStore();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm<EditSheikhInputs>({
    defaultValues: editSheikhData ?? {},
    resolver: zodResolver(editUserSchema),
  });

  useEffect(() => {
    if (editSheikhData) reset(editSheikhData);
  }, [editSheikhData, reset]);

  const onSubmit: SubmitHandler<EditSheikhInputs> = async (
    inputs
  ) => {
    try {
      const res = await editSheikh({
        ...editSheikhData,
        ...inputs,
      });
      if (!res.success)
        toast.error("حدث خطأ ما أثناء تعديل البيانات");
      else toast.success("تم تعديل البيانات بنجاح");
    } catch {
      toast.error("حدث خطأ ما أثناء تعديل البيانات");
    }
  };

  return (
    <Dialog
      defaultOpen={false}
      open={editSheikhFormOpen}
      onOpenChange={setEditSheikhFormOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل بيانات الشيخ</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormField
              control={control}
              label="الاسم"
              name="name"
            />
            <FormField
              control={control}
              label="رقم الهاتف"
              name="username"
              type="tel"
            />
            <FormField
              control={control}
              label="الرقم القومي"
              name="nationalId"
            />
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <>
                  جار تعديل البيانات
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
