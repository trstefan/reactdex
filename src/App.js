import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./components/Home";
import PokemonInfo from "./components/PokemonInfo";
const App = () => {
  return (
    <Router>
      <div className="app">
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/pokemon/:pokemonIndex" component={PokemonInfo} />
        </Switch>
        <Footer></Footer>
      </div>
    </Router>
  );
};

export default App;
