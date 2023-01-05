import React from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faAddressBook,
  faBook,
  faBookBookmark,
  faTimesCircle,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { customAxios } from "../config/api";
import { addListBook } from "../redux/bookSlice";
import { useState } from "react";
import { addListReader } from "../redux/readerSlice";
import { addListBorrow } from "../redux/borrowSlice";
import { logout } from "../redux/userSlice";

export default function HomePage() {
  // const [first, setfirst] = useState(second);
  const [bookStateLength, setbookStateLength] = useState(null);
  const [readerStateLength, setreaderStateLength] = useState(null);
  const [borrowStateLength, setborrowStateLength] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getBookApi();
    getReaderApi();
    getBorrowApi();
  }, []);
  const getBookApi = async () => {
    try {
      const res = await customAxios.get("/bookList");
      dispatch(addListBook(res.data));
      setbookStateLength(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };
  const getReaderApi = async () => {
    try {
      const res = await customAxios.get("/readerList");
      dispatch(addListReader(res.data));
      setreaderStateLength(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };
  const getBorrowApi = async () => {
    try {
      const res = await customAxios.get("/borrowList");
      dispatch(addListBorrow(res.data));
      setborrowStateLength(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };

  return (
    <div className="row">
      <div className="col-sm-2" style={{ padding: 0 }}>
        <div className="menu">
          <h4 className="menu-header">Library Manager</h4>
          <div className="d-flex align-items-start">
            <div className="nav flex-column nav-pills">
              <Link
                className="nav-link active"
                type="button"
                to="/home"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
              <Link className="nav-link" type="button" to="/readerList">
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
            {/* <h5 className="content-account"> */}
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              width={50}
            >
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <Button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </li>
            </ul>
            {/* </h5> */}
          </div>

          <h2 className="mt-4" style={{ textAlign: "center" }}>
            Thống kê
          </h2>
          <div className="statistical">
            <div className="statistical-card bg-blue m-2">
              <div className="statistical-info ml-4 mt-4">
                <h2 className="number-reader">{readerStateLength?.length}</h2>
                <p className="statistical-item">Bạn đọc</p>
              </div>
              <span className="statistical-icon">
                <FontAwesomeIcon icon={faAddressBook} />
              </span>
              <Link className="btn more-info" type="button" to="/readerList">
                More info
                <span className={{ ariaHidden: true }}>
                  <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </span>
              </Link>
            </div>

            <div className="statistical-card bg-green m-2">
              <div className="statistical-info ml-4 mt-4">
                <h2 className="number-reader">{bookStateLength?.length}</h2>
                <p className="statistical-item">Cuốn sách</p>
              </div>
              <span className="statistical-icon">
                <FontAwesomeIcon icon={faBook} />
              </span>
              <Link className="btn more-info" type="button" to="/bookList">
                More info
                <span className={{ ariaHidden: true }}>
                  <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </span>
              </Link>
            </div>

            <div className="statistical-card bg-orange m-2">
              <div className="statistical-info ml-4 mt-4">
                <h2 className="number-reader">{borrowStateLength?.length}</h2>
                <p className="statistical-item">Số lượng đang mượn</p>
              </div>
              <span className="statistical-icon">
                <FontAwesomeIcon icon={faBookBookmark} />
              </span>
              <Link className="btn more-info" type="button" to="/borrow">
                More info
                <span className={{ ariaHidden: true }}>
                  <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </span>
              </Link>
            </div>

            <div className="statistical-card bg-red m-2">
              <div className="statistical-info ml-4 mt-4">
                <h2 className="number-reader">12</h2>
                <p className="statistical-item">Vi phạm</p>
              </div>
              <span className="statistical-icon">
                <FontAwesomeIcon icon={faTimesCircle} />
              </span>
              <button className="btn more-info">
                More info
                <span className={{ ariaHidden: true }}>
                  <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </span>
              </button>
            </div>
          </div>

          <div className="recently mt-5">
            <div className="recently-table shadow-sm p-3 mb-5 bg-white rounded">
              <h4>Sách mới nhập</h4>
              <table className="table recently-book">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Mã sách</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Số lượng</th>
                    {/* <th scope="col">Giá thành</th> */}
                    <th scope="col">Ngày nhập</th>
                  </tr>
                </thead>
                <tbody id="myTable">
                  {bookStateLength?.map((item, index) => (
                    <tr>
                      {/* <th scope="row"></th> */}
                      <td>{item.id}</td>
                      <td>{item.codeBook}</td>
                      <td>{item.nameBook}</td>
                      {/* <td>{item.codeBook}</td>
                      <td>{item.genreBook}</td> */}
                      <td>{item.quantityBook}</td>
                      <td>{item.dateAddBook}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="recently-table shadow-sm p-3 mb-5 bg-white rounded">
              <h4>Bạn đọc vi phạm</h4>
              <table className="table recently-violated">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên bạn đọc</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Ngày hết hạn</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Phí thu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Reader1</td>
                    <td>Con thỏ</td>
                    <td>20-11-2022</td>
                    <td>Quá hạn</td>
                    <td>500.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
