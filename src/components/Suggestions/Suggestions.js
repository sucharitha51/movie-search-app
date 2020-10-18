import React from "react";
import "./Suggestions.css";

const Suggestions = (props) => {
  const options = props.results.slice(1, 5).map((r) => (
    <li className="suggestionItem" key={r.id}>
      <p>
        <a href="#" onClick={() => props.viewSuggestionMovieInfo(r.id)}>
          {r.title}
        </a>
      </p>
    </li>
  ));
  return (
    <div className="suggestions" style={{ marginTop: "-50px" }}>
      <ul>{options}</ul>
    </div>
  );
};

export default Suggestions;
