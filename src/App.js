import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';
import HeaderBooking from './component/header';
import { Route, Switch ,Redirect, HashRouter  as Router } from "react-router-dom";
import HomePage from './page/homePage';
import HotelPage from './page/HotelPage';
import AuthPage from './page/user';
  import 'react-toastify/dist/ReactToastify.css';
import { Provider, useSelector } from "react-redux";
import store from "./app/store";
import { ToastContainer } from 'react-toastify';
import DetailHotelPage from './page/detailHotel';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import PaymenPage from './page/paymen';
import { addUser, getinforUser } from './slice/userSlice';
import { useDispatch } from "react-redux";
import PrivateRoute from "./util/privateRoute";
import UserDashboard from './page/user/dashboard';
import { useCallback, useEffect } from 'react';
import notFound from './util/notFound';

function App() {
  const dispath = useDispatch();

   useEffect(()=>{
    const getInfor = async () =>{
      const token = localStorage.getItem('accessToken')
    
   const action = getinforUser(token)
   const resultAction = await dispath(action)
    }
  getInfor()

   },[])
  
  

  return (
    
       <Router>
      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
/>
    <div className="App">
      <Switch>
        {/* Homepage */}
        <Route exact path="/">

        <HeaderBooking/>
        <HomePage/>
        </Route>

        {/* hotel */}
        <Route exact path="/hotel/:location" >
        <HeaderBooking/>
        <HotelPage/>
        
        </Route>
        {/* DetailHotel */}
        <Route exact path= "/hotel/:location/:idHotel" >
          <HeaderBooking/>
          <DetailHotelPage/>
        </Route>
        {/* AuthPage */}
        <Route exact path="/user/auth" >
          <HeaderBooking/>
          <AuthPage/>
        </Route>
        {/* PaymentPage */}
        <Route exact path ="/payment" component={PaymenPage}>
        <PaymenPage/>
        </Route>
        <PrivateRoute  path ="/user" component={UserDashboard} >

        </PrivateRoute>
           <Route exact path="/error" component={notFound} />
           <Route path="*" component={notFound} />
      </Switch>
    </div>
    </Router> 
   
  );
}


export default App;
