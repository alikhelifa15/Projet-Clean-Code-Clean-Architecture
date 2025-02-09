import { FaWrench, FaMotorcycle, FaClock } from "react-icons/fa";
import DashboardCard from "../../features/serviceBook/components/motoInfoCard";
import MaintenanceCard from "../../features/serviceBook/components/maintenanceCard";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import MaintenanceForm from "../../features/maintenance/components/MaintenanceForm";
import maintenanceApi from "../../features/maintenance/api/rest";

const ServiceBook = () => {
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
   const [selectedMin, setSelectedMin] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const params = useParams();
  const idMoto = params.idmoto || "";
  const [data, setData] = useState<any[]>([]);

  // Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(2);  
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!idMoto) return;
    const fetchMaintenance = async () => {
      try {
        const result = await maintenanceApi.getMaintenanceByMoto(idMoto);
        setData(result.maintenances);
        setTotalPages(Math.ceil(result.maintenances.length / pageSize));
      } catch (error) {
        setData([]);
      }
    };

    fetchMaintenance();
  }, [idMoto, pageIndex,isFormOpen]);

  const paginatedData = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const formattedData = paginatedData.map((maintenance: any) => ({
    date: new Date(maintenance.maintenance_date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    moto: {
      brand: maintenance.motorcycle.brand,
      model: maintenance.motorcycle.model,
      serialNumber: maintenance.motorcycle.serial_number,
      maintenance_interval: maintenance.motorcycle.maintenance_interval,
      mileage: maintenance.motorcycle.mileage,
    },
    pieces: maintenance.maintenanceUsedParts.map((part: any) => ({
      name: part.part.name,
      price: parseFloat(part.unit_price),
      quantity: part.quantity,
    })),
    totalPrice: parseFloat(maintenance.total_cost),    
  }));
console.log("formattedData",formattedData);

  return (
    <>
     <div className="flex justify-between items-center gap-4 py-6">
     <h1 className="text-xl font-semibold text-gray-800">
     {formattedData.length > 0 && formattedData[0].moto && (
       <>
    <strong className="text-2xl font-mono">Carnet d'entretien du véhicule : {formattedData[0].moto.brand} {formattedData[0].moto.model} - {formattedData[0].moto.mileage} </strong> KM
    </>
    )}
     </h1>

    <Button
      onClick={() => {
        setFormMode("add");
        setSelectedMin(null);
        setIsFormOpen(true);
      }}
      to="#"
      title="Nouvel entretien"
      className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-btn-primary py-2 px-2 text-center text-white hover:bg-opacity-90 lg:px-6 xl:px-8 ml-auto"
      icon={<FaWrench />}
    />
    </div>

      <MaintenanceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maintenance={undefined}
        mode={formMode}
      />

    {formattedData.length == 0  && ( <>  <strong className=" flex text-2xl font-mono justify-center center">Aucun entretien trouvé pour ce véhicule. </strong> </>)}

<div className="grid grid-cols-3 gap-4">
      {formattedData.length > 0 && formattedData[0].moto && (
    <>
    <DashboardCard
        text="Total Entretiens"
        value={data.length}
        icon={<FaWrench />}
        bgColor="#43597d"
      />
      <DashboardCard
        text="Numéro de Série"
        value={formattedData[0].moto.serialNumber}
        icon={<FaMotorcycle />}
        bgColor="#00000063"
      />
      <DashboardCard
        text="Interval de maintenance"
        value={`${formattedData[0].moto.maintenance_interval.toString()} km`}
        icon={<FaClock />}
        bgColor="#b78157"
      />
    </>
  )}
    </div>

    <div className="grid md:grid-cols-1 gap-6 p-6">
      {formattedData.map((maintenance, index) => (
        <MaintenanceCard key={index} {...maintenance} />
      ))}
    </div>

    {/* Pagination */}
    <div className="flex justify-between items-center p-4">
      <button
        className={`px-4 py-2 bg-gray-300 rounded ${pageIndex === 0 ? 'text-gray-400' : 'text-blue-600'}`}
        onClick={() => setPageIndex(0)}
        disabled={pageIndex === 0}
      >
        {"<<"}
      </button>
      <button
        className={`px-4 py-2 bg-gray-300 rounded ${pageIndex === 0 ? 'text-gray-400' : 'text-blue-600'}`}
        onClick={() => setPageIndex(pageIndex - 1)}
        disabled={pageIndex === 0}
      >
        {"<"}
      </button>

      <span>
        Page {pageIndex + 1} sur {totalPages}
      </span>

      <button
        className={`px-4 py-2 bg-gray-300 rounded ${pageIndex === totalPages - 1 ? 'text-gray-400' : 'text-blue-600'}`}
        onClick={() => setPageIndex(pageIndex + 1)}
        disabled={pageIndex === totalPages - 1}
      >
        {">"}
      </button>
      <button
        className={`px-4 py-2 bg-gray-300 rounded ${pageIndex === totalPages - 1 ? 'text-gray-400' : 'text-blue-600'}`}
        onClick={() => setPageIndex(totalPages - 1)}
        disabled={pageIndex === totalPages - 1}
      >
        {">>"}
      </button>
    </div>
    </>
  );
};

export default ServiceBook;
