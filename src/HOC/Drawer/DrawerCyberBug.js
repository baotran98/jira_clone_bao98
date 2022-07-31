import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { Footer } from "antd/lib/layout/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DrawerCyberBug(props) {
  const { visible, contentDrawer, callBackSubmit, title } = useSelector(
    (state) => state.DrawerReducer
  );
  console.log("Visible:", visible);
  const dispatch = useDispatch();
  const showDrawer = () => {
    dispatch({
      type: "OPEN_DRAWER",
    });
  };

  const onClose = () => {
    dispatch({
      type: "CLOSE_DRAWER",
    });
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        footer={
          <Space>
            <Button className="" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {contentDrawer}
      </Drawer>
    </>
  );
}
