import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Space,
  Table,
  Tag,
  Popconfirm,
  Popover,
  AutoComplete,
  Input,
} from "antd";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import FormEditProject from "../../../components/Forms/FormEditProject";
const { Search } = Input;
const onSearch = (value) => console.log(value);

export default function ProjectManagement(props) {
  // lấy dữ liệu về Component từ Reducer
  const projectList = useSelector(
    (state) => state.ProjectCyberBugReducer.projectList
  );

  // sử dụng dispatch để gọi action
  const dispatch = useDispatch();
  //
  const { userSearch } = useSelector((state) => state.UserReducer);
  //
  const [value, setValue] = useState("");
  const [searchText, setSearchText] = useState("");
  // dùng hàm searchRef để DebounceSearch tìm kiếm tới API
  const searchRef = useRef(null);
  // hàm useEffect để gửi dữ liệu lên Saga
  useEffect(() => {
    dispatch({ type: "GET_LIST_PROJECT_SAGA" });
  }, []);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  // multi search
  const keys = ["projectName", "categoryName"];
  const handleSearch = (dataSource) => {
    return dataSource.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(searchText))
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => {
        return a.id - b.id;
      },
    },
    {
      title: "Tên dự án",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record, index) => {
        return (
          <NavLink
            to={`/projectdetail/${record.id}`}
            style={{ color: "black" }}
          >
            {text}
          </NavLink>
        );
      },
      sorter: (a, b) => {
        // chuỗi sẽ chuyển về Mã Số để so sánh, nên kí tự Thường và Hoa sẽ có Mã Riêng cần dùng trim() loại bỏ khoẳng trắng và toLowerCase() đưa về kí tự Thường để có thể so sánh giữa chuỗi chuẩn nhất
        let projectName1 = a.projectName?.trim().toLowerCase();
        let projectName2 = b.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    // {
    //   title: "Mô tả",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let jsxContent = parse(text);
    //     return <div key={index}>{jsxContent}</div>;
    //   },
    //   // sorter: (a, b) => a.age - b.age,
    //   // sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
    //   // ellipsis: true,
    // },
    {
      title: "Người tạo",
      dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="geekblue">{record.creator?.name}</Tag>;
      },
      sorter: (a, b) => {
        // chuỗi sẽ chuyển về Mã Số để so sánh, nên kí tự Thường và Hoa sẽ có Mã Riêng cần dùng trim() loại bỏ khoẳng trắng và toLowerCase() đưa về kí tự Thường để có thể so sánh giữa chuỗi chuẩn nhất
        let creator1 = a.creator.name?.trim().toLowerCase();
        let creator2 = b.creator.name?.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Thành viên",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title={"Thành viên dự án"}
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Hình</th>
                            <th>Tên</th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((user, index) => {
                            return (
                              <tr key={index}>
                                <td>{user.userId}</td>
                                <td>
                                  <img
                                    src={user.avatar}
                                    width="40"
                                    height="40"
                                    alt="avatar"
                                  />
                                </td>
                                <td>{user.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE_USER_PROJECT_SAGA",
                                        userProject: {
                                          projectId: record.id,
                                          userId: user.userId,
                                        },
                                      });
                                    }}
                                    className="btn btn-danger p-2 "
                                  >
                                    <CloseOutlined
                                      style={{ fontSize: "20px" }}
                                    />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="right"
              title={"Thêm thành viên"}
              content={() => {
                return (
                  <AutoComplete
                    style={{ width: "100%" }}
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      // set giá trị của hộp thoại = option.label
                      setValue(option.label);
                      // gọi API gửi về Backend
                      dispatch({
                        type: "ADD_USER_SAGA",
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: "GET_USER_SAGA",
                          keyWord: value,
                        });
                      }, 1000);
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ border: "none", fontSize: "20px" }}>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Loại dự án",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => {
        // chuỗi sẽ chuyển về Mã Số để so sánh, nên kí tự Thường và Hoa sẽ có Mã Riêng cần dùng trim() loại bỏ khoẳng trắng và toLowerCase() đưa về kí tự Thường để có thể so sánh giữa chuỗi chuẩn nhất
        let categoryName1 = a.categoryName?.trim().toLowerCase();
        let categoryName2 = b.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <button
            onClick={() => {
              const action = {
                type: "OPEN_FORM_EDIT_PROJECT",
                showTitle: "Edit Project",
                Component: <FormEditProject />,
              };
              // dispatch lên reducer nội dung render
              dispatch(action);
              // dispatch dữ liệu dòng hiện tại lên reducer
              const actionEditProject = {
                type: "EDIT_PROJECT",
                projectEditModel: record,
              };
              dispatch(actionEditProject);
            }}
            className="btn btn-primary"
            style={{ fontSize: 15 }}
          >
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              dispatch({
                type: "DELETE_PROJECT_SAGA",
                idProject: record.id,
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
      <h4 className="mt-3">Project Management</h4>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Search
          type="text"
          placeholder="Nhập tên dự án cần tìm..."
          // value={searchText}
          // onSearch={dataSearch}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          allowClear
          enterButton
        />
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={handleSearch(projectList)}
        onChange={handleChange}
      />
    </div>
  );
}
