"use client";

import { mosque } from "@/db/schema/app.sql";
import { deleteMosque } from "@/lib/actions";
import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import { useState } from "react";
import { toast } from "sonner";

import { MosqueDetails } from "$/admin/manage-mosque";
import { DeleteAlertDialog } from "$/delete-alert-dialog";
import { Button } from "$/ui/button";
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
}: { row: { original: Mosque } }["row"] extends never
  ? never
  : { original: Mosque }) {
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
            <DropdownMenuItem
              onClick={() => {
                setEditOpen(true);
              }}
            >
              تعديل المسجد
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setDeleteOpen(true);
              }}
              variant="destructive"
            >
              حذف المسجد
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteAlertDialog
        action={async () => {
          try {
            const { success } = await deleteMosque(
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
        description="سيتم حذف هذا المسجد إلي الأبد، ولن يمكنك استرجاعه إلا بإضافته مرة أخرى"
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />

      <Dialog onOpenChange={setEditOpen} open={editOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              تعديل بيانات مسجد &quot;{original.name}&quot;
            </DialogTitle>
          </DialogHeader>
          <MosqueDetails action="edit" mosque={original} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export type Mosque = typeof mosque.$inferInsert;

const columnHelper = createColumnHelper<
  DataTableFeatures,
  Mosque
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
        اسم المسجد
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
        عنوان المسجد
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),
  columnHelper.accessor("location", {
    header: "الموقع على الخريطة",
    cell: ({ row }) => (
      <Button variant="link">
        <a href={row.getValue("location")} target="_blank">
          اضغط هنا
        </a>
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
