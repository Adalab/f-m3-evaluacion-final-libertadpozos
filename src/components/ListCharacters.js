import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ListCharacters.scss";

class ListCharacters extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <ul className="list__container">
        {data.map(character => {
          return (
              <li className="card__container" key={character.id}>
                <Link className="links" key={character.id} to={`/card/${character.id}`}>
                <p className="character-name__list">{character.name}</p>
                <div className="photo__container">
                  <img
                    className="photo__list"
                    src={character.image}
                    alt={character.name}
                  />
                </div>
                {!character.house ? (
                  <p className="character-house__list">
                    House: without a House
                  </p>
                ) : (
                  <p className="character-house__list">{`House: ${
                    character.house
                  }`}</p>
                )}
                 </Link>
              </li>
           
          );
        })}
      </ul>
    );
  }
}
ListCharacters.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ListCharacters;
