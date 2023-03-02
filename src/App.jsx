import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, RightPanel, Sidebar } from "./components/Components";
import { Home, Artist, Home2 } from "./pages/Pages";
import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";

function App() {
  const [songList, setSongList] = useState([
    {
      title: "West Coast",
      artist: "OneRepublic",
      duration: 192,
      img_path:
        "https://i.scdn.co/image/ab67616d00001e02929014e8baba6299a54c5b7c",
      file_path: "/OneRepublic/Human (Deluxe)/West Coast.mp3",
    },
  ]);

  return (
    <Router>
      <div id="app" className="bg-gray-900 text-white min-h-screen flex">
        <Sidebar />
        <main className={`p-4 relative w-full overflow-hidden`}>
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
    </Router>
  );
}

export default App;
