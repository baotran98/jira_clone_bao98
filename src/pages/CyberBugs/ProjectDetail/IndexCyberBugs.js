import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderMain from "../../../components/CyberBugs/Main/HeaderMain";
import ContentMain from "../../../components/CyberBugs/Main/ContentMain";
import InfoMain from "../../../components/CyberBugs/Main/InfoMain";
import parse from "html-react-parser";

export default function IndexCyberBugs(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();
  console.log("Project Detail:", projectDetail);
  useEffect(() => {
    // khi người dùng link qua trang này bằng thẻ Navlink hoặc tự gõ Url thì ta sẽ lấy tham số từ Url => gọi Saga
    const { projectId } = props.match.params;
    dispatch({
      type: "GET_DETAIL_PROJECT_SAGA",
      projectId,
    });
  }, []);

  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />
      <h4>Tên dự án: {projectDetail.projectName}</h4>
      {/* {parse(projectDetail.description)} */}
      <InfoMain projectDetail={projectDetail} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
