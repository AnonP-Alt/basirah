"use client";

import { user } from "@/db/schema/auth.sql";
import { deleteSheikh } from "@/lib/actions";
import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import { useState } from "react";
import { toast } from "sonner";

import { EditSheikhForm } from "$/admin/edit-sheikh-form";
import { Button } from "$/ui/button";
import { DeleteAlertDialog } from "$/delete-alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "$/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "$/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

function ActionsCell({
  original,
}: { row: { original: Sheikh } }["row"] extends never
  ? never
  : { original: Sheikh }) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" className="h-8 w-8 p-0" />
          }
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              تعديل بيانات الشيخ
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setDeleteOpen(true)}
              variant="destructive"
            >
              حذف حساب الشيخ
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteAlertDialog
        action={async () => {
          try {
            const { success } = await deleteSheikh(
              original.id!
            );
            if (success) toast.success("تم الحذف بنجاح");
            else
              toast.error(
                "حدث خطأ ما أثناء الحذف، حاول مرة أخرى لاحقًا"
              );
          } catch {
            toast.error(
              "حدث خطأ ما أثناء الحذف، حاول مرة أخرى لاحقًا"
            );
          }
        }}
        description="سيتم حذف حساب هذا الشيخ، ولن يمكنك استرجاعه إلا بإعادة إنشاء حساب الشيخ من جديد"
        onOpenChange={setDeleteOpen}
        open={deleteOpen}
      />

      <Dialog onOpenChange={setEditOpen} open={editOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              تعديل بيانات الشيخ &quot;
              {original.name.split(" ")[0]}&quot;
            </DialogTitle>
          </DialogHeader>
          <EditSheikhForm sheikh={original} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export type Sheikh = typeof user.$inferInsert;

const columnHelper = createColumnHelper<
  DataTableFeatures,
  Sheikh
>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        اسم الشيخ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),
  columnHelper.accessor("username", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        رقم الهاتف
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),
  columnHelper.accessor("nationalId", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        الرقم القومي
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),
  columnHelper.accessor("address", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        العنوان
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row: { original } }) => (
      <ActionsCell original={original} />
    ),
  }),
]);
