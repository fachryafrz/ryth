import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Copyright,
  MusicPlayer,
  Navbar,
  RightPanel,
  Sidebar,
} from "./components/Components";
import { Home, Artist, Home2 } from "./pages/Pages";
import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";

function App() {
  const [songList, setSongList] = useState({});

  return (
    <Router>
      <div className={`min-h-screen bg-neutral-900 text-white `}>
        <div id="app" className="flex">
          <Sidebar />
          <main className={`relative w-full overflow-hidden p-4`}>
            <div className={`-m-4 pb-8`}>
              <Copyright />
            </div>
            <Switch>
              <Route exact path={`/`}>
                <Home2 songList={songList} setSongList={setSongList} />
              </Route>
              <Route path={`/artist`}>
                <Artist />
              </Route>
            </Switch>
          </main>
          <RightPanel songList={songList} setSongList={setSongList} />
        </div>
        <MusicPlayer songList={songList} setSongList={setSongList} />
      </div>
    </Router>
  );
}

export default App;
