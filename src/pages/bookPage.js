import React, { useState, useEffect } from "react";
import { button, Container, Tooltip } from "react-bootstrap";
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
import { addListBook } from "../redux/bookSlice";
const URL = "https://635a75b46f97ae73a62d386d.mockapi.io";

export default function BookPage() {
  const [bookState, setbookState] = useState(null);
  console.log("bookState...", bookState);
  const bookList = useSelector((state) => state.bookReducer);
  // const bookList = Object.entries(bookState);
  // const bookList = Object.values(bookState).map(Object.values);
  // bookList.push(bookState);

  console.log("bookList...", bookList);
  // console.log("id", bookState.id);

  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    getBookApi();
  }, []);
  const getBookApi = async () => {
    try {
      const res = await customAxios.get("/bookList");
      dispatch(addListBook(res.data));
      setbookState(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };
  // const data = bookState?.reduce((bookState, value, index) => {
  //   return { ...bookState, index: value };
  // }, {});
  const dataBook = Object.assign({}, bookState);
  console.log("data", dataBook);
  // const dataID = Object.values(dataBook);
  const dataID = Object.keys(dataBook).forEach((key) => {
    return dataBook[key];
  });
  console.log("value", dataID);
  const handleDelete = async (dataBook) => {
    try {
      await customAxios.delete(`${URL}/${dataID.id}`);
      getBookApi();
      console.log(dataID.id);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  const navigate = useNavigate();
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

        <div className="col-sm-9" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <h6 className="content-account">Admin</h6>
            </div>

            <div className="control-reader">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Thông tin sách</h4>

                <form className="form-inline w-100">
                  <input
                    type="text"
                    className="book-search form-control w-30 mb-2 mr-3"
                    placeholder="Tìm kiếm"
                  />

                  <select className="browser-default custom-select w-30 mb-2 mr-3">
                    <option selected disabled>
                      Thể loại
                    </option>
                    <option value="Kinh dị">Kinh dị</option>
                    <option value="Tình cảm">Tình cảm</option>
                    <option value="Giả tưởng">Giả tưởng</option>
                    <option value="Self-help">Self-help</option>
                    <option value="Tiểu sử">Tiểu sử</option>
                    <option value="Lịch sử">Lịch sử</option>
                    <option value="Hài hước">Hài hước</option>
                    <option value="Giáo dục">Giáo dục</option>
                  </select>
                  <Link
                    className="btn btn-success mb-2 mr-3 mg-right"
                    type="button"
                    to="/addBook"
                  >
                    <FontAwesomeIcon icon={faPlusCircle} /> Thêm
                  </Link>
                </form>

                <table className="table recently-violated">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Tên sách</th>
                      <th scope="col">Mã sách</th>
                      <th scope="col">Thể loại</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Tác giả</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Hành động</th>
                    </tr>
                  </thead>
                  <tbody id="myTable">
                    {bookState?.map((item, index) => (
                      <tr>
                        {/* <th scope="row"></th> */}
                        <td>{item.id}</td>
                        <td>{item.nameBook}</td>
                        <td>{item.codeBook}</td>
                        <td>{item.genreBook}</td>
                        <td>{item.quantityBook}</td>
                        <td>{item.authorBook}</td>
                        <td>
                          {/* <button
                            type="button"
                            className="btn btn-success btn-xs"
                            disabled
                          > */}
                          {item.statusBook === "active" ? (
                            <button
                              type="button"
                              className="btn btn-success btn-xs"
                              disabled
                            >
                              Active
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-danger btn-xs"
                              disabled
                            >
                              Inactive
                            </button>
                          )}
                          {/* {<button
                                type="button"
                                style={{item.statusBook }}
                                className="btn btn-success btn-xs"
                                disabled
                              ></button>} */}
                        </td>

                        <td>
                          <button
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
                            onClick={handleDelete}
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
                  {/* <BookItem bookList={bookState} /> */}
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
