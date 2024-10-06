import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonPrimaryProps {
  to: string;
  children: React.ReactNode;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      rel="stylesheet"
      className="bg-btn-primary text-white px-5 py-4 rounded-lg font-semibold flex-row items-center inline-flex hover:shadow-6 transition-transform transform hover:scale-105"
    >
      {children}
      <svg
        className="w-6 h-3 ml-2"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.68555 5.37256L1.51758 9.56201C1.30273 9.75537 0.980469 9.75537 0.787109 9.56201L0.292969 9.06787C0.0996094 8.87451 0.0996094 8.55225 0.292969 8.3374L3.60156 5.00732L0.292969 1.69873C0.0996094 1.48389 0.0996094 1.16162 0.292969 0.968262L0.787109 0.474121C0.980469 0.280762 1.30273 0.280762 1.51758 0.474121L5.68555 4.66357C5.87891 4.85693 5.87891 5.1792 5.68555 5.37256Z"
          fill="white"
        />
      </svg>
    </Link>
  );
};

export default ButtonPrimary;
