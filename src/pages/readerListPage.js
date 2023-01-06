import React, { useState, useEffect } from "react";
import { Button, Container, Tooltip } from "react-bootstrap";
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
import { addListReader } from "../redux/readerSlice";
import HomePage from "./homePage";
import { logout } from "../redux/userSlice";

export default function ReaderListPage(props) {
  const [readerState, setreaderState] = useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(readerState);
  const [filterStatus, setfilterStatus] = useState(readerState);
  console.log("bookState...", readerState);
  const readerList = useSelector((state) => state.readerReducer);

  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    getReaderApi();
  }, []);
  const getReaderApi = async () => {
    try {
      const res = await customAxios.get("/readerList");
      dispatch(addListReader(res.data));
      setreaderState(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };
  console.log("test", readerState);
  const handleDelete = async (id) => {
    console.log("id: ", id);
    // const convertIdNumber = Number(id);
    // console.log("convert: ", convertIdNumber);
    try {
      await customAxios.delete(`readerList/${id}`);
      getReaderApi();
      // console.log(dataID.id);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  const goToDetail = (id) => {
    navigate("/readerList/" + id);
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...readerState];
    searchList = searchList.filter((item) => {
      return item.codeReader.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
  };

  const filterReader = (statusReader) => {
    setfilterStatus(
      readerState.filter((item) => item.statusReader === statusReader)
    );
  };

  // const statusReaders = Array.from(
  //   new Set(readerState.map((item) => item.statusReader))
  // );
  // console.log("test", readerState);

  const navigate = useNavigate();
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
                <Link
                  className="nav-link active"
                  type="button"
                  to="/readerList"
                >
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
                <h4 className="ml-0 mt-0">Thông tin bạn đọc</h4>

                <form className="form-inline w-100">
                  <input
                    type="text"
                    className="input-codeReader form-control w-30 mb-2 mr-3"
                    placeholder="Tìm kiếm"
                    onChange={handleChangeSearch}
                  />
                  <select
                    className="browser-default custom-select w-30 mb-2 mr-3"
                    // value={filterStatus}
                    onChange={(e) => filterReader(e.target.value)}
                  >
                    <option selected disabled>
                      Lọc trạng thái
                    </option>
                    {/* <option value="active">Active</option>
                    <option value="inactive">Inactive</option> */}
                    {/* {readerState.map((item) => {
                      return (
                        <option key={item.statusReader}>
                          {item.statusReader}
                        </option>
                      );
                    })} */}
                  </select>
                  <Link
                    className="btn btn-success mb-2 mr-3 mg-right"
                    type="button"
                    to="/addReader"
                  >
                    <FontAwesomeIcon icon={faPlusCircle} /> Thêm
                  </Link>
                </form>

                <table className="table recently-violated">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Tên bạn đọc</th>
                      <th scope="col">Mã bạn đọc</th>
                      <th scope="col">Giới tính</th>
                      <th scope="col">Ngày sinh</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Hành động</th>
                    </tr>
                  </thead>
                  {show === false ? (
                    <tbody id="myTable">
                      {readerState?.map((item, index) => (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.nameReader}</td>
                          <td>{item.codeReader}</td>
                          <td>{item.genderReader}</td>
                          <td>{item.birthReader}</td>
                          <td>
                            {item.statusReader === "active" ? (
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
                          </td>
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
                          <td>{item.id}</td>
                          <td>{item.nameReader}</td>
                          <td>{item.codeReader}</td>
                          <td>{item.genderReader}</td>
                          <td>{item.birthReader}</td>
                          <td>
                            {item.statusReader === "active" ? (
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
                          </td>
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
                          <h5>Họ và tên</h5>
                          <h5>Ngày sinh</h5>
                          <h5>Giới tính</h5>
                          <h5>029943598</h5>
                          <h5>Địa chỉ</h5>
                          <h5>Trạng thái đọc</h5>
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
