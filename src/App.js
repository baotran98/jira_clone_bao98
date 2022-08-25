import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import Modal from "./HOC/Modal/Modal";
// import Header from "./components/Home/Header/Header";
// import Login from "./pages/Login/Login";
// import PageNotFound from "./pages/PageNotFound/PageNotFound";
import LoadingComponent from "./components/GlobalSettings/LoadingComponent/LoadingComponent";
import { LoginTemplate } from "./templates/HomeTemplates/LoginTemplate";
import { CyberBugTemplate } from "./templates/HomeTemplates/CyberBugTemplate";
import LoginCyberBug from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBug";
import RegisterCyberBug from "./pages/CyberBugs/Register/RegisterCyberBug";
import CreateProject from "./pages/CyberBugs/CreateProjects/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import UserManagement from "./pages/CyberBugs/UserManagement/UserManagement";
import DrawerCyberBug from "./HOC/Drawer/DrawerCyberBug";
import IndexCyberBugs from "./pages/CyberBugs/ProjectDetail/IndexCyberBugs";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);
  return (
    <>
      {/* <Header /> */}
      {/* <Modal /> */}
      <LoadingComponent />
      <DrawerCyberBug />
      <Switch>
        {/* tạo template cho nhiều trang với HOC */}
        <CyberBugTemplate exact path="/" Component={ProjectManagement} />
        <LoginTemplate exact path="/login" Component={LoginCyberBug} />
        <LoginTemplate exact path="/register" Component={RegisterCyberBug} />
        <CyberBugTemplate exact path="/cyberbugs" Component={IndexCyberBugs} />
        <CyberBugTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberBugTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <CyberBugTemplate
          exact
          path="/usermanagement"
          Component={UserManagement}
        />
        <CyberBugTemplate
          exact
          path="/projectdetail/:projectId"
          Component={IndexCyberBugs}
        />
        <CyberBugTemplate exact path="*" Component={ProjectManagement} />
      </Switch>
    </>
  );
}

export default App;
