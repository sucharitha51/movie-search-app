import React from "react";
import "./SearchBox.css";
import Select from "react-select";

const SearchBox = (props) => {
  const options = [
    { value: "movie", label: "Movies" },
    { value: "tv", label: "TV Shows" },
    { value: "person", label: "Persons" },
  ];
  return (
    <div className="container container1">
      <section>
        <form action="" onSubmit={props.handleSubmit}>
          <div className="row">
            <div className="column column1" style={{ backgroundColor: "" }}>
              <input
                style={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  paddingLeft: "20px",
                  border: "1px solid hsl(0,0%,80%)",
                  borderRadius: "4px",
                }}
                className="col field field1"
                type="text"
                ref={(input) => input && input.focus()}
                placeholder="Search movie"
                onChange={props.handleChange}
              />
            </div>

            <div className="column column2">
              <Select
                className="col field field2"
                onChange={props.handleSelectChange}
                options={options}
              />
            </div>

            <div className="column column3">
              <button className="btn col field field3">Search</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SearchBox;
