import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import RegisterForm from './auth/registerForm';
import './style.scss'
import { toast } from 'react-toastify';
import LoginForm from './auth/loginForm';
import { getinforUser, login, register } from '../../slice/userSlice';
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Redirect, useHistory } from 'react-router';
import { useSelector } from "react-redux";
import ContainerLoading from "../../util/loading";
AuthPage.propTypes = {
    
};
 
function AuthPage(props) {
  const dispath = useDispatch();
  const history = useHistory();
  const loading = useSelector(state=>state.user.loading)
  const isLog = useSelector(state=>state.user.isLog)
  const handleSubmit = async (values) => {
    try {
      const action = register(values);
      const resultAction = await dispath(action);
      const data = unwrapResult(resultAction);
      toast.success(
        "Đăng Kí Thành Công , Vui Lòng Kiểm Tra Email Để Kích Hoạt Tài Khoản "
      );
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };
  const handleSubmitLogin = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispath(action);
      const data = unwrapResult(resultAction);
      toast.success("Đăng Nhập Thành Công");
      history.push({ pathname: "/" });
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };
  useEffect(() => {
    if (isLog) {
      console.log(isLog);
      history.push({pathname:"/user/dashboard"})
    }
  }, [isLog]);
    return (
      <>
        <main id="user_page">
          {loading ? <ContainerLoading/> : " "}

          <section className="user">
            <div className="user-image">
              <div className="user_detail">
                <span className="user_title">explore</span>
                <h1 className="user_breadcump">My-Account</h1>
              </div>
            </div>
          </section>
          <Container fluid>
            <Row xs="1" lg="2">
              <Col>
                <h1>Login</h1>
                <LoginForm
                  // loading={loading}
                  onSubmit={handleSubmitLogin}
                ></LoginForm>
              </Col>

              <Col>
                <h1>Register </h1>
                <RegisterForm onSubmit={handleSubmit}></RegisterForm>
              </Col>
            </Row>
          </Container>
        </main>
      </>
    );
}

export default AuthPage;