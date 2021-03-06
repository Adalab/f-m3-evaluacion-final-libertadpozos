import React from "react";
import "./App.scss";
import ListCharacters from "./components/ListCharacters";
import Filters from "./components/Filters";
import { Switch, Route } from "react-router-dom";
import DetailCard from "./components/DetailCard";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isFetching: true,
      filters: {
        byName: "",
        byHouse: []
      }
    };
    this.getData = this.getData.bind(this);
    this.handleInputFilterName = this.handleInputFilterName.bind(this);
    this.handleInputFilterHouse = this.handleInputFilterHouse.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch("http://hp-api.herokuapp.com/api/characters")
      .then(response => response.json())
      .then(data => {
        const newData = data.map((character, index) => {
          return {
            ...character,
            id: index + 1
          };
        });
        this.setState({
          data: newData,
          isFetching: false
        });
      });
  }

  handleInputFilterName(event) {
    const inputValue = event.target.value;
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          byName: inputValue
        }
      };
    });
  }

  handleInputFilterHouse(event) {
    const inputValue = event.target.value;
    console.log(inputValue);

    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          byHouse: prevState.filters.byHouse.find(house => house === inputValue)
            ? prevState.filters.byHouse.filter(house => house !== inputValue)
            : prevState.filters.byHouse.concat(inputValue)
        }
      };
    });
  }

  getFilteredList() {
    return this.state.data
      .filter(character => {
        if (
          character.name
            .toLowerCase()
            .includes(this.state.filters.byName.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      })
      .filter(character =>
        !this.state.filters.byHouse.length
          ? true
          : this.state.filters.byHouse.includes(character.house)
      );
  }

  render() {
    const { data, isFetching } = this.state;
    return (
      <div className="general__container">
        <header>
          <h1 className="title">It's LeviOsa not LeviosA</h1>
        </header>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <main className="main__container">
                    <Filters
                      onChangeName={this.handleInputFilterName}
                      inputValueName={this.state.filters.byName}
                      onChangeHouse={this.handleInputFilterHouse}
                    />
                    <ListCharacters data={this.getFilteredList()} />
                  </main>
                )}
              />

              <Route
                path="/card/:cardId"
                render={routerProps => (
                  <DetailCard match={routerProps.match} data={data} />
                )}
              />
            </Switch>
          </React.Fragment>
        )}
        <footer className="footer__container">
          <p className="title__footer">Harry Potter Cards</p>
          <p className="author">Libertad Pozos</p>
          <p className="year__footer">2019</p>
        </footer>
      </div>
    );
  }
}
export default App;
