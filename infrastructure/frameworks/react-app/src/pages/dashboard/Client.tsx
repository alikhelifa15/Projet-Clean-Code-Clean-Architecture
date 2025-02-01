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
  import { FaUserPlus } from "react-icons/fa";
  import Button from "../../components/Button/Button";
  import { useClientsByDealer } from "../../features/clients/hooks/useClientsByDealer";
  import Loader from "../../components/Loader";
  import { Client, ClientResponse } from "../../features/clients/types";
  import ConfirmationPopup from "../../components/Popup/ConfirmationPopup";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { clientApi } from "../../features/clients/api/rest";
  import ClientForm from "../../features/clients/components/ClientForm";
  import { toast } from "react-toastify";
  import { getDecodedToken } from "../../utils/index";
  
  const ClientList = () => {
    const infoUser = getDecodedToken();
    const clientsQuery = useClientsByDealer(infoUser.id);
    const [isOpen, setIsOpen] = useState(false);
  
    const { data, isLoading, isError } = clientsQuery;
    const [globalFilter, setGlobalFilter] = useState("");
    const columnHelper = createColumnHelper<Client>();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    
    const queryClient = useQueryClient();
  
    const deleteMutation = useMutation<ClientResponse, Error, string>({
      mutationFn: (clientId: string) => clientApi.deleteClient(clientId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["clients"] });
        setIsOpen(false);
      },
    });
  
    const handleDelete = (client: Client) => {
      setSelectedClient(client);
      setIsOpen(true);
    };
  
    const confirmDelete = () => {
      if (selectedClient) {
        toast.promise(
          deleteMutation.mutateAsync(selectedClient.id.toString()),
          {
            pending: 'Suppression en cours...',
            success: 'Client supprimé avec succès',
            error: 'Erreur lors de la suppression'
          }
        );
      }
    };
  
    const columns = [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue() || "N/A",
        header: "Prénom",
        enableSorting: true,
      }),
      columnHelper.accessor("lastName", {
        cell: (info) => info.getValue() || "N/A",
        header: "Nom",
        enableSorting: true,
      }),
      columnHelper.accessor("phone", {
        cell: (info) => info.getValue() || "N/A",
        header: "Téléphone",
        enableSorting: true,
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
          const client = row.original;
          return (
            <div className="flex gap-2 justify-center">
              <BsPencil 
                className="h-5 w-5 hover:text-primary cursor-pointer" 
                onClick={() => {
                  setSelectedClient(client);
                  setFormMode('edit');
                  setIsFormOpen(true);
                }}
              />
              <BsTrash2 
                className="h-5 w-5 hover:text-primary cursor-pointer" 
                onClick={() => handleDelete(client)}
              />
            </div>
          );
        },
        header: "Actions",
        enableSorting: false,
      }),
    ] as ColumnDef<Client>[];
  
    const table = useReactTable({
      data: data?.clientsByDealer || [],
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
        <ClientForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          client={selectedClient || undefined}
          mode={formMode}
        />
        <ConfirmationPopup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={confirmDelete}
          title="Confirmation de suppression"
          message="Êtes-vous sûr de vouloir supprimer ce client ?"
        />
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header avec recherche et bouton d'ajout */}
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
                setSelectedClient(null);
                setIsFormOpen(true);
              }}
              to="#"
              title="Ajouter un client"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-btn-primary py-2 px-2 text-center text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
              icon={<FaUserPlus />}
            />
          </div>
  
          {/* Sélecteur de nombre d'éléments par page */}
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
                      const page = e.target.value ? Number(e.target.value) - 1 : 0;
                      table.setPageIndex(page);
                    }}
                    className="border p-1 rounded w-16"
                  />
                </span>
              </div>
  
              <div className="flex gap-x-2">
                <button
                  className={`border-none ${
                    !table.getCanPreviousPage() ? "text-[#999999]" : "text-primary"
                  }`}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </button>
                <button
                  className={`border-none ${
                    !table.getCanPreviousPage() ? "text-[#999999]" : "text-primary"
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
  
  export default ClientList;