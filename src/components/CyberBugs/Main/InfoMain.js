import { Avatar } from "antd";
import React, { Fragment } from "react";

export default function InfoMain(props) {
  const { projectDetail } = props;
  const renderAvatar = () => {
    return projectDetail.members?.map((user, index) => {
      return (
        <Fragment key={index}>
          <img
            className="rounded-circle shadow me-1"
            style={{ width: 50 }}
            src={user.avatar}
            alt={user.avatar}
          />
        </Fragment>
      );
    });
  };

  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block mt-2">
        <input className="search" />
        <i className="fa fa-search" />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        {renderAvatar()}
      </div>
      {/* <div style={{ marginLeft: 20 }} className="text">
        Only My Issues
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Recently Updated
      </div> */}
    </div>
  );
}
