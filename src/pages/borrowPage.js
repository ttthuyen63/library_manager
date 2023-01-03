import React, { useState, useEffect } from "react";
import { Container, Tooltip } from "react-bootstrap";
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { addListBorrow } from "../redux/borrowSlice";

export default function BorrowPage() {
  const [borrowState, setborrowState] = useState(null);
  const [search, setSearch] = useState(borrowState);
  const [show, setShow] = useState(false);
  console.log("borrowState...", borrowState);
  const borrowList = useSelector((state) => state.borrowReducer);
  // const bookList = Object.entries(bookState);
  // const bookList = Object.values(bookState).map(Object.values);
  // bookList.push(bookState);

  console.log("borrowList...", borrowList);

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

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...borrowState];
    // console.log("search bookstate", bookState);
    searchList = searchList.filter((item) => {
      return (
        item.codeReaderBorrow.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
      // console.log("item", typeof item.nameBook);
    });
    setSearch(searchList);
    setShow(true);
  };

  const goToDetail = (id) => {
    navigate("/borrow/" + id);
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
              <h6 className="content-account">Admin</h6>
            </div>

            <div className="control-reader">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Thông tin mượn/trả</h4>

                <form className="form-inline w-100">
                  <input
                    type="text"
                    className="book-search form-control w-30 mb-2 mr-3"
                    placeholder="Tìm kiếm"
                    onChange={handleChangeSearch}
                  />

                  <select className="browser-default custom-select w-30 mb-2 mr-3">
                    <option selected disabled>
                      Trạng thái
                    </option>
                    <option value="borrowed">Đang mượn</option>
                    <option value="lose">Quá hạn</option>
                  </select>
                  <Link
                    className="btn btn-success mb-2 mr-3 mg-right"
                    type="button"
                    to="/addBorrow"
                  >
                    <FontAwesomeIcon icon={faPlusCircle} /> Thêm
                  </Link>
                </form>

                <table className="table recently-violated">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Mã bạn đọc</th>
                      <th scope="col">Tên bạn đọc</th>
                      <th scope="col">Đang mượn</th>
                      {/* <th scope="col">Ngày mượn</th> */}
                      {/* <th scope="col">Hết hạn</th> */}
                      {/* <th scope="col">Trạng thái</th> */}
                      <th scope="col">Hành động</th>
                    </tr>
                  </thead>
                  {show === false ? (
                    <tbody id="myTable">
                      {borrowState?.map((item, index) => (
                        <tr>
                          {/* <th scope="row"></th> */}
                          <td>{item.id}</td>
                          {/* <td>{item.codeBookBorrow}</td> */}
                          <td>{item.codeReaderBorrow}</td>
                          <td>{item.nameReaderBorrow}</td>
                          <td>{item.quantityBorrow}/10</td>
                          {/* <td>{item.dateAddBorrow}</td>
                          <td>{item.dateEndBorrow}</td> */}
                          {/* <td>
                            {item.statusBorrow === "borrowing" ? (
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
                          </td> */}
                          {/* <!-- Borrowed thì đổi className thành btn btn-info -->                            
                            <!-- Expired thì đổi className thành btn btn-warning -->                            
                            <!-- Losed thì đổi className thành btn btn-danger -->                             */}

                          <td>
                            <button
                              onClick={() => goToDetail(item.id)}
                              variant="primary"
                              type="button"
                              className="btn btn-primary btn-xs"
                              data-toggle="modal"
                              data-target="#moreModal"
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xem thêm",
                                }}
                              >
                                <FontAwesomeIcon icon={faStickyNote} />
                              </span>
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-xs"
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Chỉnh sửa",
                                }}
                              >
                                <FontAwesomeIcon icon={faPencilSquare} />
                              </span>
                            </button>
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
                  ) : (
                    ""
                  )}
                  {show === true ? (
                    <tbody id="myTable">
                      {search?.map((item, index) => (
                        <tr>
                          {/* <th scope="row"></th> */}
                          <td>{item.id}</td>
                          <td>{item.codeBookBorrow}</td>
                          <td>{item.codeReaderBorrow}</td>
                          <td>{item.quantityBorrow}</td>
                          <td>{item.dateAddBorrow}</td>
                          <td>{item.dateEndBorrow}</td>
                          {/* <td>
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
                          </td> */}
                          {/* <!-- Borrowed thì đổi className thành btn btn-info -->                            
                            <!-- Expired thì đổi className thành btn btn-warning -->                            
                            <!-- Losed thì đổi className thành btn btn-danger -->                             */}

                          <td>
                            <button
                              onClick={() => goToDetail(item.id)}
                              variant="primary"
                              type="button"
                              className="btn btn-primary btn-xs"
                              data-toggle="modal"
                              data-target="#moreModal"
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xem thêm",
                                }}
                              >
                                <FontAwesomeIcon icon={faStickyNote} />
                              </span>
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-xs"
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Chỉnh sửa",
                                }}
                              >
                                <FontAwesomeIcon icon={faPencilSquare} />
                              </span>
                            </button>
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
                  ) : (
                    ""
                  )}
                </table>
                {/* <!-- Modal xóa --> */}
                <div id="delModal" className="modal fade" role="dialog">
                  <div className="modal-dialog">
                    {/* <!-- Modal content--> */}
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Bạn có chắc là sẽ xóa?</h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>
                          Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc
                          chắn là sẽ muốn xóa.
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-primary btn-xs"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-xs"
                          data-dismiss="modal"
                        >
                          <i>Delete</i>
                        </button>
                        {/* <!-- <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> --> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Modal xem thêm --> */}
                <div id="moreModal" className="modal fade" role="dialog">
                  <div className="modal-dialog">
                    {/* <!-- Modal content--> */}
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Thông tin chi tiết</h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-body row">
                        <div className="col-sm-6 text-center">
                          <img
                            className="avatar-wrapper mt-1 mb-1"
                            src="./OK.jpg"
                            alt=""
                          />
                        </div>
                        <div className="col-sm-6 mt-2">
                          <h5>Tên sách</h5>
                          <h5>Mã sách</h5>
                          <h5>Thể loại</h5>
                          <h5>Số phát hành</h5>
                          <h5>Tác giả</h5>
                          <h5>Giá</h5>
                          <h5>Trạng thái</h5>
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
    </div>
  );
}
