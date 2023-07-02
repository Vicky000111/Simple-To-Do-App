import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "./services";

const Register = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    fullName: "",
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
      const response = await post("users/register", userDetails);
      if (response.data) {
        navigate("/login");
        setLoginAlert("");
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
        <span>Register</span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Login
        </button>
      </div>
      <form className="row g-3">
        {loginAlert && (
          <div className="alert alert-danger col-md-12" role="alert">
            {loginAlert}
          </div>
        )}
        <div className="col-md-12">
          <label className="visually-hidden" htmlFor="autoSizingInputGroup">
            Username
          </label>
          <div className="input-group">
            <div className="input-group-text">@</div>
            <input
              type="text"
              className="form-control"
              id="autoSizingInputGroup"
              placeholder="Username"
              value={userDetails?.userName}
              name="userName"
              onChange={(e) => changeUserDetails(e)}
            />
          </div>
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail5" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail5"
            placeholder="Full Name"
            name="fullName"
            value={userDetails?.fullName}
            onChange={(e) => changeUserDetails(e)}
          />
        </div>
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

export default Register;
