import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import PartForm from "../../features/parts/components/PartForm";
import Loader from "../../components/Loader";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BsPencil, BsTrash2 } from "react-icons/bs";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import Button from "../../components/Button/Button";
import { Part } from "../../features/parts/types";
import { getDecodedToken } from "../../utils";

const PartsList = () => {
  const infoUser = getDecodedToken();
  //const driverByCompany = useDriversByCompany(infoUser.id);

  //const { data, isLoading, isError } = driverByCompany;
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper<Part>();
  const [isOpen, setIsOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  return (
    <div className="p-4">
      <PartForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        part={undefined}
        mode={formMode}
      />
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex flex-row justify-between items-center m-4">
          <div className="relative">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              placeholder="Recherche globale..."
              value={""}
              onChange={() => ({})}
              className="pl-10 w-64 outline-none border rounded-lg py-2 px-4 border-gray"
            />
          </div>
          <Button
            onClick={() => {
              setFormMode("add");
              setSelectedPart(null);
              setIsFormOpen(true);
            }}
            to="#"
            title="Ajouter un motard"
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-btn-primary py-2 px-2 text-center text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
            icon={<GiFullMotorcycleHelmet />}
          />
        </div>
      </div>
    </div>
  );
};
export default PartsList;
