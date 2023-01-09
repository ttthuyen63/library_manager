import React, { useState, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faArrowAltCircleUp,
  faBook,
  faBookBookmark,
  faHome,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { addListReader, addReader } from "../redux/readerSlice";
import { customAxios } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

export default function AddReaderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageReaderData, setImageReaderData] = useState();
  const [genderData, setgenderData] = useState();
  const [activeReaderData, setactiveReaderData] = useState();
  const [status, setStatus] = useState("");
  const userNameRef = useRef(null);
  const userCodeRef = useRef(null);
  const genderRef = useRef(null);
  const birthDateRef = useRef(null);
  const currentAddressRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const statusReaderRef = useRef(null);
  const dateAddReaderRef = useRef(null);
  const imageReaderRef = useRef(null);
  const expireDateRef = useRef(null);
  const statusRef = useRef(null);

  const getReaderApi = async () => {
    try {
      const res = await customAxios.post("/lbm/v1/users/create");
      dispatch(addListReader(res.data));
      // setbookState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  const handleSubmit = (e) => {
    //   e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
    //   dispatch(
    //     addReader({
    //       userName: userNameRef.current.value,
    //       userCode: userCodeRef.current.value,
    //       gender: genderRef.current.value,
    //       birthDate: birthDateRef.current.value,
    //       currentAddress: currentAddressRef.current.value,
    //       phoneNumber: phoneNumberRef.current.value,
    //       // statusReader: statusReaderRef.current.value,
    //       // userCode: userCodeRef.current.value,
    //       // dateAddReader: dateAddReaderRef.current.value,
    //       // imageBook: imageBookData,
    //       expireDate: expireDateRef.current.value,
    //     })
    //   )
    //     .unwrap()
    //     .then(() => {
    //       navigate("/readerList");
    //       // getReaderApi();
    //     });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // var birth = new Date(birthDateRef.current.value);
    var raw = JSON.stringify({
      birthDate: new Date(birthDateRef.current.value),
      currentAddress: currentAddressRef.current.value,
      description: "",
      emailAddress: currentAddressRef.current.value,
      expireDate: new Date(expireDateRef.current.value),
      gender: genderRef.current.value,
      isDisable: false,
      phoneNumber: phoneNumberRef.current.value,
      // status: statusRef.current.value,
      userCode: userCodeRef.current.value,
      userName: userNameRef.current.value,
    });
    console.log("tese..", new Date(birthDateRef.current.value));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
    } catch (error) {}

    fetch("http://192.168.189.75:9992/lbm/v1/users/create", requestOptions)
      .then((response) => response.text())
      .then((result) => navigate("/readerList"))
      .catch((error) => console.log("error", error));
  };

  const handleCancel = (e) => {
    navigate("/readerList");
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-2" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">Library Manager</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link
                  className="nav-link "
                  type="button"
                  to="/"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
                <Link
                  className="nav-link active"
                  type="button"
                  to="/readerList"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faAddressBook} /> Quản lý bạn đọc
                </Link>
                <Link
                  className="nav-link"
                  type="button"
                  to="/bookList"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faBook} /> Quản lý sách
                </Link>
                <Link
                  className="nav-link"
                  type="button"
                  to="/borrow"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faBookBookmark} /> Quản lý mượn/trả
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-10" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <h5 className="content-account">
                <Button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Thoát
                </Button>
              </h5>
            </div>

            <div
              className="control-addReader container"
              style={{ marginLeft: "20px" }}
            >
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Thêm bạn đọc</h4>
                <Form>
                  <div className="row">
                    <div className="form-horizontal col-sm-7">
                      <div className="form-group">
                        <label className="control-label">Họ và tên:</label>
                        <input
                          ref={userNameRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter name"
                        />
                      </div>
                      <div className="form-group">
                        <label for="">Giới tính</label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          ref={genderRef}
                          onChange={(e) => setgenderData(e.target.value)}
                        >
                          <option selected disabled>
                            Chọn giới tính
                          </option>
                          <option value="MALE">Nam</option>
                          <option value="FEMALE">Nữ</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label for="">Ngày sinh:</label>
                        <input
                          ref={birthDateRef}
                          type="date"
                          className="form-control"
                          placeholder="dd-mm-yy"
                        />
                      </div>

                      <div className="form-group">
                        <label for="email">Địa chỉ email:</label>
                        <input
                          ref={currentAddressRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter address email"
                        />
                      </div>

                      {/* <div className="form-group">
                        <label for="">Trạng thái bạn đọc:</label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          ref={statusReaderRef}
                          onChange={(e) => setactiveReaderData(e.target.value)}
                        >
                          <option selected disabled>
                            Status reader
                          </option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div> */}
                      <div className="form-group">
                        <label for="email">Số điện thoại:</label>
                        <input
                          ref={phoneNumberRef}
                          type="tel"
                          className="form-control"
                          placeholder="Enter telephone number"
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label" for="pwd">
                          Mã bạn đọc:
                        </label>
                        <input
                          ref={userCodeRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter code reader"
                        />
                      </div>

                      <div className="form-group">
                        <label className="control-label" for="date">
                          Ngày hết hạn:
                        </label>
                        <input
                          ref={expireDateRef}
                          type="date"
                          className="form-control"
                          placeholder="dd-mm-yy"
                        />
                      </div>
                    </div>

                    <div
                      className="form-horizontal col-sm-4"
                      style={{ marginLeft: "10px", marginTop: "40px" }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1512/1512910.png"
                        style={{ width: "250px", height: "350px" }}
                      />
                    </div>
                  </div>
                </Form>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <Button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSubmit}
                    >
                      <FontAwesomeIcon icon={faSave} /> Lưu
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleCancel}
                    >
                      &times; Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
