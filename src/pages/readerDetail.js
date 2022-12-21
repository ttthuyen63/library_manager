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

export default function ReaderDetail() {
  const params = useParams();
  const readerId = params.readerId;
//   console.log("id: ", bookId);

  const [detailReader, setdetailReader] = useState(null);
  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    try {
      const dataDetail = await customAxios.get(`/readerList/${readerId}.json`);
      setdetailReader(dataDetail.data);
      console.log("id: ", readerId);
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };
  // console.log("detail: ", detailReader);
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
                <Link
                  className="nav-link active"
                  type="button"
                  to="/readerList"
                >
                  <FontAwesomeIcon icon={faAddressBook} /> Quản lý bạn đọc
                </Link>
                <Link className="nav-link " type="button" to="/bookList">
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
          <div class="control-addReader container">
            <div class="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
              <h4 class="ml-0 mt-0">Chi tiết bạn đọc</h4>
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
                    <Table>
                      <tr>
                        <th>Họ và tên: </th>
                        <td>{detailReader?.nameReader}</td>
                      </tr>
                      <tr>
                        <th>Giới tính: </th>
                        <td>{detailReader?.genderReader}</td>
                      </tr>
                      <tr>
                        <th>Ngày sinh: </th>
                        <td>{detailReader?.birthReader}</td>
                      </tr>
                      <tr>
                        <th>Địa chỉ: </th>
                        <td>{detailReader?.addressReader}</td>
                      </tr>
                      <tr>
                        <th>Số điện thoại: </th>
                        <td>{detailReader?.phoneReader}</td>
                      </tr>
                      {/* <tr>
                        <th>Số phát hành: </th>
                        <td>{detailReader?.issueBook}</td>
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
