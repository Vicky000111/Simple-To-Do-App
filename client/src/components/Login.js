import React, { useState } from "react";
import { post } from "./services";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [loginAlert, setLoginAlert] = useState("");
  const changeUserDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitForm = async () => {
    try {
      const response = await post("users/login", userDetails);
      if (response.data) {
        setLoginAlert("");
        const user = localStorage.setItem(
          "user",
          JSON.stringify(response?.data)
        );
        navigate("/home");
      } else {
        setLoginAlert(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container center-box">
      <div className="login-text">
        <span>Login</span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
      <form className="row g-3 w-100">
        {loginAlert && (
          <div className="alert alert-danger col-md-12" role="alert">
            {loginAlert}
          </div>
        )}
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="email"
            name="email"
            value={userDetails?.email}
            onChange={(e) => changeUserDetails(e)}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder="password"
            name="password"
            value={userDetails?.password}
            onChange={(e) => changeUserDetails(e)}
          />
        </div>

        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={() => submitForm()}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
