import  { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/logoDark.png";
import { FaBook } from "react-icons/fa6";
import { FaMotorcycle } from "react-icons/fa6";
import { MdSportsMotorsports } from "react-icons/md";
import { BsFillPeopleFill, BsTools } from "react-icons/bs";
import { TbSettingsCog } from "react-icons/tb";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useAuth } from "../../features/auth/hooks/useAuth";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLButtonElement | null>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const { userType } = useAuth();
  const canAccessMenu = (allowedTypes: string[]): boolean => {
    return userType ? allowedTypes.includes(userType) : false;
  };
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-4">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className=" py-4 px-4  lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
             
              {/* <!-- Menu Item service book --> */}
              {/* <li>
                {canAccessMenu(["ADMIN", "COMPANY", "DEALER"]) && (
                  <NavLink
                    to="/dashboard/service-book"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("service-book") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <FaBook />
                    Carnet d'entretien
                  </NavLink>
                )}
              </li> */}
              {/* <!-- Menu Item service book --> */}

              {/* <!-- Menu Item users --> */}
              <li>
                {canAccessMenu(["ADMIN"]) && (
                  <NavLink
                    to="/dashboard/users"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("users") && "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                        fill=""
                      />
                      <path
                        d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                        fill=""
                      />
                    </svg>
                    Utilisateurs
                  </NavLink>
                )}
              </li>
              {/* <!-- Menu Item Profile --> */}
              {/* <!-- Menu Item Motorcycle --> */}

              <li>
                {canAccessMenu(["ADMIN", "COMPANY", "DEALER"]) && (
                  <NavLink
                    to="/dashboard/motorcycle"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("motorcycle") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <FaMotorcycle size={20} />
                    Motos
                  </NavLink>
                )}
              </li>
              {/* <!-- Menu Item Motorcycle --> */}
              {/* <!-- Menu Item driver --> */}
              <li>
                {canAccessMenu(["ADMIN", "COMPANY"]) && (
                  <NavLink
                    to="/dashboard/driver"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("driver") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <MdSportsMotorsports size={20} />
                    Conducteur
                  </NavLink>
                )}
              </li>
              {/* <!-- Menu Item driver --> */}
              {/* <!-- Menu Item parts --> */}
              <li>
                {canAccessMenu(["ADMIN"]) && (
                  <NavLink
                    to="/dashboard/parts"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("parts") && "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <BsTools />
                    Pièces
                  </NavLink>
                )}
              </li>
              {/* <!-- Menu Item parts --> */}

              {/* <!-- Menu Item costumer --> */}
              <li>
                {canAccessMenu(["ADMIN", "DEALER"]) && (
                  <NavLink
                    to="/dashboard/client"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("client") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <BsFillPeopleFill />
                    Clients
                  </NavLink>
                )}
              </li>
              {/* <!-- Menu Item costumer --> */}
              {/* <!-- Menu Item test --> */}
              <li>
                {canAccessMenu(["ADMIN", "DEALER", "COMPANY"]) && (
                  <NavLink
                    to="/dashboard/test"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("test") && "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <TbSettingsCog />
                    Essais
                  </NavLink>
                )}
              </li>
              {/* <!-- Menu Item test --> */}
              {/* <!-- Menu Item Incident --> */}
              <li>
                {canAccessMenu(["ADMIN", "DEALER", "COMPANY"]) && (
                  <NavLink
                    to="/dashboard/incident"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("incident") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <MdOutlineErrorOutline />
                    Incidents
                  </NavLink>
                )}
              </li>
              {/* <!-- Menu Item Incident --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
