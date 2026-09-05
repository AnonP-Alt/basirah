"use client";

import { user } from "@/db/schema/auth.sql";
import { useDebounce } from "@uidotdev/usehooks";
import { columns } from "./sheikhs-table/columns";
import { useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "$/ui/input-group";
import { EditSheikhForm } from "./edit-sheikh-form";
import { DataTable } from "./sheikhs-table/data-table";
import { Search } from "lucide-react";

type Props = {
  sheikhs: (typeof user.$inferInsert)[];
};

export function Sheikhs({ sheikhs }: Props) {
  const [searchTerm, setSearchTerm] = useState<string | null>(
    null
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const filteredSheikhs = sheikhs.filter((sheikh) =>
    sheikh.name.includes(debouncedSearchTerm ?? "")
  );

  return (
    <div>
      <div className="flex gap-2">
        <InputGroup>
          <InputGroupAddon align="inline-end">
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            onChange={({ target: { value } }) =>
              setSearchTerm(value)
            }
            placeholder="اسم الشيخ"
            value={searchTerm ?? ""}
          />
        </InputGroup>
      </div>
      <div className="my-16">
        <DataTable columns={columns} data={filteredSheikhs} />
      </div>
      <EditSheikhForm />
    </div>
  );
}
