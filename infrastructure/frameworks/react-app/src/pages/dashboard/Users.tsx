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
import { useUsers } from "../../features/users/hooks/useUsers";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsPencil, BsTrash2 } from "react-icons/bs";
import ConfirmationPopup from "../../components/Popup/ConfirmationPopup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../../features/users/api/rest";
import { DeleteUserResponse } from "../../features/users/types";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import UserForm from "../../features/users/components/userForm";
interface User {
  id: number;
  email: string;
  type: string;
  creationDate: string;
}
const Users = () => {
  const { data, isLoading, isError } = useUsers();
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<
    DeleteUserResponse,
    Error,
    number,
    unknown
  >({
    mutationFn: (userId: number) => usersApi.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsOpen(false);
    },
  });
  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };
  const confirmDelete = () => {
    if (selectedUser) {
      toast.promise(
        deleteMutation.mutateAsync(selectedUser.id),
        {
          pending: 'Suppression en cours...',
          success: 'Utilisateur supprimé avec succès',
          error: 'Erreur lors de la suppression'
        }
      );
    }
  };
  const columns = [
    columnHelper.accessor("email", {
      cell: (info) => info.getValue() || "N/A",
      header: "E-mail",
      enableSorting: true,
    }),
    columnHelper.accessor("type", {
      cell: (info) => {
        const type = info.getValue();
        const typeMap = {
          DEALER: "Concessionnaire",
          ADMIN: "Administrateur",
          CLIENT: "Client",
          COMPANY: "Entreprise",
        };
        return typeMap[type] || type || "N/A";
      },
      header: "Utilisateur",
      enableSorting: true,
    }),
    columnHelper.accessor("name", {
      cell: (info) => {
        const user = info.row.original as {
          type: string;
          company: { companyName: string };
          dealer: { name: string; phone: string; address: string };
        };
        if (user.type === "COMPANY") return user.company?.companyName;
        if (user.type === "DEALER") return user.dealer?.name;
        return "N/A";
      },
      header: "Société",
      enableSorting: true,
    }),
    columnHelper.accessor("phone", {
      cell: (info) => {
        const user = (info.row.original as { 
          type: string;
          company: { phone: string };
          dealer: { phone: string };
         })
          if (user.type === "COMPANY") return user.company?.phone;
        if (user.type === "DEALER") return user.dealer?.phone;
        return "N/A";
      },
      header: "Téléphone",
      enableSorting: true,
    }),
    columnHelper.accessor("address", {
      cell: (info) => {
        const user = (info.row.original as {
          type: string;
          company: { address: string };
          dealer: { address: string };
          })
        if (user.type === "COMPANY") return user.company?.address;
        if (user.type === "DEALER") return user.dealer?.address;
        return "N/A";        
      },
      header: "Adresse",
      enableSorting: true,
    }),
    columnHelper.accessor("actions", {
      cell: (info) => {
        const user = info.row.original as User;

        return (
          <div className="flex gap-2 justify-center">
            <BsPencil className="h-5 w-5 hover:text-primary cursor-pointer" onClick={() => handleEdit(user)} />

            <BsTrash2
              className="h-5 w-5 hover:text-primary cursor-pointer"
              onClick={() => handleDelete(user)}
            />
          </div>
        );
      },
      header: "Actions",
      enableSorting: false,
    }),
  ] as ColumnDef<unknown, string>[];

  const table = useReactTable({
    data: data?.users || [],
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg border border-red-200">
        Une erreur est survenue lors du chargement des données
      </div>
    );
  }

  return (
    <div className="p-4">
       <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        user={selectedUser ?? undefined}
      />
      <ConfirmationPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          confirmDelete();
          setIsOpen(false);
        }}
        title="Confirmation de suppression"
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
      />
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex flex-row justify-between items-center m-4">
          <div className="relative ">
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
              setSelectedUser(null);
              setIsFormOpen(true);
            }}
            to="#"
            title="Ajouter un utilisateur"
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-btn-primary py-2 px-2 text-center  text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
            icon={<IoPersonAddSharp />}
          />
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="m-1 w-30 ml-3  p-2.5 rounded-lg border border-gray text-gray-700 sm:text-sm "
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Afficher {pageSize}
            </option>
          ))}
        </select>
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead className=" border border-gray">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-gray">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-3  ">
                      <div className="flex flex-col">
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span className="text-xs font-semibold text-gray-500 uppercase ">
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
            <tbody className="bg-white ">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-2 border-gray">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-[#999999] "
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
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Précédent
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className=" flex flex-row items-center gap-2">
              <span className="text-sm text-zinc-400 fex felx-row items-center">
                Page
                <span className="font-semibold">
                  {" "}
                  {table.getState().pagination.pageIndex + 1}{" "}
                </span>
                sur{" "}
                <span className="font-semibold"> {table.getPageCount()}</span>
              </span>
              <span className=" text-sm flex items-center gap-1 text-zinc-400">
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
                {" "}
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

export default Users;
