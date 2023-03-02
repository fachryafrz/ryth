import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import { Link, NavLink } from "react-router-dom";
import logo from "/Rhythmic.png";
import links from "../json/sidebarLinks.json";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const handleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <nav
      className={`${
        !sidebarToggle ? `min-w-[250px]` : `min-w-fit`
      } h-[100svh] sticky top-0 border-r border-gray-700 overflow-y-auto p-4 hidden sm:flex flex-col gap-4`}
    >
      <div
        className={`flex gap-2 items-center ${
          !sidebarToggle ? `flex-row` : `flex-col`
        }`}
      >
        <button onClick={handleSidebar} className={`z-50 max-w-fit arrow-btn`}>
          <IonIcon
            icon={!sidebarToggle ? Icon.chevronBack : Icon.chevronForward}
          />
        </button>
        <Link
          to={`/`}
          className={`${
            !sidebarToggle && `p-0`
          } flex items-center gap-2 max-w-fit`}
        >
          <figure className={!sidebarToggle ? `w-[40px]` : `w-[30px]`}>
            <img src={logo} alt={import.meta.env.VITE_APP_NAME} />
          </figure>
          {!sidebarToggle && (
            <h1 className={`font-medium text-2xl`}>
              {import.meta.env.VITE_APP_NAME}
            </h1>
          )}
        </Link>
      </div>
      <NavLink
        to={`/search`}
        activeClassName="!bg-white !text-gray-900"
        className={`btn justify-center aspect-square ${
          !sidebarToggle && `!justify-start !aspect-auto`
        }`}
      >
        <IonIcon icon={Icon.search} />
        {!sidebarToggle && "Search..."}
      </NavLink>
      {links.map((item, index) => {
        return (
          <section key={index}>
            <h2
              className={`text-sm text-gray-500 font-medium mb-1 mx-auto max-w-fit ${
                !sidebarToggle && `!mx-0`
              }`}
            >
              {item.section}
            </h2>
            <ul>
              {item.links.map((link, index) => {
                const [icons, setIcons] = useState([]);
                useEffect(() => {
                  const getIcons = () => {
                    setIcons(item.links.map((genre) => Icon[genre.icon]));
                  };
                  getIcons();
                }, []);
                return (
                  <li>
                    <NavLink
                      exact
                      to={link.url}
                      key={index}
                      activeClassName={`nav-active`}
                      className={`flex items-center gap-2 p-4 rounded-lg text-gray-500 font-medium hover:text-white transition-all mt-0.5 justify-center aspect-square ${
                        !sidebarToggle && `py-2 !justify-start !aspect-auto`
                      }`}
                    >
                      <IonIcon icon={icons[index]} />
                      {!sidebarToggle && link.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
      <button
        onClick={() => confirm("Are you sure wants to logout?")}
        className={`btn w-full mt-auto bg-red-900 text-white border-2 border-red-600 justify-center aspect-square hover:bg-red-600 hover:text-white ${
          !sidebarToggle && `!justify-start !aspect-auto`
        }`}
      >
        <IonIcon icon={Icon.logOutOutline} />
        {!sidebarToggle && `Logout`}
      </button>
    </nav>
  );
}
