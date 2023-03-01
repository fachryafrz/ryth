import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MusicPlayer, Navbar, Sidebar } from "./components/Components";
import { Home, Artist, Home2 } from "./pages/Pages";
import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";

function App() {
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(false); // Ubah jadi array nanti
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const handleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <Router>
      <div id="app" className="bg-neutral-900 text-white min-h-screen flex">
        <Sidebar sidebarToggle={sidebarToggle} />
        <main className={`p-4 sm:pl-6 relative w-full`}>
          <button
            onClick={handleSidebar}
            className={`z-50 max-w-fit hidden sm:grid place-items-center p-1 rounded-full bg-neutral-800 text-neutral-500 absolute -left-[14px] transition-all hover:bg-white hover:text-neutral-900`}
          >
            <IonIcon
              icon={!sidebarToggle ? Icon.chevronBack : Icon.chevronForward}
            />
          </button>
          <Switch>
            <Route exact path={`/`}>
              <Home2 />
            </Route>
            <Route path={`/artist`}>
              <Artist />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
