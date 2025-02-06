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
import { useDriversByCompany } from "../../features/driver/hooks/useDriversByCompany";
import DriverForm from "../../features/driver/components/DriverForm";
import Loader from "../../components/Loader";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BsPencil, BsTrash2 } from "react-icons/bs";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import Button from "../../components/Button/Button";
import type {
  GetDriversByCompanyData,
  Driver as DriverType,
} from "../../features/driver/types";
import { Driver } from "../../features/driver/types";
import { getDecodedToken } from "../../utils";

const DiverList = () => {
  const infoUser = getDecodedToken();
  const driverByCompany = useDriversByCompany(infoUser.id);

  const { data, isLoading, isError } = driverByCompany;
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper<DriverType>();
  const [isOpen, setIsOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const columns = [
  columnHelper.accessor("firstName", {
    cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
    header: "Nom",
    enableSorting: true,
  }),
  columnHelper.accessor("licenseNumber", {
    cell: (info) => info.getValue() || "N/A",
    header: "Numéro de permis",
    enableSorting: true,
  }),
  columnHelper.accessor("licenseDate", {
    cell: (info) => info.getValue() || "N/A",
    header: "Date de permis",
    enableSorting: true,
  }),
  columnHelper.accessor("experience", {
    cell: (info) => `${info.getValue()} ans`,
    header: "Expérience",
    enableSorting: true,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const driver = row.original;
      return (
        <div className="flex gap-2 justify-center">
          <BsPencil
            className="h-5 w-5 hover:text-primary cursor-pointer"
            onClick={() => {
              setSelectedDriver(driver);
              setFormMode("edit");
              setIsFormOpen(true);
            }}
          />
          <BsTrash2
            className="h-5 w-5 hover:text-primary cursor-pointer"
            // onClick={() => handleDelete(driver)}
          />
        </div>
      );
    },
    header: "Actions",
    enableSorting: false,
  }),
] as ColumnDef<Driver>[];


  const table = useReactTable({
    data:
      infoUser.type.value === "COMPANY"
        ? (data as GetDriversByCompanyData )?.driversByCompany || []
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
    <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex flex-row justify-between items-center m-4">
          <div className="relative">
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
            placeholder="Recherche globale..."
            value={''}
            onChange={() => ({})}
            className="pl-10 w-64 outline-none border rounded-lg py-2 px-4 border-gray"
          />
          </div>
          <Button
          onClick={() => {
            setFormMode('add');
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



     </div>  
  </div>  
  );
};
export default DiverList;
