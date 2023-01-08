import {
  faAddressBook,
  faBook,
  faBookBookmark,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../config/api";
import { logout } from "../redux/userSlice";
import QRCode from "react-qr-code";
import { addListBook } from "../redux/bookSlice";

export default function BookDetail() {
  const params = useParams();
  const bookId = params.bookId;
  console.log("id: ", bookId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookState, setbookState] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    getBookApi();
  }, []);
  const getBookApi = async () => {
    try {
      const res = await customAxios.get("/lbm/v1/book/get-all");
      dispatch(addListBook(res.data));
      setbookState(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };
  console.log("data...", bookState);
  const [detailBook, setdetailBook] = useState(null);
  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    try {
      const dataDetail = await customAxios.get(`/lbm/v1/book/info/${bookId}`);
      setdetailBook(dataDetail.data);
      console.log("id: ", bookId);
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };
  // console.log("detail: ", detailBook);
  const test = bookState?.content?.map((item) => {
    return item?.id;
  });

  console.log("testid...", test);

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

            {/* <div className="col-sm-10" style={{ padding: 0 }}> */}
            <div class="control-addReader container">
              <div class="mt-3 control-reader-table shadow-sm p-0 mb-5 bg-white rounded">
                <h4 class="ml-0 mt-0" style={{ textAlign: "center" }}>
                  Chi tiết sách
                </h4>
                <div class="row">
                  <div class="col-sm-4 position-left">
                    <img
                      variant="bottom"
                      width={400}
                      height={400}
                      src={detailBook?.data.bookImage}
                    />
                  </div>
                  <div class="col-sm-8 position-right">
                    <div className="form-group">
                      <Table
                        striped
                        bordered
                        hover
                        size="sm"
                        style={{
                          width: "100%",
                        }}
                      >
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "100px" }}
                          >
                            Tên sách:
                          </th>
                          <td>{detailBook?.data.bookName}</td>
                        </tr>
                        {/* <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "100px" }}
                          >
                            Mã sách:{" "}
                          </th>
                          <td>{detailBook?.codeBook}</td>
                        </tr> */}
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "100px" }}
                          >
                            Tác giả:{" "}
                          </th>
                          <td>{detailBook?.data.auth}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "100px" }}
                          >
                            Thể loại:{" "}
                          </th>
                          <td>{detailBook?.data.category}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "100px" }}
                          >
                            Mô tả:{" "}
                          </th>
                          <td>{detailBook?.data.description}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "100px" }}
                          >
                            ID sách hiện có:{" "}
                          </th>
                          <td>
                            {bookState?.content?.map((item) => {
                              <a>{item.id}</a>;
                            })}
                          </td>
                        </tr>

                        {/* <tr>
                        <th>Số phát hành: </th>
                        <td>{detailBook?.issueBook}</td>
                      </tr> */}
                        {/* <QRCode
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={"hello"}
                          viewBox={`0 0 256 256`}
                        /> */}
                      </Table>
                    </div>
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
