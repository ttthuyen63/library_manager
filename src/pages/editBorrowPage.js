import React from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faArrowAltCircleUp,
  faBook,
  faBookBookmark,
  faHome,
  faPencilSquare,
  faPlusCircle,
  faSave,
  faStickyNote,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { customAxios } from "../config/api";
import { addListBorrow } from "../redux/borrowSlice";
import { logout } from "../redux/userSlice";

export default function EditBorrowPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ...stateLocation } = useLocation();
  const itemDetail = stateLocation?.state;
  console.log("itemDetail...", itemDetail);
  const [borrowState, setborrowState] = useState(null);
  const [nameBook, setNameBook] = useState(itemDetail?.nameBook);
  const [genreBook, setgenreBook] = useState(itemDetail?.genreBook);
  const [issueBook, setIssueBook] = useState(itemDetail?.issueBook);
  const [authorBook, setAuthorBook] = useState(itemDetail?.authorBook);
  const [quantityBook, setQuantityBook] = useState(itemDetail?.quantityBook);
  const [descriptionBook, setDescriptionBook] = useState(
    itemDetail?.descriptionBook
  );
  const [codeBook, setCodeBook] = useState(itemDetail?.codeBook);
  const [dateAddBook, setDateAddBook] = useState(itemDetail?.dateAddBook);

  const queryParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    getBorrowApi();
  }, []);
  const getBorrowApi = async () => {
    try {
      const res = await customAxios.get("/borrowList");
      dispatch(addListBorrow(res.data));
      setborrowState(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
    const newData = {
      ...itemDetail,
      nameBook: nameBook,
      genreBook: genreBook,
      issueBook: issueBook,
      authorBook: authorBook,
      quantityBook: Number(quantityBook),
      descriptionBook: descriptionBook,
      codeBook: codeBook,
      dateAddBook: dateAddBook,
    };
    const response = await customAxios.put(`/bookList/${bookId}`, newData);
    // seteditBook(response.data);
    navigate("/bookList");
    console.log("testdata", response.data);
  };

  const handleCancel = (e) => {
    navigate("/bookList");
  };

  const params = useParams();
  const bookId = params.bookId;

  return (
    <div>
      <div className="row">
        <div className="col-sm-3" style={{ padding: 0 }}>
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
                  className="nav-link"
                  type="button"
                  to="/bookList"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faBook} /> Quản lý sách
                </Link>
                <Link
                  className="nav-link active"
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

        <div className="col-sm-9" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <h5 className="content-account">
                <Button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </h5>
            </div>

            <div className="control-addReader container">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Chỉnh sửa mượn/trả</h4>
                <div className="row">
                  <div className="form-horizontal col-sm-5">
                    <div className="form-group">
                      <label className="control-label">Mã sách:</label>
                      {/* <input type="text" className="form-control" placeholder="Enter code book"> */}
                    </div>

                    <div className="form-group">
                      <label for="">Mã bạn đọc:</label>
                      {/* <input type="number" className="form-control" placeholder="Enter code reader"> */}
                    </div>

                    <div className="form-group">
                      <label for="email">Số lượng:</label>
                      {/* <input type="number" className="form-control"placeholder="Enter number"> */}
                    </div>

                    <div className="form-group">
                      <label for="">Trạng thái:</label>
                      <select className="browser-default custom-select mb-2 mr-3">
                        <option selected disabled>
                          Status borrowing
                        </option>
                        <option value="borrowed">Borrowed</option>
                        <option value="enpired">Enpired</option>
                        <option value="losed">Losed</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-10">
                        <button type="button" className="btn btn-success">
                          <FontAwesomeIcon icon={faSave} /> Lưu
                        </button>
                        <button type="button" className="btn btn-danger">
                          &times; Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-horizontal col-sm-5">
                    <div className="form-group">
                      <label className="control-label">Ghi chú:</label>
                      <textarea
                        rows="4"
                        cols="50"
                        className="form-control"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="email">
                        Ngày thêm:
                      </label>
                      <input type="date" className="form-control" />
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="email">
                        Hết hạn:
                      </label>
                      <input type="date" className="form-control" />
                    </div>
                    {/* <!-- <div className="form-group">
                                    <label className="control-label" for="email">Ngày hết hạn:</label>
                                    <input type="date" className="form-control" placeholder="dd-mm-yy"/>
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
