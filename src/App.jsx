import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
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
      <div id="app" className="bg-gray-900 text-white min-h-screen flex">
        <Sidebar />
        <main className={`p-4 mb-[82px] relative w-full overflow-hidden`}>
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
        <div className={`flex justify-center`}>
          <MusicPlayer songList={songList} setSongList={setSongList} />
        </div>
      </div>
    </Router>
  );
}

export default App;
