import React, { useState, use } from "react";
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
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBook, addListBook } from "../redux/bookSlice";
import { useEffect } from "react";
import { logout } from "../redux/userSlice";
import moment from "moment";

export default function EditBookPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ...stateLocation } = useLocation();
  const itemDetail = stateLocation?.state;
  console.log("itemDetail...", itemDetail);
  const newDate = new Date(itemDetail?.createDate[6]);
  const createdDateDetail = moment(newDate).format("YYYY-MM-DD");
  const [bookState, setbookState] = useState(null);
  const [nameBook, setNameBook] = useState(itemDetail?.bookName);
  const [genreBook, setgenreBook] = useState(itemDetail?.category);
  const [issueBook, setIssueBook] = useState(itemDetail?.publisher);
  const [authorBook, setAuthorBook] = useState(itemDetail?.auth);
  const [quantityBook, setQuantityBook] = useState(itemDetail?.amount);
  const [descriptionBook, setDescriptionBook] = useState(
    itemDetail?.description
  );
  const [codeBook, setCodeBook] = useState(itemDetail?.codeBook);
  const [dateAddBook, setDateAddBook] = useState(createdDateDetail);
  const queryParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    getBookApi();
  }, []);
  const getBookApi = async () => {
    try {
      const res = await customAxios.get("/lbm/v1/book/info/get-all");
      dispatch(addListBook(res.data));
      setbookState(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };
  // const [editBook, seteditBook] = useState(bookState);
  const handleSubmit = async (e) => {
    e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
    const newData = {
      data: {
        auth: authorBook,
        bookImage: itemDetail?.bookImage,
        bookName: nameBook,
        category: genreBook,
        description: descriptionBook,
        price: itemDetail?.price,
        publisher: issueBook,
      },
      updateFields: [
        "auth",
        "bookImage",
        "bookName",
        "category",
        "description",
        "price",
        "publisher",
      ],
    };
    const response = await customAxios.post(
      `/lbm/v1/book/info/update?id=${bookId}`,
      newData
    );
    // seteditBook(response.data);
    navigate("/bookList");
    console.log("testdata", response.data);
  };

  const handleCancel = (e) => {
    navigate("/bookList");
  };

  const params = useParams();
  const bookId = params.bookId;
  // useEffect(() => {
  //   editBookItem();
  // }, []);
  // const editBookItem = async () => {
  //   try {
  //     const dataBook = await customAxios.get(`/bookList/${bookId}`);
  //     seteditBook(dataBook.data);
  //     console.log("id: ", bookId);
  //   } catch (error) {
  //     console.log("Lỗi: ", error);
  //   }
  // };

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
                  className="nav-link"
                  type="button"
                  to="/readerList"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faAddressBook} /> Quản lý bạn đọc
                </Link>
                <Link
                  className="nav-link active"
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

            <div className="control-addReader container">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Chỉnh sửa thông tin sách</h4>
                <Form>
                  <div className="row">
                    <div className="form-horizontal col-sm-5">
                      <div className="form-group">
                        <label className="control-label">Tên sách:</label>
                        <input
                          // ref={nameBookRef}
                          value={nameBook}
                          type="text"
                          className="form-control"
                          placeholder="Enter name"
                          onChange={(e) => setNameBook(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label for="">Thể loại: </label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          // ref={genreBookRef}
                          value={genreBook}
                          onChange={(e) => setgenreBook(e.target.value)}
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
                          <option value="Văn học">Văn học</option>
                          <option value="Tâm lý">Tâm lý</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label for="">Số phát hành:</label>
                        <input
                          // ref={issueBookRef}
                          value={issueBook}
                          type="number"
                          className="form-control"
                          placeholder="Enter number"
                          onChange={(e) => setIssueBook(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Tác giả:</label>
                        <input
                          // ref={authorBookRef}
                          value={authorBook}
                          type="text"
                          className="form-control"
                          placeholder="Enter Author"
                          onChange={(e) => setAuthorBook(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label for="email">Số lượng:</label>
                        <input
                          // ref={quantityBookRef}
                          value={quantityBook}
                          type="number"
                          className="form-control"
                          placeholder="Enter quantity"
                          onChange={(e) => setQuantityBook(e.target.value)}
                          disabled={true}
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
                          // ref={descriptionBookRef}
                          value={descriptionBook}
                          className="form-control"
                          rows="4"
                          cols="50"
                          onChange={(e) => setDescriptionBook(e.target.value)}
                        ></textarea>
                      </div>

                      {/* <div className="form-group">
                        <label className="control-label" for="pwd">
                          Mã sách:
                        </label>
                        <input
                          // ref={codeBookRef}
                          value={codeBook}
                          type="text"
                          className="form-control"
                          placeholder="Enter code book"
                          onChange={(e) => setCodeBook(e.target.value)}
                        />
                      </div> */}

                      <div className="form-group">
                        <label className="control-label" for="email">
                          Ngày thêm:
                        </label>
                        <input
                          // ref={dateAddBookRef}
                          value={dateAddBook}
                          type="date"
                          className="form-control"
                          placeholder="dd-mm-yy"
                          onChange={(e) => setDateAddBook(e.target.value)}
                          disabled={true}
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
