import React from "react";
import Movie from "../Movie/Movie";

const MovieList = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          {props.movies.map((movie, i) => {
            return (
              <Movie
                key={i}
                viewMovieInfo={props.viewMovieInfo}
                name={movie.name ? movie.name : movie.title}
                movieId={movie.id}
                image={
                  movie.poster_path ? movie.poster_path : movie.profile_path
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
