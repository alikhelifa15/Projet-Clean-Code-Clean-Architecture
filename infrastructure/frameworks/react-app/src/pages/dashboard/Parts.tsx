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
import { useParts } from "../../features/parts/hooks/useParts";
import Loader from "../../components/Loader";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BsPencil, BsTrash2 } from "react-icons/bs";
import { TbSettingsPlus } from "react-icons/tb";
import Button from "../../components/Button/Button";
import { Part } from "../../features/parts/types";
import { getDecodedToken } from "../../utils";
import type {
    GetPartsByDealerData,
    Part as PartType,
  } from "../../features/parts/types";

const PartsList = () => {
    const infoUser = getDecodedToken();
    const getPartsList = useParts();
    const { data, isLoading, isError } = getPartsList;
    const [globalFilter, setGlobalFilter] = useState("");
    const columnHelper = createColumnHelper<Part>();
    const [isOpen, setIsOpen] = useState(false);
    const [formMode, setFormMode] = useState<"add" | "edit">("add");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPart, setSelectedPart] = useState<PartType | null>(null);

    const columns = [
        columnHelper.accessor("reference", {
            cell: (info) => info.getValue() || "N/A",
            header: "Référence",
            enableSorting: true,
        }),
        columnHelper.accessor("name", {
            cell: (info) => info.getValue() || "N/A",
            header: "Nom",
            enableSorting: true,
        }),
        columnHelper.accessor("description", {
            cell: (info) => info.getValue() || "N/A",
            header: "Description",
            enableSorting: false,
        }),
        columnHelper.accessor("currentStock", {
            cell: (info) => info.getValue() ?? "Non défini",
            header: "Stock Actuel",
            enableSorting: true,
        }),
        columnHelper.accessor("alertThreshold", {
            cell: (info) => info.getValue() ?? "Non défini",
            header: "Seuil d'Alerte",
            enableSorting: true,
        }),
        columnHelper.accessor("unitPrice", {
            cell: (info) => (info.getValue() ? `${info.getValue()} €` : "Non défini"),
            header: "Prix Unitaire (€)",
            enableSorting: true,
        }),
        columnHelper.display({
            id: "actions",
            cell: ({ row }) => {
                const part = row.original;
                return (
                    <div className="flex gap-2 justify-center">
                        <BsPencil
                            className="h-5 w-5 hover:text-primary cursor-pointer"
                            onClick={() => {
                                setSelectedPart(part);
                                setFormMode("edit");
                                setIsFormOpen(true);
                            }}
                        />
                        <BsTrash2
                            className="h-5 w-5 hover:text-primary cursor-pointer"
                        //onClick={() => handleDelete(part)}
                        />
                    </div>
                );
            },
            header: "Actions",
            enableSorting: false,
        }),
    ] as ColumnDef<Part>[];

  const table = useReactTable({
    data:
      infoUser.type.value === "DEALER"
        ? (data as GetPartsByDealerData)?.partsByDealer || []
        :  [],
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });


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
                        title="Ajouter une piéce"
                        className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-btn-primary py-2 px-2 text-center text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
                        icon={<TbSettingsPlus />}
                    />
                </div>
            

    {/* Table */ }
    <div className="overflow-x-auto">
        <table className="min-w-full">
            <thead className="border border-gray">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-gray">
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} className="px-6 py-3">
                                <div className="flex flex-col">
                                    <div
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <span className="text-xs font-semibold text-gray-500 uppercase">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </span>
                                        <span className="ml-2">
                                            {header.column.getIsSorted() === "asc" ? (
                                                <FaSortUp className="h-4 w-4" />
                                            ) : header.column.getIsSorted() === "desc" ? (
                                                <FaSortDown className="h-4 w-4" />
                                            ) : (
                                                <FaSort className="h-4 w-4 text-gray-400" />
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className="bg-white">
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-2 border-gray">
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                className="px-6 py-4 whitespace-nowrap text-sm text-[#999999]"
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>



    </div>  
    </div>  
  );
};
export default PartsList;
