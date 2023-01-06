import React from "react";
import { Container, Form } from "react-bootstrap";
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
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { customAxios } from "../config/api";
import { addListReader } from "../redux/readerSlice";

export default function EditReaderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ...stateLocation } = useLocation();
  const itemDetail = stateLocation?.state;
  console.log("itemDetail...", itemDetail);
  const [readerState, setreaderState] = useState(null);
  const [nameReader, setnameReader] = useState(itemDetail?.nameReader);
  const [codeReader, setcodeReader] = useState(itemDetail?.codeReader);
  const [genderReader, setgenderReader] = useState(itemDetail?.genderReader);
  const [birthReader, setbirthReader] = useState(itemDetail?.birthReader);
  const [phoneReader, setphoneReader] = useState(itemDetail?.phoneReader);
  const [addressReader, setaddressReader] = useState(itemDetail?.addressReader);
  const [dateAddReader, setdateAddReader] = useState(itemDetail?.dateAddReader);
  const [dateEndReader, setdateEndReader] = useState(itemDetail?.dateEndReader);
  // const [statusReader, setstatusReader] = useState(itemDetail?.statusReader);

  const queryParams = new URLSearchParams(window.location.search);
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
  // const [editBook, seteditBook] = useState(bookState);
  const handleSubmit = async (e) => {
    e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
    const newData = {
      ...itemDetail,
      nameReader: nameReader,
      codeReader: codeReader,
      genderReader: genderReader,
      birthReader: birthReader,
      phoneReader: Number(phoneReader),
      addressReader: addressReader,
      dateAddReader: dateAddReader,
      dateEndReader: dateEndReader,
      // statusReader: statusReader,
    };
    const response = await customAxios.put(`/readerList/${readId}`, newData);
    // seteditBook(response.data);
    navigate("/readerList");
    console.log("testdata", response.data);
  };

  const handleCancel = (e) => {
    navigate("/readerList");
  };

  const params = useParams();
  const readId = params.readId;
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
              <h6 className="content-account">Admin</h6>
            </div>

            <div className="control-addReader container">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Chỉnh sửa bạn đọc</h4>
                <Form>
                  <div className="row">
                    <div className="form-horizontal col-sm-5">
                      <div className="form-group">
                        <label className="control-label">Họ và tên:</label>
                        <input
                          value={nameReader}
                          type="text"
                          className="form-control"
                          placeholder="Enter name"
                          onChange={(e) => setnameReader(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label for="">Giới tính</label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          value={genderReader}
                          onChange={(e) => setgenderReader(e.target.value)}
                        >
                          <option selected disabled>
                            Choose gender
                          </option>
                          <option value="male">Nam</option>
                          <option value="fermale">Nữ</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label for="">Ngày sinh:</label>
                        <input
                          value={birthReader}
                          type="date"
                          className="form-control"
                          placeholder="dd-mm-yy"
                          onChange={(e) => setbirthReader(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label for="email">Địa chỉ:</label>
                        <input
                          value={addressReader}
                          type="text"
                          className="form-control"
                          placeholder="Enter address"
                          onChange={(e) => setaddressReader(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label for="email">Số điện thoại:</label>
                        <input
                          value={phoneReader}
                          type="tel"
                          className="form-control"
                          placeholder="Enter telephone number"
                          onChange={(e) => setphoneReader(e.target.value)}
                        />
                      </div>

                      {/* <div className="form-group">
                        <label for="">Trạng thái bạn đọc:</label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          value={statusReader}
                          onChange={(e) => setstatusReader(e.target.value)}
                        >
                          <option selected disabled>
                            Status reader
                          </option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div> */}
                    </div>

                    <div className="form-horizontal col-sm-5">
                      <div className="form-group">
                        <label className="control-label" for="pwd">
                          Mã bạn đọc:
                        </label>
                        <input
                          value={codeReader}
                          type="text"
                          className="form-control"
                          placeholder="Enter code reader"
                          onChange={(e) => setcodeReader(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="control-label" for="email">
                          Ngày tạo:
                        </label>
                        <input
                          value={dateAddReader}
                          type="date"
                          className="form-control"
                          placeholder="dd-mm-yy"
                          onChange={(e) => setdateAddReader(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="control-label" for="email">
                          Ngày hết hạn:
                        </label>
                        <input
                          value={dateEndReader}
                          type="date"
                          className="form-control"
                          placeholder="dd-mm-yy"
                          onChange={(e) => setdateEndReader(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleSubmit}
                          >
                            <FontAwesomeIcon icon={faSave} /> Lưu
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleCancel}
                          >
                            &times; Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
