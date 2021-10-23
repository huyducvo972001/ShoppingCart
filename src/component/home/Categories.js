import React from "react";
import { Link } from "react-router-dom";

const Categories = (props) => {
  return (
    <tr>
      <th scope="row">
        <Link to={`/category/${props.id}`}>{props.category}</Link>
      </th>
    </tr>
  );
};

export default Categories;
