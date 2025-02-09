import { FaWrench, FaMotorcycle, FaClock } from "react-icons/fa";
import DashboardCard from "../../features/serviceBook/components/motoInfoCard";
import MaintenanceCard from "../../features/serviceBook/components/maintenanceCard";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MaintenanceForm from "../../features/maintenance/components/MaintenanceForm";



  
const ServiceBook = () => {  
  const location = useLocation();
console.log("URL complète :", location.pathname);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
const [isFormOpen, setIsFormOpen] = useState(true);
const { id } = useParams(); 
    //const [moto, setMoto] = useState<Moto | null>(null);


    const fakeData = [
        {
          date: "12 Janvier 2024",
          pieces: [
            { name: "Filtre à air", price: 15 },
            { name: "Bougies", price: 30 }
          ],
          totalPrice: 115
        },
        {
          date: "05 Février 2024",
          pieces: [{ name: "Plaquettes de frein", price: 40 }],
          totalPrice: 65
        }
      ];



    return (
        <>
        <h2><p>ID du véhicule : {id}</p></h2>
        <div className="grid grid-cols-3 gap-4">
          <MaintenanceForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          maintenance={ undefined}
          mode={formMode}
          />

      <DashboardCard
        text="Total Entretiens"
        value={25}
        icon={<FaWrench />}
        bgColor="#43597d"
      />
      <DashboardCard
        text="Motos en Réparation"
        value={5}
        icon={<FaMotorcycle />}
        bgColor="#00000063"
      />
      <DashboardCard
        text="Temps Moyen d'Entretien"
        value="2h30"
        icon={<FaClock />}
        bgColor="#5d816a"
      />
    </div>
    <div className="grid md:grid-cols-1 gap-6 p-6">
      {fakeData.map((maintenance, index) => (
        <MaintenanceCard key={index} {...maintenance}  />
      ))}
    </div>
    </>
    );
};

export default ServiceBook