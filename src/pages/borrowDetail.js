import React, { useState, useEffect } from "react";
import { Container, Table, Tooltip } from "react-bootstrap";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { addListBorrow } from "../redux/borrowSlice";

export default function BorrowDetail() {
  const params = useParams();
  const borrowId = params.borrowId;
  // console.log("id: ", bookId);

  const [detailBorrow, setdetailBorrow] = useState(null);
  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    try {
      const dataDetail = await customAxios.get(`/borrow/${borrowId}`);
      setdetailBorrow(dataDetail.data);
      console.log("id: ", borrowId);
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="row">
        <div className="col-sm-2" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">Library Manager</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link className="nav-link" type="button" to="/">
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
              <h6 className="content-account">Admin</h6>
            </div>

            <div className="control-reader">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                {/* <h4 className="ml-0 mt-0">Thông tin mượn/trả</h4> */}
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
                      <h4>{detailBorrow?.codeReaderBorrow}</h4>
                      <h4>{detailBorrow?.nameReaderBorrow}</h4>
                      <h4>Chi tiết mượn / trả</h4>

                      <Table
                        style={{
                          border: "1px solid black",
                        }}
                      >
                        <tr
                          style={{
                            border: "1px solid black",
                          }}
                        >
                          <th style={{ width: "10%" }}>Tên sách: </th>
                          <td>{detailBorrow?.nameBook}</td>
                        </tr>
                        <tr
                          style={{
                            border: "1px solid black",
                          }}
                        >
                          <th>Mã bạn đọc: </th>
                          <td>{detailBorrow?.codeBook}</td>
                        </tr>
                        <tr
                          style={{
                            border: "1px solid black",
                          }}
                        >
                          <th>Tác giả: </th>
                          <td>{detailBorrow?.authorBook}</td>
                        </tr>
                        <tr
                          style={{
                            border: "1px solid black",
                          }}
                        >
                          <th>Thể loại: </th>
                          <td>{detailBorrow?.genreBook}</td>
                        </tr>
                        <tr
                          style={{
                            border: "1px solid black",
                          }}
                        >
                          <th>Mô tả: </th>
                          <td>{detailBorrow?.descriptionBook}</td>
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
    </div>
  );
}
