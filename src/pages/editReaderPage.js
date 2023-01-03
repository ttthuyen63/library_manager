import React from "react";
import { Container } from "react-bootstrap";
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
import { Link } from "react-router-dom";

export default function EditReaderPage() {
  return (
    <div>
      <div className="row">
        <div className="col-sm-3" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">Library Manager</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link className="nav-link " type="button" to="/home">
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

        <div className="col-sm-9" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <h6 className="content-account">Admin</h6>
            </div>

            <div className="control-addReader container">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4 className="ml-0 mt-0">Chỉnh sửa bạn đọc</h4>
                <div className="row">
                  <div className="form-horizontal col-sm-5">
                    <div className="form-group">
                      <label className="control-label">Họ và tên:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Giới tính</label>
                      <select className="browser-default custom-select mb-2 mr-3">
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
                        type="date"
                        className="form-control"
                        placeholder="dd-mm-yy"
                      />
                    </div>

                    <div className="form-group">
                      <label for="email">Địa chỉ:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter address"
                      />
                    </div>
                    <div className="form-group">
                      <label for="email">Số điện thoại:</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter telephone number"
                      />
                    </div>

                    <div className="form-group">
                      <label for="">Trạng thái bạn đọc:</label>
                      <select className="browser-default custom-select mb-2 mr-3">
                        <option selected disabled>
                          Status reader
                        </option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-10">
                        <button type="button" className="btn btn-success">
                          <FontAwesomeIcon icon={faSave} /> Lưu
                        </button>
                        <button type="button" className="btn btn-danger">
                          &times; Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-horizontal col-sm-5">
                    <div className="avatar-wrapper">
                      <img className="profile-pic" src="" />
                      <div className="upload-button">
                        <i
                          className="fa fa-arrow-circle-up"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <input
                        className="file-upload"
                        type="file"
                        accept="image/*"
                      />
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="pwd">
                        Mã bạn đọc:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter code reader"
                      />
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="email">
                        Ngày tạo:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="dd-mm-yy"
                      />
                    </div>

                    <div className="form-group">
                      <label className="control-label" for="email">
                        Ngày hết hạn:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="dd-mm-yy"
                      />
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
