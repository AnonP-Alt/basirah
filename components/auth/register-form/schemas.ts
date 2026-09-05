import { checkArabic } from "@/lib/utils";
import { z } from "zod";

export const personalInfoSchema = z.object({
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

export type PersonalInfoInputs = z.infer<
  typeof personalInfoSchema
>;

export const loginInfoSchema = z.object({
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

export type LoginInfoInputs = z.infer<typeof loginInfoSchema>;

export const editUserSchema = personalInfoSchema
  .partial()
  .and(loginInfoSchema.partial());
