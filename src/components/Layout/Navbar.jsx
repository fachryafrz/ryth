"use client";

import Logout from "../Auth/Logout";
import SearchBar from "./SearchBar";
import { Menu } from "react-ionicons";
import Login from "../Auth/Login";
import { useAuth } from "@/hooks/auth";

export default function Navbar({ authorizationURL, client_id }) {
  const { user } = useAuth();

  return (
    <nav className={`z-40 flex items-center justify-between gap-4 p-4 py-2`}>
      <label
        htmlFor="sidebar"
        className="btn btn-square btn-primary drawer-button fixed left-4 top-2 rounded-full lg:hidden"
      >
        <Menu color={`#ffffff`} />
      </label>

      <SearchBar />

      {!user ? (
        <Login authorizationURL={authorizationURL} client_id={client_id} />
      ) : (
        <Logout user={user} />
      )}
    </nav>
  );
}
