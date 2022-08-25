import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../util/constants/settingSystem";

export default function MenuCyberBug() {
  const { history } = useSelector((state) => state.HistoryReducer);
  let infoUser = [];
  if (localStorage.getItem("USER_LOGIN")) {
    infoUser = JSON.parse(localStorage.getItem("USER_LOGIN"));
  }
  return (
    <div className="menu shadow">
      <div className="account">
        <div className="avatar">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </div>
        <div className="account-info">
          <p className="fw-bold">{infoUser.name}</p>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/login");
              window.location.reload(); // xóa hoàn toàn thông tin user khỏi Reducer
            }}
          >
            [ <span className="text-danger">Đăng xuất</span> ]
          </div>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" style={{ marginRight: "2%" }} />
          <NavLink
            to="/cyberbugs"
            // activeClassName="active font-weight-bold"
            activeStyle={{ fontWeight: "bold" }}
            style={{ color: "black" }}
          >
            Cyber Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-tasks" style={{ marginRight: "2%" }} />
          <NavLink
            to="/projectmanagement"
            // activeClassName="active font-weight-bold"
            activeStyle={{ fontWeight: "bold" }}
            style={{ color: "black" }}
          >
            Project Management
          </NavLink>
        </div>
        <div>
          <i class="fa fa-users" style={{ marginRight: "2%" }} />
          {/* <i className="fa fa-tasks" style={{ marginRight: "2%" }} /> */}
          <NavLink
            to="/usermanagement"
            // activeClassName="active font-weight-bold"
            activeStyle={{ fontWeight: "bold" }}
            style={{ color: "black" }}
          >
            User Management
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog" style={{ marginRight: "2%" }} />
          <NavLink
            to="/createproject"
            // activeClassName="active font-weight-bold"
            activeStyle={{ fontWeight: "bold" }}
            style={{ color: "black" }}
          >
            Create Project
          </NavLink>
        </div>
      </div>
    </div>
  );
}
