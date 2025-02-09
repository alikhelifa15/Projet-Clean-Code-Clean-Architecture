import { FaWrench, FaMotorcycle, FaClock } from "react-icons/fa";
import DashboardCard from "../../features/serviceBook/components/motoInfoCard";
import MaintenanceCard from "../../features/serviceBook/components/maintenanceCard";



const ServiceBookMoto = () => {  
    
    const fakeData = [
      {
          "id": 1,
          "motorcycle_id": 1,
          "maintenance_date": "2025-02-08T00:00:00.000Z",
          "type": "Vidange",
          "description": "Vidange moteur et remplacement du filtre à huile",
          "total_cost": "56.75",
          "recommendations": "Vérifier les freins après 1000 km",
          "status": "planned",
          "usedParts": []
      },
      {
          "id": 2,
          "motorcycle_id": 1,
          "maintenance_date": "2025-02-08T00:00:00.000Z",
          "type": "Vidange",
          "description": "Vidange moteur et remplacement du filtre à huile",
          "total_cost": "56.75",
          "recommendations": "Vérifier les freins après 1000 km",
          "status": "planned",
          "usedParts": []
      },
      {
          "id": 3,
          "motorcycle_id": 1,
          "maintenance_date": "2025-02-08T00:00:00.000Z",
          "type": "Vidange",
          "description": "Vidange moteur et remplacement du filtre à huile",
          "total_cost": "56.75",
          "recommendations": "Vérifier les freins après 1000 km",
          "status": "planned",
          "usedParts": [
              {
                  "id": 11,
                  "maintenance_id": 3,
                  "part_id": 101,
                  "quantity": 2,
                  "unit_price": "15.50",
                  "part": {
                      "id": 101,
                      "reference": "ref22",
                      "name": "TES",
                      "description": "TES",
                      "current_stock": 15,
                      "alert_threshold": 6,
                      "unit_price": "7.00"
                  }
              },
              {
                  "id": 12,
                  "maintenance_id": 3,
                  "part_id": 102,
                  "quantity": 1,
                  "unit_price": "25.75",
                  "part": {
                      "id": 102,
                      "reference": "ref22",
                      "name": "TES",
                      "description": "TES",
                      "current_stock": 15,
                      "alert_threshold": 6,
                      "unit_price": "7.00"
                  }
              }
          ]
      }
  ];


    return (
        <>
        <div className="grid grid-cols-3 gap-4">
      <DashboardCard
        text="Total Entretiens"
        value={25}
        icon={<FaWrench />}
        bgColor="bg-blue-500"
      />
      <DashboardCard
        text="Motos en Réparation"
        value={5}
        icon={<FaMotorcycle />}
        bgColor="bg-red-500"
      />
      <DashboardCard
        text="Temps Moyen d'Entretien"
        value="2h30"
        icon={<FaClock />}
        bgColor="bg-green-500"
      />
    </div>
    <div className="grid md:grid-cols-1 gap-6 p-6">
      {fakeData.map((maintenance, index) => (
        <MaintenanceCard key={index} {maintenance.maintenance_date,maintenance.type,maintenance.description,maintenance.total_cost,maintenance.usedParts}  />
      ))}
    </div>
    </>
    );
};

export default ServiceBookMoto