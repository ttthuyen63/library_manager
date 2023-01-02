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
  const [borrowState, setborrowState] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
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

  const [detailBorrow, setdetailBorrow] = useState(null);
  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    try {
      const dataDetail = await customAxios.get(`/borrowList/${borrowId}`);
      setdetailBorrow(dataDetail.data);
      console.log("id: ", borrowId);
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };
  const handleDelete = async (id) => {
    console.log("id: ", id);
    // const convertIdNumber = Number(id);
    // console.log("convert: ", convertIdNumber);
    try {
      await customAxios.delete(`borrowList/${id}`);
      getBorrowApi();
      // console.log(dataID.id);
    } catch (error) {
      console.log("Lỗi", error);
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

                      <table className="table recently-violated">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Mã sách</th>
                            <th scope="col">Tên sách</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Ngày mượn</th>
                            <th scope="col">Hết hạn</th>
                            <th scope="col">Trạng thái</th>
                            {/* <th scope="col">Hành động</th> */}
                          </tr>
                        </thead>
                        <tbody id="myTable">
                          {borrowState?.map((item, index) => (
                            <tr>
                              {/* <th scope="row"></th> */}
                              <td>{item.id}</td>
                              <td>{item.codeBookBorrow}</td>
                              <td>{item.nameBookBorrow}</td>
                              {/* <td>{item.nameReaderBorrow}</td> */}
                              <td>{item.quantityBorrow}</td>
                              <td>{item.dateAddBorrow}</td>
                              <td>{item.dateEndBorrow}</td>
                              <td>
                                {item.statusBorrow === "borrowing" ? (
                                  <button
                                    type="button"
                                    className="btn btn-warning btn-xs"
                                    disabled
                                  >
                                    Borrowing
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-success btn-xs"
                                    disabled
                                  >
                                    Paid
                                  </button>
                                )}
                              </td>
                              <td>
                                <button
                                  onClick={() => handleDelete(item?.id)}
                                  type="button"
                                  className="btn btn-danger btn-xs"
                                  data-toggle="modal"
                                  data-target="#delModal"
                                >
                                  <span
                                    className={{
                                      dataToggle: Tooltip,
                                      title: "Xóa",
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
