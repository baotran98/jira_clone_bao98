import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Space,
  Table,
  Tag,
  Popconfirm,
  Input,
  AutoComplete,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import FormEditUser from "../../../components/Forms/FormEditUser";
import {
  DELETE_USER_SAGA,
  EDIT_USER,
  GET_ALL_USER_SAGA,
} from "../../../redux/types/CyberBugs/UserConst";
const { Search } = Input;
const onSearch = (value) => console.log(value);

export default function UserManagement(props) {
  // lấy dữ liệu về Component từ Reducer
  // const projectList = useSelector(
  //   (state) => state.ProjectCyberBugReducer.projectList
  // );
  const { userList } = useSelector((state) => state.UserReducer);
  const { userSearch } = useSelector((state) => state.UserReducer);
  // sử dụng dispatch để gọi action
  const dispatch = useDispatch();
  // hook useState
  // const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState([]);
  const [options, setOptions] = useState([]);
  // dùng hàm searchRef để DebounceSearch tìm kiếm tới API
  const searchRef = useRef(null);
  // hàm useEffect để gửi dữ liệu lên Saga
  useEffect(() => {
    dispatch({
      type: GET_ALL_USER_SAGA,
    });
  }, []);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const handleSearch = (e) => {
    const key = e.target.value;
    const newSearch = userList?.filter((value) => {
      return (
        value.email.toLowerCase().includes(key.toLowerCase()) ||
        value.name.toLowerCase().includes(key.toLowerCase()) ||
        value.phoneNumber.toLowerCase().includes(key.toLowerCase())
      );
    });
    setSearchValue(newSearch);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => {
        return a.userId - b.userId;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => {
        // chuỗi sẽ chuyển về Mã Số để so sánh, nên kí tự Thường và Hoa sẽ có Mã Riêng cần dùng trim() loại bỏ khoẳng trắng và toLowerCase() đưa về kí tự Thường để có thể so sánh giữa chuỗi chuẩn nhất
        let email1 = a.email?.trim().toLowerCase();
        let email2 = b.email?.trim().toLowerCase();
        if (email2 < email1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return <Tag color="purple">{record.name}</Tag>;
      },
      sorter: (a, b) => {
        // chuỗi sẽ chuyển về Mã Số để so sánh, nên kí tự Thường và Hoa sẽ có Mã Riêng cần dùng trim() loại bỏ khoẳng trắng và toLowerCase() đưa về kí tự Thường để có thể so sánh giữa chuỗi chuẩn nhất
        let Name1 = a.name.trim().toLowerCase();
        let Name2 = b.name.trim().toLowerCase();
        if (Name2 < Name1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Hình đại diện",
      key: "avatar",
      render: (text, record, index) => {
        return (
          <div className="text-center">
            <Avatar
              src={record.avatar}
              alt={record.userId}
              className="shadow bg-body "
              shape="square"
              size={40}
            />
          </div>
        );
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <button
            onClick={() => {
              const action = {
                type: "OPEN_FORM_EDIT_USER",
                showTitle: "Edit User",
                Component: <FormEditUser />,
              };
              // dispatch lên reducer nội dung render
              dispatch(action);
              // dispatch dữ liệu dòng hiện tại lên reducer
              const actionEditUser = {
                type: EDIT_USER,
                userEdit: record,
              };
              dispatch(actionEditUser);
            }}
            className="btn btn-primary"
            style={{ fontSize: 15 }}
          >
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              dispatch({
                type: DELETE_USER_SAGA,
                id: record.userId,
              });
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-danger" style={{ fontSize: 15 }}>
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="container">
      <h4 className="mt-3">User Management</h4>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Search
          type="text"
          placeholder="Nhập dữ liệu cần tìm..."
          onChange={handleSearch}
          allowClear
          enterButton
        />
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={searchValue.length && searchValue ? searchValue : userList}
        onChange={handleChange}
      />
    </div>
  );
}
