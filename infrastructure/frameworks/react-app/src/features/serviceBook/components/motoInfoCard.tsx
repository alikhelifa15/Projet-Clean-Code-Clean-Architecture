import React from "react";

interface DashboardCardProps {
  text: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ text, value, icon, bgColor }) => {
  return (
    <div className={`flex items-center p-4 rounded-xl shadow-md text-white`}  style={{ backgroundColor: bgColor }}>
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <p className="text-sm font-light">{text}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;