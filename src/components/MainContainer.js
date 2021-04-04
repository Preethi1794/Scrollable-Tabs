import React from "react";
import { Link } from "react-router-dom";

function MainContainer() {
  return (
    <div>
      <ul>
        <Link to="/">
          <li>
            <p>Home</p>
          </li>
        </Link>
        <Link to="/tabs">
          <li>
            <p>Tabs</p>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default MainContainer;
