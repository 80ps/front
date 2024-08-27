import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './redux/slices/authSlice';

const Home = () => {
  const authData = useSelector((state) => state.auth.authData);
  console.log(authData);
  const dispatch = useDispatch();
  const handledLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {authData ? (
        <div>
          <p>{authData.name}님 로그인</p>
          <button onClick={handledLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>로그인 해주세요</p>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
