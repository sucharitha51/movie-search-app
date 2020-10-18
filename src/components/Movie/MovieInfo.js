import React from "react";
import Cast from "../Cast/Cast";
import "./Movie.css";

const MovieInfo = (props) => {
  const imagePath = props.currentMovie.poster_path
    ? props.currentMovie.poster_path
    : props.currentMovie.profile_path;
  return (
    <div className="container">
      <div
        className="row"
        onClick={props.closeMovieInfo}
        style={{ cursor: "pointer", paddingTop: 50 }}
      >
        <i className="fas fa-arrow-left"></i>
        <span style={{ marginLeft: 10 }}>Go back</span>
      </div>
      <div className="info-container">
        <div className="row row1">
          <div className="col s12 m4">
            {imagePath == null ? (
              <img
                src={`https://orgogrowth.com/wp-content/uploads/2019/03/NoImage_Available.png`}
                alt="card image"
                style={{ width: "100%", height: 360 }}
              />
            ) : (
              <img
                src={`http://image.tmdb.org/t/p/w185${imagePath}`}
                alt="card image"
                style={{ width: "100%", height: 360 }}
              />
            )}
          </div>
          <div className="col s12 m8">
            <div>
              <h2>
                {props.currentMovie.title
                  ? props.currentMovie.title
                  : props.currentMovie.name}
              </h2>
              <p>{props.currentMovie.release_date}</p>
              {props.currentMovie.overview && (
                <>
                  <h4>Overview</h4> <p>{props.currentMovie.overview}</p>
                </>
              )}
              {props.currentMovie.popularity && (
                <p>Popularity: {props.currentMovie.popularity}</p>
              )}
              {props.currentMovie.known_for_department && (
                <p>Known for: {props.currentMovie.known_for_department}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {props.currentMovie.known_for &&
          props.currentMovie.known_for &&
          props.currentMovie.known_for.length > 0 && <h2>Known for</h2>}
        <ul>
          {props.currentMovie.known_for &&
            props.currentMovie.known_for.length > 0 &&
            props.currentMovie.known_for.slice(1, 5).map((cast) => {
              return (
                <Cast
                  key={cast.id}
                  currentMovie={props.currentMovie}
                  castInfo={cast}
                />
              );
            })}
        </ul>
      </div>
      <div>
        {props.currentMovieCast && props.currentMovieCast.length > 0 && (
          <h2>Cast</h2>
        )}
        <ul>
          {props.currentMovieCast &&
            props.currentMovieCast.length > 0 &&
            props.currentMovieCast.slice(1, 6).map((cast) => {
              return (
                <Cast
                  key={cast.cast_id}
                  currentMovie={props.currentMovie}
                  castInfo={cast}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default MovieInfo;
