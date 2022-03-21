import React, { Component } from "react";
import Axios from "axios";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "3A3845",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

export default class PokemonInfo extends Component {
  state = {
    name: "",
    pokemonIndex: "",

    types: [],
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: "",
    },
    image: "",
    shinyImage: "",
    height: "",
    weight: "",
    abilities: [],
    themeColor: "#7b113a",
    statTitleWidth: 3,
    statBarWidth: 9,
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

    const pokemonResult = await Axios.get(pokemonUrl);

    //get name
    const name = pokemonResult.data.name;

    //get images
    const image = pokemonResult.data.sprites.front_default;
    const shinyImage = pokemonResult.data.sprites.front_shiny;

    //get types of the pokemon
    const types = pokemonResult.data.types.map((type) => type.type.name);
    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    //get weight and height  and convert them in feet/pounds

    const height =
      Math.round((pokemonResult.data.height * 0.328084 + 0.00001) * 100) / 100;

    const weight =
      Math.round((pokemonResult.data.weight * 0.220462 + 0.00001) * 100) / 100;

    //get pokemon abilities
    const abilities = pokemonResult.data.abilities
      .map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split(" ")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");
    //console.log(abilities);

    //get pokemon's stats

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonResult.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          break;
      }
    });

    this.setState({
      name,
      types,
      pokemonIndex,
      themeColor,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      image,
      shinyImage,
      height,
      weight,
      abilities,
    });
  }

  render() {
    return (
      <div className="poke-details">
        <div className="poke-details-header">
          <h1>Pokedex Entry: {this.state.pokemonIndex}</h1>
        </div>
        <div className="poke-details-body">
          <h1 className="name">
            {this.state.name
              .toLowerCase()
              .split(" ")
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ")}
          </h1>
          <div className="info-wrapper">
            <div className="col-2">
              <h1 className="info-wrapper-header">Stats: </h1>
              <div>
                HP{" "}
                <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${this.state.stats.hp}%`,
                        backgroundColor: `#${this.state.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{this.state.stats.hp}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                Attack{" "}
                <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${this.state.stats.attack}%`,
                        backgroundColor: `#${this.state.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{this.state.stats.attack}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                Defence{" "}
                <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${this.state.stats.defense}%`,
                        backgroundColor: `#${this.state.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{this.state.stats.defense}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                Special Attack{" "}
                <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${this.state.stats.specialAttack}%`,
                        backgroundColor: `#${this.state.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{this.state.stats.specialAttack}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                Special Defence{" "}
                <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${this.state.stats.specialDefense}%`,
                        backgroundColor: `#${this.state.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{this.state.stats.specialDefense}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                Speed{" "}
                <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                  <div className="progress">
                    <div
                      className="progress-bar "
                      role="progressbar"
                      style={{
                        width: `${this.state.stats.speed}%`,
                        backgroundColor: `#${this.state.themeColor}`,
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <small>{this.state.stats.speed}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1">
              <h1 className="info-wrapper-header">Details: </h1>
              <div className="info-pics">
                <img src={this.state.image} alt="" />
                <img src={this.state.shinyImage} alt="" />
              </div>
              <div>
                {" "}
                <div className="types">
                  Types:
                  {this.state.types.map((type) => (
                    <span
                      key={type}
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: "white",
                        marginLeft: "1rem",
                      }}
                    >
                      {type
                        .toLowerCase()
                        .split(" ")
                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}
                    </span>
                  ))}
                </div>
                Height: {this.state.height}ft <br></br>Weight:{" "}
                {this.state.weight}lb
                <br></br>
                Abbilities: {this.state.abilities}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
