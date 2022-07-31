import React, { useState } from "react";
import { Prompt } from "react-router-dom/cjs/react-router-dom.min";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    passWord: "",
    status: false,
  });
  // console.log("userLogin", userLogin);
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newUserLogin = {
      ...userLogin,
      [name]: value,
    };
    // ngăn người dùng chuyển trang khi chưa nhập xong
    let valid = true;
    for (let key in newUserLogin) {
      if (key !== "status") {
        if (newUserLogin[key].trim() === "") {
          newUserLogin.status = true;
        }
      }
    }
    // xét đủ các input đã có giá trị mới cho chuyển trang
    if (!valid) {
      newUserLogin.status = true;
    } else {
      newUserLogin.status = false;
    }
    setUserLogin(newUserLogin);
  };
  //
  const handleLogin = (event) => {
    event.preventDefault();
    if (
      userLogin.userName === "cyberlearn" &&
      userLogin.passWord === "cyberlearn"
    ) {
      // thành công thì chuyển về trang trước đó
      // props.history.goBack();
      // chuyển đến trang chỉ định bất kỳ
      // chuyển hướng đến path tương ứng
      props.history.push("/contact");
      // replace thay đổi nội dung path tương ứng
      // props.history.replace("/home");
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("Login fail !!!");
      return;
    }
  };
  return (
    <div>
      <form className="w-75 mx-auto" onSubmit={handleLogin}>
        <h1 className="text-center mt-2">Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputText" className="form-label">
            Username
          </label>
          <input
            name="userName"
            type="text"
            className="form-control"
            id="exampleInputText"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="passWord"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Prompt
          when={true}
          message={(location) => {
            return "Bạn có chắc muốn rời đi !!!";
          }}
        />
      </form>
    </div>
  );
}
