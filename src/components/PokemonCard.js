import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
  };

  componentDidMount() {
    const { name, url } = this.props;

    const pokemonIndex = url.split("/")[url.split("/").length - 2];

    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    this.setState({ name, url, pokemonIndex, imageUrl });
  }

  render() {
    return (
      <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
        <div className="poke-card">
          <h1>
            {this.state.name
              .toLowerCase()
              .split(" ")
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ")}
          </h1>
          <img src={this.state.imageUrl} alt="" />
          <h3>Pokedex entry: {this.state.pokemonIndex}</h3>
        </div>
      </StyledLink>
    );
  }
}
