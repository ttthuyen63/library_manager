import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { API_KEY } from "../ultils/constant";
import axios from "axios";
import { login, logout } from "../redux/userSlice";
import HomePage from "./homePage";
import styles from "../css/Login.module.css";
import "bootstrap/dist/css/bootstrap.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.userReducer.token);
  const submit = async () => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      dispatch(login(res.data.idToken));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      {token !== null ? (
        navigate("/home")
      ) : (
        <div>
          <h1 className={styles.loginTitle}>Library Manager</h1>
          <div className={styles.loginForm}>
            <form className="was-validated">
              <div className="form-group">
                <label for="uname">Email </label>
                <input
                  type="email"
                  className="form-control"
                  id="uname"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {/* <!-- <div className="valid-feedback">Valid.</div> --> */}
                <div className="invalid-feedback">
                  Please fill out this field.
                </div>
              </div>

              <div className={styles.formGroup}>
                <label for="pwd">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Please fill out this field.
                </div>
              </div>

              <Button
                // type="submit"
                className="btn btn-primary"
                onClick={() => submit()}
              >
                Đăng nhập
              </Button>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
}
