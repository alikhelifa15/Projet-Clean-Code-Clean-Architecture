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
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BsPencil, BsTrash2 } from "react-icons/bs";
import { FaMotorcycle } from "react-icons/fa6";
import { GrHostMaintenance } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useMotorcyclesByDealer } from "../../features/motos/hooks/useMotorcyclesByDealer";
import Loader from "../../components/Loader";
import type {
  GetMotorcyclesByCompanyData,
  GetMotorcyclesByDealerData,
  Motorcycle,
  MotorcycleResponse,
} from "../../features/motos/types";
import { useMotorcyclesByCompany } from "../../features/motos/hooks/useMotorcyclesByCompany";
import ConfirmationPopup from "../../components/Popup/ConfirmationPopup";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { motorcycleApi } from "../../features/motos/api/rest";
import MotorcycleForm from "../../features/motos/components/MotorcycleForm";
import { toast } from "react-toastify";
import { getDecodedToken } from "../../utils";

const MotorcycleList = () => {
   
  const infoUser = getDecodedToken();

  const companyMotorcyclesQuery = useMotorcyclesByCompany(infoUser.id);
  const dealerMotorcyclesQuery = useMotorcyclesByDealer(infoUser.id);
  const [isOpen, setIsOpen] = useState(false);

  const motorcyclesQuery =
    infoUser.type.value === "COMPANY"
      ? companyMotorcyclesQuery
      : dealerMotorcyclesQuery;
  const { data, isLoading, isError } = motorcyclesQuery;
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper<Motorcycle>();
  const [isFormOpen, setIsFormOpen] = useState(false);
const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motorcycle | null>(null);
  
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const deleteMutation = useMutation<MotorcycleResponse, Error, string>({
    mutationFn: (motorcycleId: string) => motorcycleApi.deleteMotorcycle(motorcycleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motorcycles"] });
      setIsOpen(false);
    },
  });
  const handleDelete = (motorcycle: Motorcycle) => {
    setSelectedMotorcycle(motorcycle);
    setIsOpen(true);
  };
  const confirmDelete = () => {
    if (selectedMotorcycle) {
      toast.promise(
        deleteMutation.mutateAsync(selectedMotorcycle.id.toString()),
        {
          pending: 'Suppression en cours...',
          success: 'Moto supprimée avec succès',
          error: 'Erreur lors de la suppression'
        }
      );
    }
  };
  const handleViewServiceBook = (idMoto: number) => {
    navigate(`/dashboard/service-book/${idMoto}`);
  };
  const columns = [
    columnHelper.accessor("photo", {
      cell: (info) => {
        const photo = info.getValue();
        return photo ? (
          <img src={photo} alt="Photo" style={{ width: 150, height: 100 }} />
        ) : (
          "N/A"
        );
      },
      header: "Photo",
      enableSorting: true,
    }),
    columnHelper.accessor("serialNumber", {
      cell: (info) => info.getValue() || "N/A",
      header: "Numéro de série",
      enableSorting: true,
    }),
    
    columnHelper.accessor("model", {
      cell: (info) => info.getValue() || "N/A",
      header: "Modèle",
      enableSorting: true,
    }),
    columnHelper.accessor("brand", {
      cell: (info) => info.getValue() || "N/A",
      header: "Marque",
      enableSorting: true,
    }),
    columnHelper.accessor("status", {
      cell: (info) => {
        const status = info.getValue() as keyof typeof statusMap;
        const statusMap = {
          active: "Actif",
          maintenance: "En maintenance",
          inactive: "Inactif",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyle(
              status
            )}`}
          >
            {statusMap[status] || status || "N/A"}
          </span>
        );
      },
      header: "Statut",
      enableSorting: true,
    }),
    columnHelper.accessor("mileage", {
      cell: (info) => `${info.getValue()} km`,
      header: "Kilométrage",
      enableSorting: true,
    }),
    columnHelper.accessor("maintenanceInterval", {
      cell: (info) => `${info.getValue()} km`,
      header: "Intervalle maintenance",
      enableSorting: true,
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => {
        const motorcycle = row.original;
        return (
          <div className="flex gap-2 justify-center">
            <BsPencil 
              className="h-5 w-5 hover:text-primary cursor-pointer" 
              onClick={() => {
                setSelectedMotorcycle(motorcycle);
                setFormMode('edit');
                setIsFormOpen(true);
              }}
              
            />
            <BsTrash2 
              className="h-5 w-5 hover:text-primary cursor-pointer" 
              onClick={() => handleDelete(motorcycle)}
            />
            <GrHostMaintenance 
              className="h-5 w-5 hover:text-primary cursor-pointer" 
              onClick={() => handleViewServiceBook(motorcycle.id)}
            />
          </div>
        );
      },
      header: "Actions",
      enableSorting: false,
    }),
  ] as ColumnDef<Motorcycle>[];

  const table = useReactTable({
    data:
      infoUser.type.value === "COMPANY"
        ? (data as GetMotorcyclesByCompanyData)?.motorcyclesByCompany || []
        : (data as GetMotorcyclesByDealerData)?.motorcyclesByDealer || [],
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
      <MotorcycleForm
      isOpen={isFormOpen}
      onClose={() => setIsFormOpen(false)}
      motorcycle={selectedMotorcycle || undefined}
      mode={formMode}
    />
        <ConfirmationPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmation de suppression"
        message="Êtes-vous sûr de vouloir supprimer cette moto ?"
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
            setFormMode('add');
            setSelectedMotorcycle(null);
            setIsFormOpen(true);
          }}
            to="#"
            title="Ajouter une moto"
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-btn-primary py-2 px-2 text-center text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
            icon={<FaMotorcycle />}
          />
        </div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="m-1 w-30 ml-3 p-2.5 rounded-lg border border-gray text-gray-700 sm:text-sm"
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Afficher {pageSize}
            </option>
          ))}
        </select>

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

export default MotorcycleList;
