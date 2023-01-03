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
import { useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBook, addListBook } from "../redux/bookSlice";

export default function AddBookPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageBookData, setImageBookData] = useState();
  const [genreBookData, setgenreBookData] = useState();
  const [statusBookData, setstatusBookData] = useState();
  const nameBookRef = useRef(null);
  const genreBookRef = useRef(null);
  const descriptionBookRef = useRef(null);
  const issueBookRef = useRef(null);
  const authorBookRef = useRef(null);
  const quantityBookRef = useRef(null);
  const statusBookRef = useRef(null);
  const codeBookRef = useRef(null);
  const dateAddBookRef = useRef(null);
  const imageBookRef = useRef(null);

  const getBookApi = async () => {
    try {
      const res = await customAxios.post("/bookList");
      dispatch(addListBook(res.data));
      // setbookState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
    dispatch(
      addBook({
        nameBook: nameBookRef.current.value,
        genreBook: genreBookRef.current.value,
        descriptionBook: descriptionBookRef.current.value,
        issueBook: issueBookRef.current.value,
        authorBook: authorBookRef.current.value,
        quantityBook: quantityBookRef.current.value,
        statusBook: statusBookRef.current.value,
        codeBook: codeBookRef.current.value,
        dateAddBook: dateAddBookRef.current.value,
        imageBook: imageBookData,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/bookList");
        // getBookApi();
      });
  };

  const handleCancel = (e) => {
    navigate("/bookList");
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-2" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">Library Manager</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link className="nav-link " type="button" to="/home">
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

        <div className="col-sm-10" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <h6 className="content-account">Admin</h6>
            </div>

            <div className="control-addReader container">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Thêm sách</h4>
                <Form>
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
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          ref={genreBookRef}
                          onChange={(e) => setgenreBookData(e.target.value)}
                        >
                          <option selected disabled>
                            Thể loại
                          </option>
                          <option value="Giáo trình">Giáo trình</option>
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
                        <label for="email">Số lượng:</label>
                        <input
                          ref={quantityBookRef}
                          type="number"
                          className="form-control"
                          placeholder="Enter quantity"
                        />
                      </div>
                    </div>

                    {/* <div class="form-horizontal col-sm-5">
                      <div className="avatar-wrapper">
                        <img className="profile-pic" src="" />
                        <div className="upload-button">
                          <i
                            className="fa fa-arrow-circle-up"
                            aria-hidden="true"
                          >
                            <FontAwesomeIcon icon={faArrowAltCircleUp} />
                          </i>
                        </div>
                        <input
                          value={imageBookData}
                          ref={imageBookRef}
                          onClick={(e) => setImageBookData(e.target.value)}
                          className="file-upload"
                          type="file"
                          accept="image/*"
                        />
                      </div>
                    </div> */}

                    <div className="form-horizontal col-sm-5">
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
                          <Button
                            type="submit"
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
