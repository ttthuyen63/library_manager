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

export default function AddReaderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageReaderData, setImageReaderData] = useState();
  const [genderReaderData, setgenderReaderData] = useState();
  const [activeReaderData, setactiveReaderData] = useState();
  const nameReaderRef = useRef(null);
  const codeReaderRef = useRef(null);
  const genderReaderRef = useRef(null);
  const birthReaderRef = useRef(null);
  const addressReaderRef = useRef(null);
  const phoneReaderRef = useRef(null);
  const statusReaderRef = useRef(null);
  const dateAddReaderRef = useRef(null);
  const imageReaderRef = useRef(null);
  const dateEndReaderRef = useRef(null);

  const getReaderApi = async () => {
    try {
      const res = await customAxios.post("/readerList");
      dispatch(addListReader(res.data));
      // setbookState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
    dispatch(
      addReader({
        nameReader: nameReaderRef.current.value,
        codeReader: codeReaderRef.current.value,
        genderReader: genderReaderRef.current.value,
        birthReader: birthReaderRef.current.value,
        addressReader: addressReaderRef.current.value,
        phoneReader: phoneReaderRef.current.value,
        statusReader: statusReaderRef.current.value,
        codeReader: codeReaderRef.current.value,
        dateAddReader: dateAddReaderRef.current.value,
        // imageBook: imageBookData,
        dateEndReader: dateEndReaderRef.current.value,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/readerList");
        // getReaderApi();
      });
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
                <Link className="nav-link " type="button" to="/">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
                <Link
                  className="nav-link active"
                  type="button"
                  to="/readerList"
                >
                  <FontAwesomeIcon icon={faAddressBook} /> Quản lý bạn đọc
                </Link>
                <Link className="nav-link" type="button" to="/bookList">
                  <FontAwesomeIcon icon={faBook} /> Quản lý sách
                </Link>
                <Link className="nav-link" type="button" to="/borrow">
                  <FontAwesomeIcon icon={faBookBookmark} /> Quản lý mượn/trả
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-10" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <h6 className="content-account">Admin</h6>
            </div>

            <div className="control-addReader container">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Thêm bạn đọc</h4>
                <Form>
                  <div className="row">
                    <div className="form-horizontal col-sm-5">
                      <div className="form-group">
                        <label className="control-label">Họ và tên:</label>
                        <input
                          ref={nameReaderRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter name"
                        />
                      </div>
                      <div className="form-group">
                        <label for="">Giới tính</label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          ref={genderReaderRef}
                          onChange={(e) => setgenderReaderData(e.target.value)}
                        >
                          <option selected disabled>
                            Choose gender
                          </option>
                          <option value="male">Nam</option>
                          <option value="fermale">Nữ</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label for="">Ngày sinh:</label>
                        <input
                          ref={birthReaderRef}
                          type="date"
                          className="form-control"
                          placeholder="dd-mm-yy"
                        />
                      </div>

                      <div className="form-group">
                        <label for="email">Địa chỉ:</label>
                        <input
                          ref={addressReaderRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter address"
                        />
                      </div>
                      <div className="form-group">
                        <label for="email">Số điện thoại:</label>
                        <input
                          ref={phoneReaderRef}
                          type="tel"
                          className="form-control"
                          placeholder="Enter telephone number"
                        />
                      </div>

                      <div className="form-group">
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
                      </div>
                    </div>

                    <div className="form-horizontal col-sm-5">
                      <div className="form-group">
                        <label className="control-label" for="pwd">
                          Mã bạn đọc:
                        </label>
                        <input
                          ref={codeReaderRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter code reader"
                        />
                      </div>

                      <div className="form-group">
                        <label className="control-label" for="date">
                          Ngày tạo:
                        </label>
                        <input
                          ref={dateAddReaderRef}
                          type="date"
                          className="form-control"
                          placeholder="dd-mm-yy"
                        />
                      </div>

                      <div className="form-group">
                        <label className="control-label" for="date">
                          Ngày hết hạn:
                        </label>
                        <input
                          ref={dateEndReaderRef}
                          type="date"
                          className="form-control"
                          placeholder="dd-mm-yy"
                        />
                      </div>
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
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
