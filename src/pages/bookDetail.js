import {
  faAddressBook,
  faBook,
  faBookBookmark,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { customAxios } from "../config/api";

export default function BookDetail() {
  const params = useParams();
  const bookId = params.bookId;
  // console.log("id: ", bookId);

  const [detailBook, setdetailBook] = useState(null);
  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    try {
      const dataDetail = await customAxios.get(`/bookList/${bookId}`);
      setdetailBook(dataDetail.data);
      console.log("id: ", bookId);
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };
  // console.log("detail: ", detailBook);
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
          <div class="control-addReader container">
            <div class="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
              <h4 class="ml-0 mt-0">Chi tiết sách</h4>
              <div class="row">
                {/* <div class="form-horizontal col-sm-5">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div> */}
                <div className="form-group">
                  {/* <div className="col-sm-6 text-center">
                <img
                  className="avatar-wrapper mt-1 mb-1"
                  src="./OK.jpg"
                  alt=""
                />
              </div> */}
                  <div className="form-group">
                    <Table
                      striped
                      bordered
                      hover
                      size="sm"
                      className="table table-bordered"
                      style={{
                        border: "1px solid black",
                        width: "75%",
                      }}
                    >
                      {/* <table className="table table-bordered"> */}
                      <tr
                        style={{
                          border: "1px solid black",
                        }}
                      >
                        <th style={{ padding: "10px", width: "100px" }}>
                          Tên sách:
                        </th>
                        <td>{detailBook?.nameBook}</td>
                      </tr>
                      <tr
                        style={{
                          border: "1px solid black",
                        }}
                      >
                        <th style={{ padding: "10px", width: "100px" }}>
                          Mã sách:{" "}
                        </th>
                        <td>{detailBook?.codeBook}</td>
                      </tr>
                      <tr
                        style={{
                          border: "1px solid black",
                        }}
                      >
                        <th style={{ padding: "10px", width: "100px" }}>
                          Tác giả:{" "}
                        </th>
                        <td>{detailBook?.authorBook}</td>
                      </tr>
                      <tr
                        style={{
                          border: "1px solid black",
                        }}
                      >
                        <th style={{ padding: "10px", width: "100px" }}>
                          Thể loại:{" "}
                        </th>
                        <td>{detailBook?.genreBook}</td>
                      </tr>
                      <tr
                        style={{
                          border: "1px solid black",
                        }}
                      >
                        <th style={{ padding: "10px", width: "100px" }}>
                          Mô tả:{" "}
                        </th>
                        <td>{detailBook?.descriptionBook}</td>
                      </tr>
                      {/* <tr>
                        <th>Số phát hành: </th>
                        <td>{detailBook?.issueBook}</td>
                      </tr> */}
                    </Table>
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
