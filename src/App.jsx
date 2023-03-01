import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Components";
import { Home, Artist } from "./pages/Pages";

function App() {
  return (
    <Router>
      <div id="app" className="bg-neutral-900 text-white min-h-screen">
        <Switch>
          <Route exact path={`/`}>
            <Home />
          </Route>
          <Route path={`/artist`}>
            <Artist />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
