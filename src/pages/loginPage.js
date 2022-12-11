import React from "react";
import { Container } from "react-bootstrap";

export default function LoginPage() {
  return (
    <div>
      <h1 className="login-title">Library Manager</h1>
      <div className="login-form">
        <form className="was-validated">
          <div className="form-group">
            <label for="uname">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control"
              id="uname"
              placeholder="Enter username"
              name="uname"
              required
            />
            {/* <!-- <div className="valid-feedback">Valid.</div> --> */}
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>

          <div className="form-group">
            <label for="pwd">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              required
            />
            {/* <!-- <div className="valid-feedback">Valid.</div> --> */}
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>

          <button type="submit" classNameNameNameNameName="btn btn-primary">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
