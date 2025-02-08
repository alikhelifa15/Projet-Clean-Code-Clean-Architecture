import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  
} from "@tanstack/react-table";
import PartForm from "../../features/parts/components/PartForm";
import { useParts } from "../../features/parts/hooks/useParts";
import ConfirmationPopup from "../../components/Popup/ConfirmationPopup";
import Loader from "../../components/Loader";
import { useState, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BsPencil, BsTrash2 } from "react-icons/bs";
import { TbSettingsPlus } from "react-icons/tb";
import Button from "../../components/Button/Button";
import { Part } from "../../features/parts/types";
import { getDecodedToken } from "../../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partApi } from "../../features/parts/api/rest";
import { toast } from "react-toastify";
import type { GetPartsByDealerData } from "../../features/parts/types";

const PartsList = () => {
  const infoUser = getDecodedToken();
  const { data, isLoading, isError } = useParts();
  const [globalFilter, setGlobalFilter] = useState("");
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const columnHelper = createColumnHelper<Part>();
  // Mutation pour supprimer une pièce
const deleteMutation = useMutation<void, Error, string>({
  mutationFn: async (partId: string) => {
    await partApi.deletePart(partId);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["parts"] });
    setIsOpen(false);
  },
});

// Fonction pour ouvrir le modal de confirmation
const handleDelete = (part: Part) => {
  setSelectedPart(part);
  setIsOpen(true);;
};

// Fonction pour confirmer la suppression
const confirmDelete = () => {
  if (selectedPart) {
    toast.promise(
      deleteMutation.mutateAsync(selectedPart.id.toString()),
      {
        pending: "Suppression en cours...",
        success: "Pièce supprimée avec succès",
        error: "Erreur lors de la suppression",
      }
    );
  }
};
  // Mémorisation des colonnes avec useMemo
  const columns = useMemo(
    () => [
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
                onClick={() => handleDelete(part)}
              />
            </div>
          );
        },
        header: "Actions",
        enableSorting: false,
      }),
    ],
    []
  );

  // Mémorisation des données de la table
  const tableData = useMemo(() => {
    
    if (infoUser.type.value === "DEALER") {
      return (data as GetPartsByDealerData)?.parts || [];
    }
    return [];
  }, [data, infoUser.type.value]);

  const table = useReactTable({
    data: tableData,
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

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg border border-red-200">
        Une erreur est survenue lors du chargement des données
      </div>
    );
  }

  return (
    <div className="p-4">
      <PartForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        part={selectedPart || undefined}
        mode={formMode}
      />
      <ConfirmationPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmation de suppression"
        message="Êtes-vous sûr de vouloir supprimer cette piéce ?"
      />
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex flex-row justify-between items-center m-4">
          <div className="relative">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              placeholder="Recherche globale..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
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
            title="Ajouter une pièce"
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-btn-primary py-2 px-2 text-center text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
            icon={<TbSettingsPlus />}
          />
        </div>

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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

         {/* Pagination */}
         <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex flex-row items-center gap-2">
              <span className="text-sm text-zinc-400">
                Page{" "}
                <span className="font-semibold">
                  {table.getState().pagination.pageIndex + 1}
                </span>{" "}
                sur{" "}
                <span className="font-semibold">{table.getPageCount()}</span>
              </span>
              <span className="text-sm flex items-center gap-1 text-zinc-400">
                | Aller à la page:
                <input
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="border p-1 rounded w-16"
                />
              </span>
            </div>

            <div className="flex gap-x-2">
              <button
                className={`border-none ${
                  !table.getCanPreviousPage()
                    ? "text-[#999999]"
                    : "text-primary"
                }`}
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>
              <button
                className={`border-none ${
                  !table.getCanPreviousPage()
                    ? "text-[#999999]"
                    : "text-primary"
                }`}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>

              <span className="bg-primary text-white rounded px-2">
                {table.getState().pagination.pageIndex + 1}
              </span>

              <button
                className={`border-none ${
                  !table.getCanNextPage() ? "text-[#999999]" : "text-primary"
                }`}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
              <button
                className={`border-none ${
                  !table.getCanNextPage() ? "text-[#999999]" : "text-primary"
                }`}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsList;