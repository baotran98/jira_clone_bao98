import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentMain from "../../../components/CyberBugs/Main/ContentMain";
import HeaderMain from "../../../components/CyberBugs/Main/HeaderMain";
import InfoMain from "../../../components/CyberBugs/Main/InfoMain";

export default function DetailCyberBug(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    // khi người dùng link qua trang này bằng thẻ Navlink hoặc tự gõ Url thì ta sẽ lấy tham số từ Url => gọi Saga
    const { projectId } = props.match.params;
    dispatch({
      type: "GET_DETAIL_PROJECT_SAGA",
      projectId,
    });
  }, []);
  const renderAvatar = () => {
    return projectDetail.members?.map((user, index) => {
      return (
        <div className="avatar">
          <img src={user.avatar} alt={user.avatar} />
        </div>
      );
    });
  };
  return (
    <div className="main">
      <HeaderMain />
      {/* <InfoMain projectDetail={projectDetail} /> */}
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderAvatar()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
      <ContentMain />
    </div>
  );
}
