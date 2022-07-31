import React from "react";

export default function PageNotFound(props) {
  return (
    <div className="text-center display-4">
      Page Not Found: <br />
      {props.match.url}
    </div>
  );
}
