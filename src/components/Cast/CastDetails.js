import React from "react";

const CastDetails = (props) => {
  return (
    <div className="container">
      <div className="info-container">
        <div className="row row1">
          <div className="col s12 m4">
            {props.personInfo.profile_path == null ? (
              <img
                src={`https://orgogrowth.com/wp-content/uploads/2019/03/NoImage_Available.png`}
                alt="card image"
                style={{ width: "100%", height: 360 }}
              />
            ) : (
              <img
                src={`http://image.tmdb.org/t/p/w185${props.personInfo.profile_path}`}
                alt="card image"
                style={{ width: "100%", height: 360 }}
              />
            )}
          </div>
          <div className="col s12 m8">
            <div>
              <h2>{props.personInfo.name}</h2>
              <p>{props.personInfo.place_of_birth}</p>
              <h4>Biography</h4>
              <p>{props.personInfo.biography}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CastDetails;
