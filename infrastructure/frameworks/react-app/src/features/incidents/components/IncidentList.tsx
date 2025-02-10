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
import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";

import { BsPencil, BsTrash2 } from "react-icons/bs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Loader from "../../../components/Loader";
import Button from "../../../components/Button/Button";
import ConfirmationPopup from "../../../components/Popup/ConfirmationPopup";
import {
  GetIncidentsByCompanyData,
  GetIncidentsByDealerData,
  Incident,
} from "../types";

interface IncidentListProps {
  data?: GetIncidentsByCompanyData | GetIncidentsByDealerData;
  isLoading: boolean;
  isError: boolean;
  onEdit: (incident: Incident) => void;
  onDelete: (incident: Incident) => void;
  onAdd: () => void;
  userType: "COMPANY" | "DEALER";
}

const IncidentList: React.FC<IncidentListProps> = ({
  data,
  isLoading,
  isError,
  onEdit,
  onDelete,
  onAdd,
  userType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const columnHelper = createColumnHelper<Incident>();

  const getSeverityBadgeStyle = (severity: string) => {
    switch (severity) {
      case "Faible":
        return "bg-green-100 text-green-800";
      case "Moyen":
        return "bg-yellow-100 text-yellow-800";
      case "Élevé":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case "accident":
        return "bg-red-100 text-red-800";
      case "infraction":
        return "bg-orange-100 text-orange-800";
      case "technical":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsOpen(true);
  };

  const confirmDelete = () => {
    if (selectedIncident) {
      onDelete(selectedIncident);
      setIsOpen(false);
    }
  };

  const columns = [
    columnHelper.accessor("test.motorcycle", {
      cell: (info) => `${info.getValue().brand} ${info.getValue().model}`,
      header: "Moto",
      enableSorting: true,
    }),

    ...(userType === "COMPANY"
      ? [
          columnHelper.accessor(
            (row) =>
              row.test.driver
                ? `${row.test.driver.firstName} ${row.test.driver.lastName}`
                : "Non assigné",
            {
              id: "driverName",
              header: "Conducteur",
              enableSorting: true,
            }
          ),
        ]
      : [
          columnHelper.accessor(
            (row) =>
              row.test.client
                ? `${row.test.client.first_name} ${row.test.client.last_name}`
                : "Non assigné",
            {
              id: "clientName",
              header: "Client",
              enableSorting: true,
            }
          ),
        ]),

    columnHelper.accessor("incident_Date", {
      cell: (info) =>
        format(new Date(info.getValue()), "dd/MM/yyyy HH:mm", { locale: fr }),
      header: "Date de l'incident",
      enableSorting: true,
    }),

    columnHelper.accessor("type", {
      cell: (info) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeStyle(
            info.getValue()
          )}`}
        >
          {info.getValue()}
        </span>
      ),
      header: "Type",
      enableSorting: true,
    }),

    columnHelper.accessor("severity", {
      cell: (info) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityBadgeStyle(
            info.getValue()
          )}`}
        >
          {info.getValue()}
        </span>
      ),
      header: "Sévérité",
      enableSorting: true,
    }),

    columnHelper.accessor("description", {
      cell: (info) => info.getValue() || "-",
      header: "Description",
      enableSorting: false,
    }),

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => {
        const incident = row.original;
        return (
          <div className="flex gap-2 justify-center">
            <BsPencil
              className="h-5 w-5 hover:text-primary cursor-pointer"
              onClick={() => onEdit(incident)}
              title="Modifier"
            />
            <BsTrash2
              className="h-5 w-5 hover:text-primary cursor-pointer"
              onClick={() => handleDelete(incident)}
              title="Supprimer"
            />
          </div>
        );
      },
      header: "Actions",
      enableSorting: false,
    }),
  ] as ColumnDef<Incident>[];

  const tableData = useMemo(() => {
    if (!data) return [];
    return userType === "COMPANY"
      ? (data as GetIncidentsByCompanyData).incidentsByCompany
      : (data as GetIncidentsByDealerData).incidentsByDealer;
  }, [data, userType]);

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
      <ConfirmationPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmation de suppression"
        message="Êtes-vous sûr de vouloir supprimer cet incident ?"
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
            onClick={onAdd}
            to="#"
            title="Créer un incident"
            className="flex items-center justify-center gap-2.5 rounded-lg bg-primary py-2 px-4 text-center text-white hover:bg-opacity-90"
            icon={<CgDanger />}
          />
        </div>

        <div className="overflow-x-auto">
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

export default IncidentList;
