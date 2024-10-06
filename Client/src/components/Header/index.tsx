import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { menuData } from "./menuData";
import { FaXmark, FaBars } from "react-icons/fa6";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const generalMenuItems = menuData.filter(
    (item) => item.id !== 5 && item.id !== 6
  );
  const authMenuItems = menuData.filter(
    (item) => item.id === 5 || item.id === 6
  );

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-99 transition-all duration-300 shadow-2 bg-white ">
      <div className="flex flex-row p-3 items-center justify-between">
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="w-40 h-20 mr-30" />
        </Link>
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? (
            <FaXmark className="w-10 h-10 text-neutral-600" />
          ) : (
            <FaBars className="w-10 h-10 text-neutral-600" />
          )}
        </button>
        <nav
          className={`absolute top-24 right-0 px-3 w-full bg-white md:static md:flex md:items-center md:flex-row justify-between transition-transform duration-300 ease-linear transform ${
            isMenuOpen
              ? "translate-y-0 opacity-100 shadow-lg"
              : "-translate-y-full opacity-0"
          } md:translate-y-0 md:shadow-none md:opacity-100`}
        >
          <div
            className={`flex-col md:flex-row transition-all duration-300 ${
              isMenuOpen ? "flex" : "hidden"
            } md:flex`}
          >
            {generalMenuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={closeMenu}
                className={`font-semibold md:mr-7 py-5 border-b border-[#e4e3e3] md:border-none ${
                  location.pathname === item.path ? "text-[#f27f18]" : ""
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div
            className={`flex-col md:flex-row md:space-x-8 transition-all duration-300 ${
              isMenuOpen ? "flex" : "hidden"
            } md:flex`}
          >
            {authMenuItems.map((item) =>
              item.id === 6 ? (
                <Link
                  to={"/login"}
                  key={item.id}
                  onClick={closeMenu}
                  className="bg-btn-primary text-white rounded-xl px-5 py-2 my-3 w-auto self-start"
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={closeMenu}
                  className={`hover:text-[#f27f18] py-5 font-semibold border-b border-[#e4e3e3] md:border-none ${
                    location.pathname === item.path ? "text-[#f27f18]" : ""
                  }`}
                >
                  {item.title}
                </Link>
              )
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
