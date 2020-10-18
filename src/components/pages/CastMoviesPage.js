import React, { Component } from "react";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import MovieInfo from "../Movie/MovieInfo";
import CastDetails from "../Cast/CastDetails";
import "./HomePage.css";

const apiKey = "9460ddd7fac73c6ff263808a361caa48";
class CastMoviesPage extends Component {
  state = {
    movies: [],
    error: "",
    totalResults: 0,
    currentMovie: null,
    currentMovieCast: [],
    suggestionsNeeded: false,
    currentPage: 1,
    suggestedMovies: "",
    searchTerm: "",
    personInfo: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.state.searchTerm}`
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.results) {
          this.setState({
            movies: [...data.results],
            totalResults: data.total_results,
            suggestionsNeeded: false,
          });
        }
        if (data.errors) {
          this.setState({ error: "please enter the search term" });
        }
      });
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

  viewMovieInfo = (id) => {
    const filteredMovie = this.state.movies.filter((movie) => movie.id == id);
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
    this.setState({ currentMovie: newCurrentMovie });
    this.viewCastInfo(id);
  };
  viewCastInfo = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/casts?api_key=${apiKey}`)
      .then((data) => data.json())
      .then((data) => {
        this.setState({ currentMovieCast: [...data.cast] });
      })
      .catch((error) => console.log(error));
  };
  closeMovieInfo = () => {
    this.setState({ currentMovie: null });
  };

  viewSuggestionMovieInfo = (id) => {
    const filteredMovie = this.state.suggestedMovies.filter(
      (movie) => movie.id == id
    );
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
    this.setState({ currentMovie: newCurrentMovie });
    this.viewCastInfo(id);
  };

  getInfo = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.state.searchTerm}&limit=5`
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({ suggestedMovies: [...data.results] });
      });
  };

  componentDidMount() {
    const cast_id = this.props.match.params.cast_id;
    fetch(
      `http://api.themoviedb.org/4/discover/movie?with_cast=${cast_id}&sort_by=release_date.asc&api_key=${apiKey}&page=1`
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.results) {
          this.setState({
            movies: [...data.results],
            totalResults: data.total_results,
          });
        }
        if (data.errors) {
          this.setState({ error: "please enter the search term" });
        }
      });

    fetch(`http://api.themoviedb.org/3/person/${cast_id}?api_key=${apiKey}`)
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          this.setState({ personInfo: data });
        }
        if (data.errors) {
          this.setState({ error: "please enter the search term" });
        }
      });
  }

  render() {
    const numberPages = 10;
    return (
      <div className="person-page">
        {this.state.currentMovie == null ? (
          <div>
            <CastDetails personInfo={this.state.personInfo} />
            <h2 style={{ marginLeft: "280px" }}>Known for</h2>
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
export default CastMoviesPage;
