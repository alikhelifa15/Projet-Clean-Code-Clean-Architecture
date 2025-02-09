import React from "react";
import { FaTools } from "react-icons/fa";

interface MaintenanceCardProps {
  date: string;
  pieces: { name: string; price: number }[];
  totalPrice: number;
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ date, pieces, totalPrice }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      {/* Date */}
      <h3 className="text-xl font-semibold text-gray-800"> Entretien du {date}</h3>

      {/* Liste des pièces */}
      <div className="mt-4">
        <h4 className="text-lg font-medium text-gray-700">Pièces remplacées :</h4>
        <ul className="mt-2 text-sm text-gray-600">
          {pieces.map((piece, index) => (
            <li key={index} className="flex justify-between py-1 border-b last:border-b-0">
              <span>{piece.name}</span>
              <span className="font-semibold text-gray-800">{piece.price} €</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total */}
      <div className="mt-6 flex justify-between text-lg font-bold text-gray-900">
        <span>Total</span>
        <span>{totalPrice} €</span>
      </div>

      {/* Bouton de téléchargement */}
      <button
        className="mt-4 w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-2 rounded-lg transition"
       
      >
        Télécharger le rapport
      </button>
    </div>
  );
};

export default MaintenanceCard;
