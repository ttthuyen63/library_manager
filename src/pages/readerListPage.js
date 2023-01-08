import React, { useState, useEffect } from "react";
import { Button, Container, Modal, Tooltip } from "react-bootstrap";
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
import { useMemo } from "react";
import moment from "moment";
import ConvertToString from "../components/ConvertToString";
import StatusReader from "../components/StatusReader";

export default function ReaderListPage() {
  const [readerState, setreaderState] = useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(readerState?.content);
  const [filterReader, setfilterReader] = useState();
  const [showDel, setshowDel] = useState(false);

  console.log("readerState...", readerState);
  const readerList = useSelector((state) => state.readerReducer);

  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    getReaderApi();
  }, []);
  const getReaderApi = async () => {
    try {
      const res = await customAxios.get("/lbm/v1/users/get-all");
      dispatch(addListReader(res.data));
      setreaderState(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };
  // console.log("test", readerState);

  const handleEdit = (item) => {
    console.log("item...", item);
    navigate("/editReader/" + item?.id, {
      state: item,
    });
  };

  const handleClose = () => {
    setshowDel(false);
  };

  const handleClickDelete = (id) => {
    setshowDel(true);
    console.log("id...", id);
  };

  const handleDelete = async (id) => {
    console.log("id: ", id);
    try {
      await customAxios.post(`/lbm/v1/users/delete?id=${id}`);
      getReaderApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };
  const goToDetail = (id) => {
    navigate("/readerList/" + id);
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...readerState?.content];
    searchList = searchList?.filter((item) => {
      return item?.userCode.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
  };
  // function getFilterList() {
  //   if (!filterReader) {
  //     return readerState;
  //   }
  //   return readerState.filter(
  //     (item) => item.statusReader.props.value === filterReader
  //   );
  // }

  // var filterList = useMemo(getFilterList, [filterReader, readerState]);
  // function handleChange(event) {
  //   setfilterReader(event.target.value);
  // }

  // const statusReaders = Array.from(
  //   new Set(readerState.map((item) => item.statusReader))
  // );
  // console.log("test", readerState);

  const current = new Date();
  const monthNow = current.getMonth() + 1;
  const month = monthNow < 10 ? "0" + monthNow : monthNow;
  const day =
    current.getDate() < 10 ? "0" + current.getDate() : current.getDate();
  const date = `${current.getFullYear()}-${month}-${day}`;
  const nowDate = Number(date.slice(0, 10).split("-").join(""));

  const navigate = useNavigate();

  return (
    <div>
      {show === false ? (
        <div>
          {readerState?.content?.map((item, index) => (
            <Modal show={showDel} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Bạn có chắc là sẽ xóa?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={() => handleDelete(item?.id)}>
                  Xóa
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Hủy
                </Button>
              </Modal.Footer>
            </Modal>
          ))}
        </div>
      ) : (
        <div>
          {search?.map((item, index) => (
            <Modal show={showDel} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Bạn có chắc là sẽ xóa?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={() => handleDelete(item?.id)}>
                  Xóa
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Hủy
                </Button>
              </Modal.Footer>
            </Modal>
          ))}
        </div>
      )}
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
                  className="nav-link"
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

            <div className="control-reader">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Thông tin bạn đọc</h4>

                <form className="form-inline w-100">
                  <input
                    type="text"
                    className="input-userCode form-control w-30 mb-2 mr-3"
                    placeholder="Tìm kiếm theo mã bạn đọc"
                    onChange={handleChangeSearch}
                  />
                  <select
                    className="browser-default custom-select w-30 mb-2 mr-3"
                    // value={filterStatus}
                    // onChange={handleChange}
                  >
                    <option selected disabled>
                      Lọc trạng thái
                    </option>
                    <option value="">Tất cả</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
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
                      {/* <th scope="col">ID</th> */}
                      <th scope="col">Mã bạn đọc</th>
                      <th scope="col">Tên bạn đọc</th>
                      <th scope="col">Giới tính</th>
                      <th scope="col">Ngày sinh</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Hành động</th>
                    </tr>
                  </thead>
                  {show === false ? (
                    <tbody id="myTable">
                      {readerState?.content?.map((item, index) => (
                        <tr>
                          {/* <td>{item.id}</td> */}
                          <td>{item.userCode}</td>
                          <td>{item.userName}</td>
                          <td>{item.gender === "MALE" ? "Nam" : "Nữ"}</td>
                          {/* <td>{moment(item.birthDate).format("YYYY-MM-DD")}</td> */}
                          <td>
                            <ConvertToString item={item.birthDate} />
                          </td>
                          <td>
                            {/* {Number(
                              item.expireDate?.slice(0, 10).split("-").join("")
                            ) > nowDate ? (
                              <button
                                value="Active"
                                type="button"
                                className="btn btn-success btn-xs"
                                disabled
                              >
                                Active
                              </button>
                            ) : (
                              <button
                                value="Inactive"
                                type="button"
                                className="btn btn-danger btn-xs"
                                disabled
                              >
                                Inactive
                              </button>
                            )} */}
                            <StatusReader item={item?.status} />
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
                              data-toggle="modal"
                              data-target="#editModal"
                              variant="primary"
                              onClick={() => handleEdit(item)}
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
                              onClick={() => handleClickDelete(item?.id)}
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
                          {/* <td>{item.id}</td> */}
                          <td>{item.userCode}</td>
                          <td>{item.userName}</td>
                          <td>{item.gender === "MALE" ? "Nam" : "Nữ"}</td>
                          <td>{moment(item.birthDate).format("YYYY-MM-DD")}</td>
                          <td>
                            <ConvertToString item={item.birthDate} />
                          </td>
                          <td>
                            {/* {Number(
                              item.expireDate?.slice(0, 10).split("-").join("")
                            ) > nowDate ? (
                              <button
                                value="Active"
                                type="button"
                                className="btn btn-success btn-xs"
                                disabled
                              >
                                Active
                              </button>
                            ) : (
                              <button
                                value="Inactive"
                                type="button"
                                className="btn btn-danger btn-xs"
                                disabled
                              >
                                Inactive
                              </button>
                            )} */}
                            <StatusReader item={item?.status} />
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
                              data-toggle="modal"
                              data-target="#editModal"
                              variant="primary"
                              onClick={() => handleEdit(item)}
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
                              onClick={() => handleClickDelete(item?.id)}
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
