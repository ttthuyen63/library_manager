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
import ConvertToString from "../components/ConvertToString";

export default function ReaderDetail() {
  const params = useParams();
  const readerId = params.readId;
  console.log("id: ", readerId);

  const [detailReader, setdetailReader] = useState(null);

  const getDetail = async () => {
    try {
      const dataDetail = await customAxios.get(`/lbm/v1/users/${readerId}`);
      setdetailReader(dataDetail.data);
      console.log("id: ", readerId);
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };
  useEffect(() => {
    getDetail();
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToDetail = (id) => {
    navigate("/borrow/" + id);
  };
  console.log("detail: ", detailReader?.data.birthDate);
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
                  className="nav-link active"
                  type="button"
                  to="/readerList"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faAddressBook} /> Quản lý bạn đọc
                </Link>
                <Link
                  className="nav-link "
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
                  Logout
                </Button>
              </h5>
            </div>

            <div className="col-sm-10" style={{ padding: 0 }}>
              <div class="control-addReader container">
                <div class="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                  <h4 class="ml-0 mt-0" style={{ textAlign: "center" }}>
                    Chi tiết bạn đọc
                  </h4>
                  <div class="row">
                    <div class="col-sm-4 position-left">
                      <img
                        variant="bottom"
                        width={350}
                        height={350}
                        src="https://www.niams.nih.gov/sites/default/files/default_images/profile-image-placeholder_0.png"
                      />
                    </div>
                    <div class="col-sm-8 position-right">
                      <div
                        className="form-group"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Table
                          striped
                          bordered
                          hover
                          size="sm"
                          style={{
                            width: "50%",
                          }}
                        >
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Mã bạn đọc:{" "}
                            </th>
                            <td>{detailReader?.data.userCode}</td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Tên bạn đọc:{" "}
                            </th>
                            <td>{detailReader?.data.userName}</td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Giới tính:{" "}
                            </th>
                            <td>
                              {detailReader?.data.gender === "MALE"
                                ? "Nam"
                                : "Nữ"}
                            </td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Ngày sinh:{" "}
                            </th>
                            {/* <td>{detailReader?.data.birthDate}</td> */}
                            <td>
                              <ConvertToString
                                item={detailReader?.data?.birthDate}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Địa chỉ:{" "}
                            </th>
                            <td>{detailReader?.data.emailAddress}</td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Số điện thoại:{" "}
                            </th>
                            <td>{detailReader?.data.phoneNumber}</td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              ID bạn đọc:{" "}
                            </th>
                            <td>{detailReader?.data.id}</td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Đang mượn:{" "}
                            </th>
                            <td>
                              <a
                                onClick={() =>
                                  goToDetail(detailReader?.data.id)
                                }
                              >
                                {}/10
                              </a>
                            </td>
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
    </div>
  );
}
