"use client";

import { mosque } from "@/db/schema/app.sql";
import { useDebounce } from "@uidotdev/usehooks";
import { columns } from "./mosques-table/columns";
import { useState } from "react";

import { DataTable } from "./mosques-table/data-table";
import { MosqueDetails } from "$/admin/manage-mosque";
import { Button } from "$/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "$/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "$/ui/input-group";
import { Search } from "lucide-react";

type Props = {
  mosques: (typeof mosque.$inferInsert)[];
};

export function Mosques({ mosques }: Props) {
  const [searchTerm, setSearchTerm] = useState<string | null>(
    null
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const filteredMosques = mosques.filter((mosque) =>
    mosque.name.includes(debouncedSearchTerm ?? "")
  );

  return (
    <div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger render={<Button>أضف مسجدًا</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة مسجد جديد</DialogTitle>
            </DialogHeader>
            <MosqueDetails action="add" />
          </DialogContent>
        </Dialog>
        <InputGroup>
          <InputGroupAddon align="inline-end">
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            onChange={({ target: { value } }) =>
              setSearchTerm(value)
            }
            placeholder="اسم المسجد"
            value={searchTerm ?? ""}
          />
        </InputGroup>
      </div>
      <div className="my-16">
        <DataTable columns={columns} data={filteredMosques} />
      </div>
    </div>
  );
}
