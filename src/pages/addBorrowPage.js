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
import { Link, useParams } from "react-router-dom";
import { customAxios } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBorrow, addListBorrow } from "../redux/borrowSlice";
import { logout } from "../redux/userSlice";

export default function AddBorrowPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const borrowId = params.borrowId;
  const [imageBookData, setImageBookData] = useState();
  const [typeBorrowData, settypeBorrowData] = useState();
  const [statusBorrowData, setstatusBorrowData] = useState();
  const codeBookBorrowRef = useRef(null);
  const codeReaderBorrowRef = useRef(null);
  const quantityBorrowRef = useRef(null);
  const statusBorrowRef = useRef(null);
  const descriptionBorrowRef = useRef(null);
  const dateAddBorrowRef = useRef(null);
  const dateEndBorrowRef = useRef(null);
  const typeBorrowRef = useRef(null);
  // const codeBookRef = useRef(null);
  // const dateAddBookRef = useRef(null);
  // const imageBookRef = useRef(null);

  const getBorrowApi = async () => {
    try {
      const res = await customAxios.post(`/borrowList/${borrowId}`);
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
        descriptionBorrow: descriptionBorrowRef.current.value,
        dateAddBorrow: dateAddBorrowRef.current.value,
        dateEndBorrow: dateEndBorrowRef.current.value,
        typeBorrow: typeBorrowRef.current.value,
        // codeBook: codeBookRef.current.value,
        // dateAddBook: dateAddBookRef.current.value,
        // imageBook: imageBookData,
      })
    )
      .unwrap()
      .then(() => {
        navigate(`/borrow`);
        // getBorrowApi();
      });
  };

  const handleCancel = (e) => {
    navigate("/borrow");
  };

  // const handleDate = () => {
  //   dateAddBorrowRef.setDate(dateAddBorrowRef.getDate() + 7); // add 7 days
  //   var dateThongThuong =
  //     dateAddBorrowRef.getFullYear() +
  //     "-" +
  //     (dateAddBorrowRef.getMonth() + 1 < 10 ? "0" : "") +
  //     (dateAddBorrowRef.getMonth() + 1) +
  //     "-" +
  //     dateAddBorrowRef.getDate();
  //   return dateThongThuong;
  //   console.log("datetest", dateThongThuong);
  // };
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
                  Logout
                </Button>
              </h5>
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

                      {/* <div className="form-group">
                        <label for="">Trạng thái:</label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          ref={statusBorrowRef}
                          onChange={(e) => setstatusBorrowData(e.target.value)}
                        >
                          <option selected disabled>
                            Trạng thái mượn
                          </option>
                          <option value="Đang mượn">Đang mượn</option>
                          <option value="Quá hạn">Quá hạn</option>
                        </select>
                      </div> */}
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
                        <label for="">Kiểu cho mượn:</label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          ref={typeBorrowRef}
                          onChange={(e) => settypeBorrowData(e.target.value)}
                        >
                          <option selected disabled>
                            Chọn
                          </option>
                          <option value="Thông thường">Thông thường</option>
                          <option value="Ấn định hạn trả">
                            Ấn định hạn trả
                          </option>
                        </select>
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
