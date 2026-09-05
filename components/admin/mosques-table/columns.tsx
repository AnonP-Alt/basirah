"use client";

import { mosque } from "@/db/schema/app.sql";
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
import { deleteMosque } from "@/lib/actions";

function ActionsCell({
  original,
}: { row: { original: Mosque } }["row"] extends never
  ? never
  : { original: Mosque }) {
  const { setEditMosqueFormOpen, setEditMosqueData } =
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
              setEditMosqueData(original);
              setEditMosqueFormOpen(true);
            }}
          >
            تعديل المسجد
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => deleteMosque(original.id!)}
            variant="destructive"
          >
            حذف المسجد
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
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
    header: "رابط الموقع",
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
