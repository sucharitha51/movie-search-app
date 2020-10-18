import React from "react";

const Movie = (props) => {
  return (
    <div className="col s12 m6 l3">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          {props.image !== undefined && props.image !== null ? (
            <img
              src={`http://image.tmdb.org/t/p/w185${props.image}`}
              alt="card image"
              style={{ width: "100%", height: 360 }}
            />
          ) : (
            <img
              src={`https://orgogrowth.com/wp-content/uploads/2019/03/NoImage_Available.png`}
              alt="card image"
              style={{ width: "100%", height: 360 }}
            />
          )}
        </div>
        <div className="card-content" style={{ height: "80px" }}>
          <span>
            <a href="#" onClick={() => props.viewMovieInfo(props.movieId)}>
              {props.name}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Movie;
