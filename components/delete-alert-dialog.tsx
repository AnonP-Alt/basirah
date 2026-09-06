import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "$/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";

type Props = {
  action: () => void;
  description: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  title?: string;
};

export function DeleteAlertDialog({
  action,
  description,
  onOpenChange,
  open,
  title = "هل أنت متأكد؟",
}: Props) {
  const handleClick = () => {
    action();
    onOpenChange(false);
  };
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">
            إلغاء
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
            variant="destructive"
          >
            تأكيد
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
