import React, { Component } from "react";
import MovieList from "../MovieList/MovieList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import MovieInfo from "../Movie/MovieInfo";
import Suggestions from "../Suggestions/Suggestions";
import "./HomePage.css";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchTerm: "",
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,
      currentMovieCast: null,
      error: "",
      suggestionsNeeded: false,
      suggestedMovies: "",
      selectedOption: null,
    };
    this.apiKey = "9460ddd7fac73c6ff263808a361caa48";
  }

  handleSubmit = (e) => {
    const term = this.state.selectedOption
      ? this.state.selectedOption.value
      : "movie";

    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/${term}?api_key=${this.apiKey}&query=${this.state.searchTerm}`
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.results) {
          this.setState({
            movies: [...data.results],
            totalResults: data.total_results,
            suggestionsNeeded: false,
          });
          this.setState({ error: "" });
        }
        if (data.errors) {
          this.setState({ error: "please enter the search term" });
        }
      });
  };

  getInfo = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&limit=5`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ suggestedMovies: [...data.results] });
      });
  };

  handleSelectChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleChange = (e) => {
    this.setState(
      {
        searchTerm: e.target.value,
        suggestionsNeeded: true,
      },
      () => {
        if (this.state.searchTerm && this.state.searchTerm.length > 1) {
          if (this.state.searchTerm.length % 2 === 0) {
            this.getInfo();
          }
        } else if (!this.state.searchTerm) {
        }
      }
    );
  };

  nextPage = (pageNumber) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ movies: [...data.results], currentPage: pageNumber });
      });
  };

  viewMovieInfo = (id) => {
    const filteredMovie = this.state.movies.filter((movie) => movie.id == id);
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
    this.setState({ currentMovie: newCurrentMovie });
    if (
      this.state.selectedOption &&
      this.state.selectedOption.value !== "person"
    ) {
      this.viewCastInfo(id);
    } else if (this.state.selectedOption == null) {
      this.viewCastInfo(id);
    }
  };

  viewSuggestionMovieInfo = (id) => {
    const filteredMovie = this.state.suggestedMovies.filter(
      (movie) => movie.id == id
    );
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
    this.setState({ currentMovie: newCurrentMovie });
    this.viewCastInfo(id);
  };

  closeMovieInfo = () => {
    this.setState({ currentMovie: null });
  };

  viewCastInfo = (id) => {
    const filteredMovie = this.state.movies.filter((movie) => movie.id == id);
    if (filteredMovie) {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/casts?api_key=${this.apiKey}`
      )
        .then((data) => data.json())
        .then((data) => {
          this.setState({ currentMovieCast: [...data.cast] });
        });
    }
  };

  render() {
    const numberPages = 10;
    return (
      <div className="App">
        {this.state.currentMovie == null ? (
          <div>
            <SearchBox
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleSelectChange={this.handleSelectChange}
            />
            {this.state.error && (
              <p className="error-message">{this.state.error}</p>
            )}
            {this.state.suggestedMovies &&
              this.state.suggestionsNeeded &&
              this.state.searchTerm.length >= 5 && (
                <Suggestions
                  viewSuggestionMovieInfo={this.viewSuggestionMovieInfo}
                  results={this.state.suggestedMovies}
                />
              )}
            <MovieList
              viewMovieInfo={this.viewMovieInfo}
              movies={this.state.movies}
            />
          </div>
        ) : (
          <MovieInfo
            currentMovieCast={this.state.currentMovieCast}
            currentMovie={this.state.currentMovie}
            closeMovieInfo={this.closeMovieInfo}
          />
        )}
        {this.state.totalResults > 20 && this.state.currentMovie == null ? (
          <Pagination
            pages={numberPages}
            nextPage={this.nextPage}
            currentPage={this.state.currentPage}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default HomePage;
