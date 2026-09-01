import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const arabicLetters = [
  "ا",
  "أ",
  "إ",
  "آ",
  "ٱ",
  "ب",
  "پ",
  "ت",
  "ث",
  "ج",
  "چ",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "ژ",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ک",
  "ك",
  "گ",
  "ل",
  "م",
  "ن",
  "ه",
  "ة",
  "و",
  "ؤ",
  "ي",
  "ى",
  "ئ",
];

export function checkArabic(text: string) {
  const letters = text.trim().replaceAll(/\s+/g, "").split("");

  return letters.every((letter) =>
    arabicLetters.includes(letter)
  );
}
