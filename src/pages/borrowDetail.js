import React, { useState, useEffect, useMemo } from "react";
import { Button, Container, Table, Tooltip } from "react-bootstrap";
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
import { logout } from "../redux/userSlice";

export default function BorrowDetail() {
  const params = useParams();
  const borrowId = params.borrowId;
  const codeReaderBorrow = params.codeReaderBorrow;
  // console.log("id: ", bookId);
  const [borrowState, setborrowState] = useState(null);
  const [filterBorrow, setfilterBorrow] = useState();
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
      const dataDetail = await customAxios.get(
        `/borrowList/${codeReaderBorrow}`
      );
      setdetailBorrow(dataDetail.data);
      console.log("data: ", detailBorrow);
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  function getFilterList() {
    if (!filterBorrow) {
      return borrowState;
    }
    return borrowState.filter((item) => item.codeReaderBorrow === filterBorrow);
  }

  var filterList = useMemo(getFilterList, [filterBorrow, borrowState]);
  function handleChange(event) {
    setfilterBorrow(event.target.value);
  }

  const handleDelete = async (id) => {
    console.log("id: ", id);
    try {
      await customAxios.delete(`borrowList/${id}`);
      getBorrowApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  const current = new Date();
  const monthNow = current.getMonth() + 1;
  const month = monthNow < 10 ? "0" + monthNow : monthNow;
  const day =
    current.getDate() < 10 ? "0" + current.getDate() : current.getDate();
  const date = `${current.getFullYear()}-${month}-${day}`;
  const nowDate = Number(date.slice(0, 10).split("-").join(""));
  // console.log("date", nowDate);

  const navigate = useNavigate();
  return (
    <div>
      <div className="row">
        <div className="col-sm-2" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">Library Manager</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link className="nav-link" type="button" to="/home">
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
                      {/* <h4>{detailBorrow?.codeReaderBorrow}</h4>
                      <h4>{detailBorrow?.nameReaderBorrow}</h4> */}
                      <h4>Chi tiết mượn / trả</h4>
                      <form className="form-inline w-100">
                        <select
                          className="browser-default custom-select w-30 mb-2 mr-3"
                          onChange={handleChange}
                        >
                          <option selected disabled>
                            Trạng thái
                          </option>
                          {/* <option value="">Tất cả</option>
                          <option value="Đang mượn">Đang mượn</option>
                          <option value="Quá hạn">Quá hạn</option> */}
                          <option value="">Tất cả</option>
                          <option value="BD01">BD01</option>
                          <option value="BD02">BD02</option>
                        </select>
                        <Link
                          className="btn btn-success mb-2 mr-3 mg-right"
                          type="button"
                          to={`/addBorrow/${borrowId}`}
                        >
                          <FontAwesomeIcon icon={faPlusCircle} /> Thêm
                        </Link>
                      </form>
                      <table className="table recently-violated">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Mã sách</th>
                            <th scope="col">Tên sách</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Kiểu mượn</th>
                            <th scope="col">Ngày mượn</th>
                            <th scope="col">Hết hạn</th>
                            <th scope="col">Trạng thái</th>
                            {/* <th scope="col">Hành động</th> */}
                          </tr>
                        </thead>
                        <tbody id="myTable">
                          {filterList?.map((item, index) => (
                            <tr>
                              {/* <th scope="row"></th> */}
                              <td>{item.id}</td>
                              <td>{item.codeBookBorrow}</td>
                              <td>{item.nameBookBorrow}</td>
                              {/* <td>{item.nameReaderBorrow}</td> */}
                              <td>{item.quantityBorrow}</td>
                              <td>{item.typeBorrow}</td>
                              <td>{item.dateAddBorrow}</td>
                              <td>{item.dateEndBorrow}</td>
                              <td>
                                {Number(
                                  item.dateEndBorrow
                                    .slice(0, 10)
                                    .split("-")
                                    .join("")
                                ) > nowDate ? (
                                  <button
                                    type="button"
                                    className="btn btn-success btn-xs"
                                    disabled
                                  >
                                    Đang mượn
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-xs"
                                    disabled
                                  >
                                    Quá hạn
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
