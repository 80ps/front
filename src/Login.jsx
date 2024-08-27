import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from './redux/slices/authSlice';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      alert('입력값을 확인해하세요');
      return;
    }

    axios
      .post('http://localhost:8080/login', values)
      .then((res) => {
        if (res.status === 201) {
          navigate('/');
          const decode = jwtDecode(res.data.token);
          console.log(decode);
          dispatch(login({ authData: decode }));
          navigate('/');
        } else {
          // alert('로그인 실패, 다시 시도해 주세요.');
        }

        // console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Sign-In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter Your Email..."
            name="email"
            className="form-control"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter Your Password..."
            name="password"
            className="form-control"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn">
          Sign In
        </button>
        <p>Agree to our Terms and Policies</p>
        <Link to="/register">Create Account</Link>
      </form>
    </div>
  );
};

export default Login;
