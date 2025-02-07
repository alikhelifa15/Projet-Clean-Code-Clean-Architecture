import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useDriversByCompany } from "../../features/driver/hooks/useDriversByCompany";
import DriverForm from "../../features/driver/components/DriverForm";
import ConfirmationPopup from "../../components/Popup/ConfirmationPopup";
import Loader from "../../components/Loader";
import { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BsPencil, BsTrash2 } from "react-icons/bs";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import Button from "../../components/Button/Button";
import { Driver } from "../../features/driver/types";
import { driverApi } from "../../features/driver/api/rest";
import { getDecodedToken } from "../../utils";

const DriverList = () => {
  console.log("PartsList component mounted");
  const infoUser = getDecodedToken();
  console.log("infoUser", infoUser);
  
  const { data, isLoading, isError } = useDriversByCompany(infoUser.id);
  
  const [globalFilter, setGlobalFilter] = useState("");
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isOpen, setIsOpen] = useState(false);
// Mutation pour supprimer un driver
const deleteMutation = useMutation<void, Error, string>({
   mutationFn: async (driverId: string) => {
      await driverApi.deleteDriver(driverId);
    },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["drivers"] });
    setIsOpen(false);
  },
});

// Fonction qui prépare la suppression
const handleDelete = (driver: Driver) => {
  setSelectedDriver(driver);
  setIsOpen(true); 
};

// Fonction qui exécute la suppression
const confirmDelete = () => {
  if (selectedDriver) {
    toast.promise(
      deleteMutation.mutateAsync(selectedDriver.id.toString()),
      {
        pending: "Suppression en cours...",
        success: "Driver supprimé avec succès",
        error: "Erreur lors de la suppression",
      }
    );
  }
};

  // Définir les colonnes avec useMemo pour éviter les re-rendus inutiles
  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "Nom",
        cell: ({ row }: { row: any }) => 
          `${row.original.firstName} ${row.original.lastName}`,
      },
      {
        accessorKey: "licenseNumber",
        header: "Numéro de permis",
        cell: (info: any) => info.getValue(),
      },
      {
        accessorKey: "licenseDate",
        header: "Date de permis",
        cell: (info: any) => info.getValue(),
      },
      {
        accessorKey: "experience",
        header: "Expérience",
        cell: (info: any) => `${info.getValue()} ans`,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }: { row: any }) => (
          <div className="flex gap-2">
            <BsPencil
              className="h-5 w-5 hover:text-primary cursor-pointer"
              onClick={() => {
                setSelectedDriver(row.original);
                setFormMode("edit");
                setIsFormOpen(true);
              }}
            />
            <BsTrash2
              className="h-5 w-5 hover:text-primary cursor-pointer"
              onClick={() => handleDelete(row.original)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const tableData = useMemo(() => {
    if (infoUser.type.value === "COMPANY") {
      return data?.driversByCompany || [];
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
      <DriverForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        driver={selectedDriver || undefined}
        mode={formMode}
      />
      <ConfirmationPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmation de suppression"
        message="Êtes-vous sûr de vouloir supprimer ce Conducteur ?"
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
              setSelectedDriver(null);
              setIsFormOpen(true);
            }}
            to="#"
            title="Ajouter un motard"
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-btn-primary py-2 px-2 text-center text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
            icon={<GiFullMotorcycleHelmet />}
          />
        </div>
        {/* Table */}
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

export default DriverList;