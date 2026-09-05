"use client";

import { user } from "@/db/schema/auth.sql";
import { deleteSheikh } from "@/lib/actions";
import { useGlobalStore } from "@/stores/useGlobalStore";
import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";

import { Button } from "$/ui/button";
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
  const { setEditSheikhFormOpen, setEditSheikhData } =
    useGlobalStore();

  return (
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
              setEditSheikhData(original);
              setEditSheikhFormOpen(true);
            }}
          >
            تعديل بيانات الشيخ
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => deleteSheikh(original.id!)}
            variant="destructive"
          >
            حذف الشيخ
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
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
