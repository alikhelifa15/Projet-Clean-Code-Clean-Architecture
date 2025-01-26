import { Link } from "react-router-dom";
interface ButtonProps {
    to: string;
    className?: string;
    icon?: React.ReactNode;
    title: React.ReactNode;
    onClick?: () => void
    }
const Button: React.FC<ButtonProps> = ({  ...props }) => {
  return (
    <Link
      onClick={props.onClick}
      to={props.to}
      className={props.className}
    >
      <span> {props.icon}</span>
      {props.title}
    </Link>
  );
};

export default Button;
