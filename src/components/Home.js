import React, { Component } from "react";

import PokemonGrid from "./PokemonGrid";

export default class Home extends Component {
  render() {
    return (
      <div className="app">
        <PokemonGrid></PokemonGrid>
      </div>
    );
  }
}
