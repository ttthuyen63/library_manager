import React, { useState, useRef } from "react";
import "../index.css";
import { Button, Container, Form } from "react-bootstrap";
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
import { customAxios } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBorrow, addListBorrow } from "../redux/borrowSlice";

export default function AddBorrowPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageBookData, setImageBookData] = useState();
  const [genreBookData, setgenreBookData] = useState();
  const [statusBorrowData, setstatusBorrowData] = useState();
  const codeBookBorrowRef = useRef(null);
  const codeReaderBorrowRef = useRef(null);
  const quantityBorrowRef = useRef(null);
  const statusBorrowRef = useRef(null);
  const descriptionBorrowRef = useRef(null);
  const dateAddBorrowRef = useRef(null);
  const dateEndBorrowRef = useRef(null);
  // const statusBookRef = useRef(null);
  // const codeBookRef = useRef(null);
  // const dateAddBookRef = useRef(null);
  // const imageBookRef = useRef(null);

  const getBorrowApi = async () => {
    try {
      const res = await customAxios.post("/borrowList");
      dispatch(addListBorrow(res.data));
      // setbookState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
    dispatch(
      addBorrow({
        codeBookBorrow: codeBookBorrowRef.current.value,
        codeReaderBorrow: codeReaderBorrowRef.current.value,
        quantityBorrow: quantityBorrowRef.current.value,
        statusBorrow: statusBorrowRef.current.value,
        descriptionBorrow: descriptionBorrowRef.current.value,
        dateAddBorrow: dateAddBorrowRef.current.value,
        dateEndBorrow: dateEndBorrowRef.current.value,
        // codeBook: codeBookRef.current.value,
        // dateAddBook: dateAddBookRef.current.value,
        // imageBook: imageBookData,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/borrow");
        // getBorrowApi();
      });
  };

  const handleCancel = (e) => {
    navigate("/borrow");
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
                <Link className="nav-link" type="button" to="/bookList">
                  <FontAwesomeIcon icon={faBook} /> Quản lý sách
                </Link>
                <Link className="nav-link active" type="button" to="/borrow">
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
                <h4 className="ml-0 mt-0">Mượn sách</h4>
                <Form>
                  <div className="row">
                    <div className="form-horizontal col-sm-5">
                      <div className="form-group">
                        <label className="control-label">Mã sách:</label>
                        <input
                          ref={codeBookBorrowRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter code book"
                        />
                      </div>

                      <div className="form-group">
                        <label for="">Mã bạn đọc:</label>
                        <input
                          ref={codeReaderBorrowRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter code reader"
                        />
                      </div>

                      <div className="form-group">
                        <label for="email">Số lượng:</label>
                        <input
                          ref={quantityBorrowRef}
                          type="number"
                          className="form-control"
                          placeholder="Enter number"
                        />
                      </div>

                      <div className="form-group">
                        <label for="">Trạng thái:</label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          ref={statusBorrowRef}
                          onChange={(e) => setstatusBorrowData(e.target.value)}
                        >
                          <option selected disabled>
                            Status borrowing
                          </option>
                          <option value="borrowing">Borrowing</option>
                          <option value="paid">Paid</option>
                          <option value="losed">Losed</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-horizontal col-sm-5">
                      <div className="form-group">
                        <label className="control-label">Ghi chú:</label>
                        <textarea
                          ref={descriptionBorrowRef}
                          rows="4"
                          cols="50"
                          className="form-control"
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label className="control-label" for="email">
                          Ngày thêm:
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          ref={dateAddBorrowRef}
                        />
                      </div>

                      <div className="form-group">
                        <label className="control-label" for="email">
                          Hết hạn:
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          ref={dateEndBorrowRef}
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
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
