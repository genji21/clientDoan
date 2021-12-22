import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Redirect,useRouteMatch ,useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getinforUser } from "../../slice/userSlice";
import HeaderBooking from "../../component/header";

const PrivateRoute = ({ component: Component,path, waitingForAuth: Waiting, }) => {
    const dispatch = useDispatch()
    const isLog = useSelector((state) => state.user.isLog);
    useEffect(() => {
      console.log(isLog);
    }, [isLog]);
  return (
    <Route  path={path}
      render={
        (props) =>{
         return (
           <>
             {isLog ? <Component {...props} /> : <Redirect to="/user/auth" />}
           </>
         );
        }
      }
    />
  );
};
export default PrivateRoute;
