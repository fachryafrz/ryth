import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import { Link, NavLink } from "react-router-dom";
import logo from "/Rhythmic.png";
import links from "../json/sidebarLinks.json";
import { useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";
import user from "../json/user.json";
import userItems from "../json/userItems.json";

export default function RightPanel({ songList, setSongList }) {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
      } sticky top-0 border-l border-gray-700 overflow-y-auto hidden xl:flex flex-col gap-4`}
    >
      <button
        className={`flex items-center gap-2 rounded sticky top-0 bg-gray-900 pt-4 pb-2 px-4`}
      >
        <figure className={`aspect-square w-[40px] rounded overflow-hidden`}>
          <img src={user.img_path} alt={user.name} />
        </figure>
        <div className={`text-left flex flex-col`}>
          <h2 className={`text-sm font-medium`}>{user.name}</h2>
          <span
            className={`text-[12px] text-gray-400 font-medium uppercase tracking-widest`}
          >
            {user.plan.name}
          </span>
        </div>
      </button>

      <div className={`flex flex-col gap-2 px-4`}>
        <nav
          aria-label="Tabs"
          className={`flex items-center text-sm gap-4 font-medium`}
        >
          {userItems.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`transition-all ${
                  activeTab === index ? `text-white` : `text-gray-600`
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </nav>
        <div className={`flex flex-col gap-1 max-h-full overflow-auto`}>
          {userItems[activeTab].contents.map((item, index) => {
            return (
              <button
                key={index}
                className={`flex items-center gap-2 hover:bg-gray-800 rounded`}
              >
                <figure className={`max-w-[30px] rounded overflow-hidden`}>
                  <img src={item.img_path} alt={item.name} />
                </figure>
                <span className={`line-clamp-1 text-sm font-medium`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`hidden p-4 sticky bottom-0 mt-auto bg-gray-900`}>
        <MusicPlayer songList={songList} setSongList={setSongList} />
      </div>
    </nav>
  );
}
