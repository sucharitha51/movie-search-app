import React from "react";
import "./Cast.css";

const Cast = (props) => {
  const url = "/cast-movies/" + props.castInfo.id + "/" + props.currentMovie.id;
  const imagePath = props.castInfo.profile_path
    ? props.castInfo.profile_path
    : props.castInfo.poster_path;
  return (
    <div className="castInfo">
      <div className="col s12 m4">
        <div>
          {imagePath == null ? (
            <img
              src={`https://orgogrowth.com/wp-content/uploads/2019/03/NoImage_Available.png`}
              alt="card image"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <img
              src={`http://image.tmdb.org/t/p/w185/${imagePath}`}
              alt="card image"
              style={{ width: "100%", height: "100%" }}
            />
          )}
          <p>
            <a href={url}>
              {props.castInfo.name ? props.castInfo.name : props.castInfo.title}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Cast;
