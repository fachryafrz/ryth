import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import { Link, NavLink } from "react-router-dom";
import logo from "/Rhythmic.png";
import links from "../json/sidebarLinks.json";
import { useEffect, useState } from "react";

export default function Sidebar({ sidebarToggle }) {
  return (
    <nav
      className={`${
        !sidebarToggle ? `min-w-[250px]` : `min-w-fit`
      } h-[100svh] sticky top-0 bg-neutral-800 p-4 overflow-y-auto hidden sm:flex flex-col gap-4`}
    >
      <Link
        to={`/`}
        className={`${
          !sidebarToggle && `p-4`
        } flex items-center gap-2 max-w-fit mx-auto`}
      >
        <figure className={`w-[40px]`}>
          <img src={logo} alt={import.meta.env.VITE_APP_NAME} />
        </figure>
        {!sidebarToggle && (
          <h1 className={`font-medium text-2xl`}>
            {import.meta.env.VITE_APP_NAME}
          </h1>
        )}
      </Link>
      <NavLink
        to={`/search`}
        activeClassName="!bg-white !text-neutral-900"
        className={`btn justify-center aspect-square ${
          !sidebarToggle && `!justify-start aspect-auto`
        }`}
      >
        <IonIcon icon={Icon.search} />
        {!sidebarToggle && "Search..."}
      </NavLink>
      {links.map((item, index) => {
        return (
          <section key={index}>
            <h2
              className={`text-sm text-neutral-500 font-medium mb-1 mx-auto max-w-fit ${
                !sidebarToggle && `mx-0`
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
                      className={`flex items-center gap-2 p-4 rounded-lg text-neutral-500 font-medium hover:text-white transition-all mt-0.5 justify-center aspect-square ${
                        !sidebarToggle && `py-2 !justify-start aspect-auto`
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
        className={`btn w-full mt-auto bg-red-900 text-red-600 border-2 border-red-600 justify-center aspect-square hover:bg-red-600 hover:text-white ${
          !sidebarToggle && `!justify-start aspect-auto`
        }`}
      >
        <IonIcon icon={Icon.logOutOutline} />
        {!sidebarToggle && `Logout`}
      </button>
    </nav>
  );
}
