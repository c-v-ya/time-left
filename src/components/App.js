import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Main";
import About from "./About";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Main}></Route>
      <Route exact path="/about" component={About}></Route>
    </Switch>
  );
}

export default App;
