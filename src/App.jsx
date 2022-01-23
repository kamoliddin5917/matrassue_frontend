import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Admin from "./Pages/Admin/Admin";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";

import Public from "./Routes/Public";
import Private from "./Routes/Private";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Private path="/admin" component={Admin} />
        <Public path="/login" component={Login} />
      </Switch>
    </>
  );
}

export default App;
