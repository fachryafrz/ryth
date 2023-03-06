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
      } sticky top-0 hidden flex-col gap-4 overflow-y-auto border-l border-neutral-700 xl:flex`}
    >
      <button
        className={`sticky top-0 flex items-center gap-2 rounded bg-neutral-900 px-4 pt-4 pb-2`}
      >
        <figure className={`aspect-square w-[40px] overflow-hidden rounded`}>
          <img src={user.img_path} alt={user.name} />
        </figure>
        <div className={`flex flex-col text-left`}>
          <h2 className={`text-sm font-medium`}>{user.name}</h2>
          <span
            className={`text-[12px] font-medium uppercase tracking-widest text-neutral-400`}
          >
            {user.plan.name}
          </span>
        </div>
      </button>

      <div className={`flex flex-col gap-2 px-4`}>
        <nav
          aria-label="Tabs"
          className={`flex items-center gap-4 text-sm font-medium`}
        >
          {userItems.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`transition-all ${
                  activeTab === index ? `text-white` : `text-neutral-600`
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </nav>
        <div className={`flex max-h-full flex-col gap-1 overflow-auto`}>
          {userItems[activeTab].contents.map((item, index) => {
            return (
              <button
                key={index}
                className={`flex items-center gap-2 rounded hover:bg-neutral-800`}
              >
                <figure className={`max-w-[30px] overflow-hidden rounded`}>
                  <img src={item.img_path} alt={item.name} />
                </figure>
                <span className={`text-sm font-medium line-clamp-1`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`sticky bottom-0 mt-auto hidden bg-neutral-900 p-4`}>
        <MusicPlayer songList={songList} setSongList={setSongList} />
      </div>
    </nav>
  );
}
