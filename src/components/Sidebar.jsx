import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import { Link, NavLink } from "react-router-dom";
import logo from "/Rhythmic.png";
import links from "../json/sidebarLinks.json";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  const handleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <nav
      style={{
        height: "calc(100svh - 82px)",
      }}
      className={`${
        !sidebarToggle ? `min-w-[250px]` : `min-w-fit`
      } sticky top-0 hidden flex-col gap-4 overflow-y-auto border-r border-neutral-700 p-4 xl:flex`}
    >
      <div
        className={`flex items-center gap-4 ${
          !sidebarToggle ? `flex-row` : `flex-col`
        }`}
      >
        <button onClick={handleSidebar} className={`arrow-btn z-50 max-w-fit`}>
          <IonIcon
            icon={!sidebarToggle ? Icon.chevronBack : Icon.chevronForward}
          />
        </button>
        <Link
          to={`/`}
          className={`${
            !sidebarToggle && `p-0`
          } flex max-w-fit items-center gap-2`}
        >
          <figure className={!sidebarToggle ? `w-[40px]` : `w-[30px]`}>
            <img src={logo} alt={import.meta.env.VITE_APP_NAME} />
          </figure>
          {!sidebarToggle && (
            <h1 className={`text-2xl font-medium`}>
              {import.meta.env.VITE_APP_NAME}
            </h1>
          )}
        </Link>
      </div>
      {links.map((item, index) => {
        return (
          <section key={index}>
            <h2
              className={`mx-auto mb-1 max-w-fit text-sm font-medium text-neutral-500 ${
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
                      className={`mt-0.5 flex aspect-square items-center justify-center gap-2 rounded-lg p-4 font-medium text-neutral-500 transition-all hover:text-white ${
                        !sidebarToggle && `!aspect-auto !justify-start py-2`
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
    </nav>
  );
}
