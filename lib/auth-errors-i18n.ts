const arLocale = {
  ACCOUNT_NOT_FOUND: "الحساب غير موجود",
  CREDENTIAL_ACCOUNT_NOT_FOUND:
    "حساب بيانات الاعتماد غير موجود",
  EMAIL_ALREADY_VERIFIED: "البريد الإلكتروني مُحقق بالفعل",
  EMAIL_CAN_NOT_BE_UPDATED: "لا يمكن تحديث البريد الإلكتروني",
  EMAIL_MISMATCH: "البريد الإلكتروني غير متطابق",
  EMAIL_NOT_VERIFIED: "البريد الإلكتروني غير مُحقق",
  FAILED_TO_CREATE_SESSION: "فشل في إنشاء الجلسة",
  FAILED_TO_CREATE_USER: "فشل في إنشاء المستخدم",
  FAILED_TO_GET_SESSION: "فشل في الحصول على الجلسة",
  FAILED_TO_GET_USER_INFO: "فشل في الحصول على معلومات المستخدم",
  FAILED_TO_UNLINK_LAST_ACCOUNT:
    "لا يمكنك إلغاء ربط حسابك الأخير",
  FAILED_TO_UPDATE_USER: "فشل في تحديث المستخدم",
  INVALID_DISPLAY_USERNAME: "اسم العرض غير صالح",
  INVALID_EMAIL: "البريد الإلكتروني غير صالح",
  INVALID_EMAIL_OR_PASSWORD:
    "البريد الإلكتروني أو كلمة المرور غير صالحة",
  INVALID_PASSWORD: "كلمة المرور غير صالحة",
  INVALID_TOKEN: "الرمز المميز غير صالح",
  INVALID_USER: "مستخدم غير صالح",
  INVALID_USERNAME: "اسم المستخدم غير صالح",
  INVALID_USERNAME_OR_PASSWORD:
    "اسم المستخدم أو كلمة المرور غير صحيحة",
  LINKED_ACCOUNT_ALREADY_EXISTS: "الحساب المرتبط موجود بالفعل",
  MISSING_FIELD: "هذا الحقل مطلوب",
  PASSWORD_ALREADY_SET: "المستخدم لديه كلمة مرور محددة بالفعل",
  PASSWORD_TOO_LONG: "كلمة المرور طويلة جداً",
  PASSWORD_TOO_SHORT: "كلمة المرور قصيرة جداً",
  PROVIDER_NOT_FOUND: "مزود الخدمة غير موجود",
  SESSION_EXPIRED:
    "انتهت الجلسة. أعد المصادقة لتنفيذ هذا الإجراء.",
  SESSION_NOT_FRESH: "الجلسة ليست حديثة",
  SOCIAL_ACCOUNT_ALREADY_LINKED:
    "الحساب الاجتماعي مرتبط بالفعل",
  TOKEN_EXPIRED: "انتهت صلاحية الرمز المميز",
  UNEXPECTED_ERROR: "حدث خطأ غير متوقع",
  USERNAME_IS_ALREADY_TAKEN:
    "اسم المستخدم مُستخدم بالفعل. الرجاء تجربة اسم آخر.",
  USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER:
    "اسم المستخدم مستخدم بالفعل، يرجى تجربة اسم آخر.",
  USERNAME_IS_IMMUTABLE: "لا يمكن تغيير اسم المستخدم",
  USERNAME_IS_INVALID: "اسم المستخدم غير صالح.",
  USERNAME_TOO_LONG: "اسم المستخدم طويل جدًا",
  USERNAME_TOO_SHORT: "اسم المستخدم قصير جدًا",
  USER_ALREADY_EXISTS: "المستخدم موجود بالفعل",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "المستخدم موجود بالفعل. استخدم بريداً إلكترونياً آخر.",
  USER_ALREADY_HAS_PASSWORD:
    "المستخدم لديه كلمة مرور بالفعل. قدمها لحذف الحساب.",
  USER_EMAIL_NOT_FOUND: "بريد المستخدم الإلكتروني غير موجود",
  USER_NOT_FOUND: "المستخدم غير موجود",
  VALIDATION_ERROR: "خطأ في التحقق",
  VERIFICATION_EMAIL_NOT_ENABLED: "بريد التحقق غير مفعّل",
} as const;

export type Code = keyof typeof arLocale;

export function authErrorsI18n(code: Code) {
  return arLocale[code];
}
