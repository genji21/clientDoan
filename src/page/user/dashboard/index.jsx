import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import {Button, Container} from 'reactstrap'
import './style.scss'
import { Link, NavLink } from "react-router-dom";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { useCallback, useEffect } from "react";
import FormUser from './FormUser'
import OrderUser from './OrderUser';
import notFound from '../../../util/notFound';
import userApi from '../../../api/userApi';
import { toast } from "react-toastify";
import NewHotel from "./NewHotel";

UserDashboard.propTypes = {
    
};

function UserDashboard(props) {
     const user = useSelector((state) => state.user.current.user);

   useEffect(() => {
     
   }, []);
     const token = localStorage.getItem("accessToken");

   const handleSubmitUpdate = async (values) =>{
     console.log(values);
    try {
      await userApi.updateInfor(values,token)
      toast.success("Cật Nhật Thành Công")
    } catch (error) {
      
    }
  }
  const handleSubmitChangePass= async(values) =>{
    // try {
    // await userApi.resetPassword(values,token)      
    // toast.success("Thay Đổi Mật Khẩu Thành Công ")
    // } catch (error) {
      
    // }
  }
  const handleName = (values) =>{
    return "Abc"
  }
    return (
      <div id="dashboard-user">
        <div className="dashboard_main">
          <header>
            <Container fluid="xl">
              <div className="dashboard-intro">
                <div className="dashboard-breadcump">
                  <Link to="/">Trang Chủ</Link>
                  <span> {">"} Tài khoản</span>
                </div>
                <span className="dashboard-account">Tài khoản</span>
              </div>
            </Container>
          </header>
          {/*  */}
          <section className="dashboard_user">
            <Container>
              <div className="dashboard_user-wrap">
                {/* navbar */}
                <ul className="dashboard_user-menu">
                  <li>
                    <NavLink to="/user/dashboard">
                      <span>Quản Lí Tài Khoản</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/user/order">
                      <span> Đơn Hàng Của Tôi </span>
                    </NavLink>
                  </li>
                  <li>
                    {/* <NavLink to="/user/createHotel">
                      <span> Bạn Muốn Tạo Chổ Nghĩ Riêng Mình</span>
                    </NavLink> */}
                  </li>
                </ul>
                {/*  */}
                <Switch>
                  <Route exact path="/user/dashboard">
                    <div className="dashboard_user-info">
                      <FormUser
                        onSubmitChangePass={handleSubmitChangePass}
                        onHandleName={handleName}
                        token={token}
                        onSubmit={handleSubmitUpdate}
                      />
                    </div>
                  </Route>
                  <Route exact path="/user/order">
                    <OrderUser user={user} token={token} />
                  </Route>
                  {/*  */}
                  {/* <Route exact path="/user/createHotel">
                    <NewHotel />
                  </Route> */}
                  <Redirect to="/error" />
                </Switch>
                {/*  */}
              </div>
            </Container>
          </section>
          {/* footer */}
          <footer></footer>
        </div>
      </div>
    );
    
}

export default UserDashboard;