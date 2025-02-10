import React from "react";
import { jsPDF } from "jspdf";

interface MaintenanceCardProps {
  date: string;
  pieces: { name: string; price: number; quantity: number; }[];
  totalPrice: number;
  recommendation:string
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ date, pieces, totalPrice,recommendation }) => {
  const downloadReport = () => {
    try {
      const doc = new jsPDF();
      
      // Titre
      doc.setFontSize(18);
      doc.text("Rapport d'entretien", 14, 22);
      
      // Détails de l'entreprise
      doc.setFontSize(12);
      doc.text('Triumph company', 140, 22);
      doc.text('123 rue de la Mécanique, Paris', 140, 30);
      doc.text('+33 1 23 45 67 89', 140, 38);
      doc.text('garage@triumph.fr', 140, 46);
      
      // Détails de l'entretien
      doc.text(`Date de l'entretien: ${date}`, 14, 38);
      
      // Ligne horizontale
      doc.setLineWidth(0.2);
      doc.line(14, 52, 200, 52);
 
      // Liste des pièces
      let yPos = 70;
      doc.setFontSize(14);
      doc.text('Pièces et services fournis', 14, yPos);
      
      // En-têtes
      yPos += 10;
      doc.setFontSize(12);
      doc.text('Pièce ou service', 14, yPos);
      doc.text('Prix', 80, yPos);
      doc.text('Quantité', 120, yPos);
      doc.text('Total', 160, yPos);
      
      // Ligne sous les en-têtes
      yPos += 2;
      doc.line(14, yPos, 200, yPos);
      
      // Liste des pièces
      pieces.forEach((piece) => {
        yPos += 10;
        const totalPiece = piece.price * piece.quantity;
        
        doc.text(piece.name, 14, yPos);
        doc.text(`${piece.price.toFixed(2)} €`, 80, yPos);
        doc.text(piece.quantity.toString(), 120, yPos);
        doc.text(`${totalPiece.toFixed(2)} €`, 160, yPos);
      });
      
      // Ligne avant le total
      yPos += 5;
      doc.line(14, yPos, 200, yPos);
      
      // Total
      yPos += 10;
      doc.setFontSize(14);
      doc.text('Total:', 120, yPos);
      doc.text(`${totalPrice.toFixed(2)} €`, 160, yPos);
      
      // Ligne avant le total
      yPos += 50;
      doc.text("Recommendations : ", 14, yPos);
      yPos += 5;
      doc.text(recommendation, 14, yPos);

      // Sauvegarde du PDF
      const fileName = `rapport_entretien_${date.replace(/\//g, '-')}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      {/* Date */}
      <h3 className="text-xl font-semibold text-gray-800">Entretien du {date}</h3>

      {/* Liste des pièces */}
      <div className="mt-4">
        <h4 className="text-lg font-medium text-gray-700">Pièces remplacées ou services :</h4>
        <ul className="mt-2 text-sm text-gray-600">
          {pieces.map((piece, index) => (
            <li key={index} className="flex justify-between py-1 border-b last:border-b-0">
              <span>{piece.name}</span>
              <span className="font-semibold text-gray-800">{piece.price}€ X {piece.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="text-lg font-medium text-gray-700">Recommendations et remarque :</h4>
        <ul className="mt-2 text-sm text-gray-600">
            <li className="flex justify-between py-1 border-b last:border-b-0">
              <span>{recommendation}</span>
            </li>
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
        onClick={downloadReport}
      >
        Télécharger le rapport
      </button>
    </div>
  );
};

export default MaintenanceCard;