import React, { useState, useRef } from "react";
import { Container, Form } from "react-bootstrap";
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
import { useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { useNavigate } from "react-router-dom";

export default function AddBookPage() {
  const navigate = useNavigate();
  // const [formData, setformData] = useState(null);
  const [imageBookData, setImageBookData] = useState();
  const nameBookRef = useRef(null);
  const genreBookRef = useRef(null);
  const descriptionBookRef = useRef(null);
  const issueBookRef = useRef(null);
  const authorBookRef = useRef(null);
  const priceBookRef = useRef(null);
  const statusBookRef = useRef(null);
  const codeBookRef = useRef(null);
  const dateAddBookRef = useRef(null);
  const imageBookRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
    AddBookPage();
  };

  const AddBookPage = async () => {
    try {
      const res = await customAxios.post("/bookList.json", {
        nameBook: nameBookRef.current.value,
        genreBook: genreBookRef.current.value,
        descriptionBook: descriptionBookRef.current.value,
        issueBook: issueBookRef.current.value,
        authorBook: authorBookRef.current.value,
        priceBook: priceBookRef.current.value,
        statusBook: statusBookRef.current.value,
        codeBook: codeBookRef.current.value,
        dateAddBook: dateAddBookRef.current.value,
        imageBook: imageBookData,
      });
      navigate("/");
    } catch (error) {
      console.log("Lỗi");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-3" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">Library Manager</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link className="nav-link " type="button" to="/">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
                <Link className="nav-link" type="button" to="/readerList">
                  <FontAwesomeIcon icon={faAddressBook} /> Quản lý bạn đọc
                </Link>
                <Link className="nav-link active" type="button" to="/bookList">
                  <FontAwesomeIcon icon={faBook} /> Quản lý sách
                </Link>
                <Link className="nav-link" type="button" to="/borrow">
                  <FontAwesomeIcon icon={faBookBookmark} /> Quản lý mượn/trả
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-9" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <h6 className="content-account">Admin</h6>
            </div>

            <div className="control-addReader container">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Thêm sách</h4>
                <div className="row">
                  <div className="form-horizontal col-sm-5">
                    <div className="form-group">
                      <label className="control-label">Tên sách:</label>
                      <input
                        ref={nameBookRef}
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Thể loại: </label>
                      <select className="browser-default custom-select mb-2 mr-3">
                        <option selected disabled>
                          Thể loại
                        </option>
                        <option value="Giáo dục">Giáo dục</option>
                        <option value="Kinh dị">Kinh dị</option>
                        <option value="Tình cảm">Tình cảm</option>
                        <option value="Giả tưởng">Giả tưởng</option>
                        <option value="Self-help">Self-help</option>
                        <option value="Tiểu sử">Tiểu sử</option>
                        <option value="Lịch sử">Lịch sử</option>
                        <option value="Hài hước">Hài hước</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label for="">Số phát hành:</label>
                      <input
                        ref={issueBookRef}
                        type="number"
                        className="form-control"
                        placeholder="Enter number"
                      />
                    </div>

                    <div className="form-group">
                      <label>Tác giả:</label>
                      <input
                        ref={authorBookRef}
                        type="text"
                        className="form-control"
                        placeholder="Enter Author"
                      />
                    </div>

                    <div className="form-group">
                      <label for="email">Giá tiền (VNĐ):</label>
                      <input
                        ref={priceBookRef}
                        type="number"
                        className="form-control"
                        placeholder="Enter Price"
                      />
                    </div>

                    <div className="form-group">
                      <label for="">Trạng thái sách: </label>
                      <select className="browser-default custom-select mb-2 mr-3">
                        <option selected disabled>
                          Status reader
                        </option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="avatar-wrapper">
                      <img className="profile-pic" src="" />
                      <div className="upload-button">
                        <span className={{ ariaHidden: true }}>
                          <FontAwesomeIcon icon={faArrowAltCircleUp} />
                        </span>
                      </div>
                      <input
                        className="file-upload"
                        type="file"
                        accept="image/*"
                      />
                    </div>
                    {/* <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-10">
                        <button
                          type="button"
                          className="btn btn-success"
                          onSubmit={handleSubmit}
                        >
                          <FontAwesomeIcon icon={faSave} /> Lưu
                        </button>
                        <button type="button" className="btn btn-danger">
                          &times; Cancel
                        </button>
                      </div>
                    </div> */}
                  </div>

                  <div className="form-horizontal col-sm-5">
                    {/* <div className="avatar-wrapper">
                      <img className="profile-pic" src="" />
                      <div className="upload-button">
                        <span className={{ ariaHidden: true }}>
                          <FontAwesomeIcon icon={faArrowAltCircleUp} />
                        </span>
                      </div>
                      <input
                        className="file-upload"
                        type="file"
                        accept="image/*"
                      />
                    </div> */}

                    <div className="form-group">
                      <label className="control-label">Mô tả:</label>
                      <textarea
                        ref={descriptionBookRef}
                        className="form-control"
                        rows="4"
                        cols="50"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="pwd">
                        Mã sách:
                      </label>
                      <input
                        ref={codeBookRef}
                        type="text"
                        className="form-control"
                        placeholder="Enter code book"
                      />
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="email">
                        Ngày thêm:
                      </label>
                      <input
                        ref={dateAddBookRef}
                        type="date"
                        className="form-control"
                        placeholder="dd-mm-yy"
                      />
                    </div>
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-10">
                        <button
                          type="button"
                          className="btn btn-success"
                          onSubmit={handleSubmit}
                        >
                          <FontAwesomeIcon icon={faSave} /> Lưu
                        </button>
                        <button type="button" className="btn btn-danger">
                          &times; Cancel
                        </button>
                      </div>
                    </div>

                    {/* <!-- <div className="form-group">
                                    <label className="control-label" for="email">Ngày hết hạn:</label>
                                    <input type="date" className="form-control" placeholder="dd-mm-yy">
                                </div>

                                <div className="form-group">
                                    <label for="">Trạng thái thẻ:</label>
                                    <select className="browser-default custom-select mb-2 mr-3">
                                        <option selected disabled>Status card</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>   
                                </div> --> */}
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
