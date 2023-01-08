import React, { useState, useEffect, useMemo } from "react";
import {
  Alert,
  Button,
  button,
  Container,
  Modal,
  Tooltip,
} from "react-bootstrap";
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
import HomePage from "./homePage";
import { logout } from "../redux/userSlice";
import { useRef } from "react";

export default function BookPage() {
  const [bookState, setbookState] = useState(null);
  const [search, setSearch] = useState(bookState);
  const [searchBookName, setSearchBookName] = useState("");
  const [show, setShow] = useState(false);
  const [filterBorrow, setfilterBorrow] = useState();
  const [showDel, setshowDel] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [categorySearch, setCategorySearch] = useState();

  const categorySearchRef = useRef(null);

  // console.log("bookState...", bookState);
  const bookList = useSelector((state) => state.bookReducer);

  const goToDetail = (id) => {
    navigate("/bookList/" + id);
  };
  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    getBookApi();
  }, []);
  const getBookApi = async () => {
    try {
      const res = await customAxios.get("/lbm/v1/book/info/get-all");
      dispatch(addListBook(res.data));
      setbookState(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };

  // const filterBook = async () => {
  //   // var myHeaders = new Headers();
  //   // myHeaders.append("Content-Type", "application/json");
  //   // var raw = JSON.stringify({
  //   //   auths: ["123afdsdf"],
  //   //   bookName: searchBookName,
  //   //   categorys: [],
  //   //   createDate: null,
  //   //   createUser: [],
  //   //   modifiedUser: [],
  //   //   modifyDate: null,
  //   //   price: null,
  //   //   publisher: [],
  //   // });
  //   // var requestOptions = {
  //   //   method: "POST",
  //   //   headers: myHeaders,
  //   //   body: raw,
  //   //   redirect: "follow",
  //   // };
  //   // fetch("http://172.31.99.192:9992/lbm/v1/book/info/search", requestOptions)
  //   //   .then((response) => {
  //   //     console.log("respon...", response);
  //   //   })
  //   //   .catch((error) => console.log("error", error));
  //   try {
  //     const data = {
  //       auths: ["123afdsdf"],
  //       bookName: "",
  //       categorys: [categorySearchRef?.current?.value],
  //       createDate: null,
  //       createUser: [],
  //       modifiedUser: [],
  //       modifyDate: null,
  //       price: null,
  //       publisher: [],
  //     };
  //     const res = await customAxios.post("/lbm/v1/book/info/search", data);
  //     console.log("res...", res);
  //     setBookData(res?.data?.content);
  //   } catch (error) {
  //     console.log("Lỗi");
  //   }
  // };

  // useEffect(() => {
  //   filterBook();
  // }, []);

  const handleEdit = (item) => {
    console.log("item...", item);
    navigate("/editBook/" + item?.id, {
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
      await customAxios.post(`/lbm/v1/book/info/delete?id=${id}`);
      getBookApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...bookState?.content];
    // console.log("search bookstate", bookState);
    searchList = searchList?.filter((item) => {
      return item.bookName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      // console.log("item", typeof item.bookName);
    });
    setSearch(searchList);
    setShow(true);
  };

  function getFilterList() {
    if (!filterBorrow) {
      return bookState?.content;
    }
    return bookState?.content.filter(
      (item) => item.category === filterBorrow
      // console.log("cate...", item)
    );
  }

  var filterList = useMemo(getFilterList, [filterBorrow, bookState?.content]);
  function handleChange(event) {
    setfilterBorrow(event.target.value);
    // console.log("test...", event);
  }

  // var filterList = useMemo(getFilterList, [filterBorrow, bookState?.content]);
  // async function handleChange(event) {
  //   // setfilterBorrow(event.target.value);
  //   try {
  //     const data = {
  //       auths: ["123afdsdf"],
  //       bookName: "",
  //       categorys: [categorySearchRef?.current?.value],
  //       createDate: null,
  //       createUser: [],
  //       modifiedUser: [],
  //       modifyDate: null,
  //       price: null,
  //       publisher: [],
  //     };
  //     const res = await customAxios.post("/lbm/v1/book/info/search", data);
  //     console.log("res...", res);
  //     setBookData(res?.data?.content);
  //   } catch (error) {
  //     console.log("Lỗi");
  //   }
  // }

  // console.log("test", bookState?.content);
  // console.log("testsearch..", search);
  // console.log("testfilter..", filterList);

  // const handleChangeSearchBookName = (e) => {
  //   console.log("e...", e.target.value);
  //   setSearchBookName(e.target.value);
  // };

  const navigate = useNavigate();
  return (
    <div>
      {show === true ? (
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
      ) : (
        <div>
          {filterList?.map((item, index) => (
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
                  className="nav-link"
                  type="button"
                  to="/readerList"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faAddressBook} /> Quản lý bạn đọc
                </Link>
                <Link
                  className="nav-link active"
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

            <div className="control-reader">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Thông tin sách</h4>

                <form className="form-inline w-100">
                  <input
                    type="text"
                    className="book-search form-control w-30 mb-2 mr-3"
                    placeholder="Tìm kiếm theo tên sách"
                    name="search"
                    id="search"
                    // value={search}
                    // value={searchBookName}
                    // onChange={handleChangeSearch}
                    onChange={handleChangeSearch}
                    // onChange={handleChangeSearchBookName}
                  />

                  <select
                    className="browser-default custom-select w-30 mb-2 mr-3"
                    onChange={handleChange}
                    // ref={categorySearchRef}
                  >
                    {/* <option selected disabled>
                      Thể loại
                    </option> */}
                    <option value="">Tất cả</option>
                    <option value="Kinh dị">Kinh dị</option>
                    <option value="Tình cảm">Tình cảm</option>
                    <option value="Giả tưởng">Giả tưởng</option>
                    <option value="Self-help">Self-help</option>
                    <option value="Tiểu sử">Tiểu sử</option>
                    <option value="Tâm lý">Tâm lý</option>
                    <option value="Văn học">Văn học</option>
                    <option value="Giáo trình">Giáo trình</option>
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
                      {/* <th scope="col">ID</th> */}
                      <th scope="col">Mã sách</th>
                      <th scope="col">Tên sách</th>
                      <th scope="col">Thể loại</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Tác giả</th>
                      <th scope="col">Hành động</th>
                    </tr>
                  </thead>
                  {show === true ? (
                    <tbody id="myTable">
                      {search?.map((item, index) => (
                        <tr>
                          {/* <td>{item.id}</td> */}
                          <td>{item.id}</td>
                          <td>{item.bookName}</td>
                          <td>{item.category}</td>
                          <td>{item.amount}</td>
                          <td>{item.auth}</td>

                          <td>
                            <button
                              onClick={() => goToDetail(item.id)}
                              type="button"
                              className="btn btn-primary btn-xs"
                              data-toggle="modal"
                              data-target="#moreModal"
                              variant="primary"
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
                              onClick={() => handleEdit(item.id, item)}
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
                  {show === false ? (
                    <tbody id="myTable">
                      {filterList?.map((item, index) => (
                        <tr>
                          {/* <th scope="row"></th> */}
                          {/* <td>{item.id}</td> */}
                          <td>{item.id}</td>
                          <td>{item.bookName}</td>
                          <td>{item.category}</td>
                          <td>{item.amount}</td>
                          <td>{item.auth}</td>

                          <td>
                            <button
                              onClick={() => goToDetail(item.id)}
                              type="button"
                              className="btn btn-primary btn-xs"
                              data-toggle="modal"
                              data-target="#moreModal"
                              variant="primary"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
