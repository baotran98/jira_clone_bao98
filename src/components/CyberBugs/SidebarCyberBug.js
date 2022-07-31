import React, { useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useDispatch } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask";
const { Sider } = Layout;

export default function SidebarCyberBug() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            onClick={() => {
              dispatch({
                type: "OPEN_FORM_CREATE_TASK",
                showTitle: "Create Task",
                Component: <FormCreateTask />,
              });
            }}
            key="1"
            icon={<PlusOutlined />}
          >
            Create task
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
