import React , {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { Container,Col,Row } from 'reactstrap';
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaUserAlt, FaMoon, FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useLocation, useHistory } from "react-router-dom";
import axios from 'axios';
import hotelApi from '../../api/hotelsApi';
import ContainerLoading from '../../util/loading'
import queryString from 'query-string'
import moment from 'moment'
import dayjs from 'dayjs'
import { addFilter } from '../../slice/paymenSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

var utc = require("dayjs/plugin/utc");
var updateLocale = require("dayjs/plugin/updateLocale");
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(updateLocale)
dayjs.updateLocale("en", {
  weekdays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  months: [
    "Tháng 01",
    "Tháng 02",
    "Tháng 03",
    "Tháng 04",
    "Tháng 05",
    "Tháng 06",
    "Tháng 07",
    "Tháng 08",
    "Tháng 09",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
});
const reactStringReplace = require("react-string-replace");

HeaderBooking.propTypes = {
    
};

function HeaderBooking(props) {
   const { pathname } = useLocation();
    const refResult = useRef(null)
   const dispatch = useDispatch();
    const [openNav,setOpenNav] = useState(false)
    const valueSearch = useSelector((state)=>{return state.payment})
    const [value, setValueSearch] = useState(valueSearch.value);
    const history = useHistory();
    const [loading,setLoading] = useState(false)
    const startRef = useRef(null)
    const location = useLocation()
    const [filter, setFilter] = useState({
      numRoom: 1,
      numPeople: Number(queryString.parse(location.search).numPeople) || 1,
      id: undefined,
      location: undefined,
      startDate:
        location.search !== ""
          ? dayjs(queryString.parse(location.search).startDate, "DD-MM-YY").$d
          : new Date(),
      endDate:
        location.search !== ""
          ? dayjs(queryString.parse(location.search).endDate, "DD-MM-YY").$d
          : new Date().setUTCDate(new Date().getUTCDate() + 1),
      value: [],
      numDay: queryString.parse(location.search).numDay || 1,
    });
    const typingTimeoutRef = useRef(null)
    const handleClick = (e) =>{
        console.log(e.target)
        setOpenNav(!openNav)
    }
    const handeCLick2=(e)=>{
 e.stopPropagation();
 e.preventDefault();
    }
    const handeClickAdd  = () =>{
      if(filter.numRoom === filter.numPeople){
            setFilter((prevfilter) => {
              return {
                ...prevfilter,
                numPeople: prevfilter.numPeople + 1,
              };
            });

      }
      setFilter(prevFilter => {return { ...prevFilter, numRoom: prevFilter.numRoom + 1 }})
    }
    const handleSubmit = (e) =>{
      e.preventDefault();
      
    
      if(value){
 const newFilter = {
   ...filter,
   startDate: dayjs(filter.startDate).format(`DD-MM-YY `),
   endDate: dayjs(filter.endDate).format(`DD-MM-YY `),
   value
 };
      dispatch(addFilter(newFilter));

       if (filter.location !== undefined && filter.id !== undefined) {
         return history.push({
           pathname: `/hotel/${filter.location}/${filter.id}`,
           search: queryString.stringify(newFilter),
         });
       }
      }
      return toast.error("Bạn chưa nhập nơi cần đến")
    }
    const handleChangeValueSearch =  (e) =>{
        refResult.current.style.display = "block";
     setValueSearch(e.target.value)
    }
    // 
    useEffect(() => {
      const newFilter = {
        ...filter,
        ...valueSearch,
        startDate: dayjs(filter.startDate).format(`DD-MM-YY`),
        endDate: dayjs(filter.endDate).format(`DD-MM-YY`),
      };
      dispatch(addFilter({ ...newFilter }));
       
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(async () => {
        const getDate = async () => {
          setLoading(true);
          const data = await hotelApi.searchotel(value);
          setFilter({ ...filter, value: data.data });
          setLoading(false);
        };
        getDate();
        return () => {
          clearTimeout(typingTimeoutRef.current);
        };
      }, 500);
    }, [value]);
  // 

  
    const handleName = (data) =>{
      const dataResult = data.toLowerCase();
      const valueResult = value.toLowerCase();
      if(dataResult.includes(valueResult)) {
       const result2 = dataResult.replace(valueResult, `<b class="spacer">${valueResult}</b>`);
       return result2
      }
    }
    const handleSelectSearch = (data) =>{
      refResult.current.style.display ="none"
      setValueSearch(data.name)
      setFilter({...filter,location:data.location,id:data._id})
    }
  
     return (
       <header>
         <div
           style={{ display: pathname === "/payment" ? "none" : "block" }}
           className="booking_header"
         >
           <video autoPlay loop muted style={{ width: "100%" }}>
             <source
               src="https://storage.googleapis.com/public-tripi/food/web-food/video_bg_mytour_gs.mov"
               type="video/mp4"
             ></source>
           </video>
           <div className="booking_header-wrap">
             <div className="booking_header-service">
               <Container fluid>
                 <div className="booking_header-list">
                   <div className="booking_header-item">
                     <div className="booking-header-logo">
                       <img
                         //  src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour_white.svg"
                         alt=""
                       />
                     </div>
                   </div>
                   <div className="booking_header-item">
                     <ul className="booking_header-listService">
                       <li className="booking_header-service">
                         <Link to="/hotel">Khách Sạn</Link>
                       </li>
                       <li className="booking_header-service">
                         <Link to="/hotel">Vé Máy Bay</Link>
                       </li>
                       <li className="booking_header-service">
                         <Link to="/hotel">Tour Sự Kiện</Link>
                       </li>
                       <li className="booking_header-service">
                         <Link to="/hotel">THe Memories</Link>
                       </li>
                     </ul>
                   </div>
                   <div className="booking_header-item">
                     <ul className="booking_header-contact">
                       <li className="booking_header-contact-item">
                         <FaPhoneAlt />
                         <Link to="/#">Hợp Tác Với Chúng Tôi</Link>
                       </li>
                       <li className="booking_header-contact-item">
                         <IoIosNotifications />
                       </li>
                       <li className="booking_header-contact-item">
                         <Link to="/user/auth">
                           <div className="booking_header-avatar">
                             <FaUserAlt></FaUserAlt>
                           </div>
                         </Link>
                       </li>
                       <li className="booking_header-contact-item">
                         <div className="booking_header-menu">
                           <FiMenu />
                         </div>
                       </li>
                       <li className="booking_header-contact-item"></li>
                     </ul>
                   </div>
                 </div>
                 {/* form */}
                 <div className="booking_header-form">
                   <form onSubmit={handleSubmit}>
                     <div className="booking_header-user_form">
                       <div className="booking_header-search">
                         <label htmlFor="search">Địa điểm</label>
                         <input
                           ref={typingTimeoutRef}
                           type="text"
                           name="search"
                           value={value}
                           placeholder="Khách Sạn "
                           id="search"
                           onChange={handleChangeValueSearch}
                         />
                         {/* result search */}
                         <div
                           ref={refResult}
                           style={{ display: "none" }}
                           className="booking_header-search-result"
                         >
                           <div className="booking_header-search-resulit-list">
                             {/* item result */}
                             {loading ? (
                               <ContainerLoading />
                             ) : (
                               filter.value.map((item, idx) => {
                                 return (
                                   <>
                                     <div
                                       key={idx + 99}
                                       onClick={(e) => {
                                         e.stopPropagation();
                                         handleSelectSearch(item);
                                       }}
                                       className="booking_header-search-item"
                                     >
                                       <div className="booking_header-item-img">
                                         <img src={item.image[0]} alt="" />
                                       </div>

                                       <div className="booking_header-item-content">
                                         <span
                                           dangerouslySetInnerHTML={{
                                             __html: handleName(item.name),
                                           }}
                                         ></span>
                                       </div>
                                     </div>
                                   </>
                                 );
                               })
                             )}
                           </div>
                         </div>
                       </div>
                       <div className="booking_header-datePicker">
                         <div className="booking_header-startDay">
                           <label htmlFor="startDay">Ngày Đến</label>
                           <DatePicker
                             className="text-special"
                             ref={startRef}
                             id="startDay"
                             minDate={new Date()}
                             showDisabledMonthNavigation
                             value={dayjs(filter.startDate).format(
                               `dddd, DD MMMM `
                             )}
                             selected={filter.startDate}
                             onChange={(date) => {
                               setFilter((prevFilter) => {
                                 return {
                                   ...prevFilter,
                                   startDate: date,
                                 };
                               });
                             }}
                           />
                         </div>
                         <div className="booking_header-day">
                           <span> {filter.numDay} </span>
                           <FaMoon />
                         </div>
                         <div className="booking_header-endDay">
                           <label htmlFor="endDay">Ngày Về</label>
                           <DatePicker
                             dateFormat="yyyy/MM/dd"
                             className="text-special"
                             minDate={dayjs().add(1, "day")}
                             id="endDay"
                             value={dayjs(filter.endDate).format(
                               `dddd, DD MMMM `
                             )}
                             selected={filter.endDate}
                             onChange={async (date) => {
                               setFilter((prevFilter) => {
                                 let resultNumDay = dayjs(date).diff(
                                   dayjs(prevFilter.startDate).format(
                                     "YYYY-MM-DD"
                                   ),
                                   "day"
                                 );
                                 return {
                                   ...prevFilter,
                                   endDate: date,
                                   numDay: resultNumDay,
                                 };
                               });
                             }}
                           />
                         </div>
                       </div>
                       {/* number people */}
                       <div
                         onClick={handleClick}
                         className="booking_headear-numPeople"
                       >
                         <div className="booking_header-text">
                           <span>Số Phòng , Số Khách</span>
                         </div>
                         <div className="booking_header-result text-special">
                           {filter.numRoom}phòng ,{filter.numPeople} người
                         </div>
                         {/* ressult num people */}
                         <div
                           style={{ display: openNav ? "flex" : "none" }}
                           onClick={handeCLick2}
                           className="booking_header-resultPeople"
                         >
                           <div className="booking_header-room">
                             <span> Phòng </span>
                             <div className="booking_header-quanity">
                               <div
                                 style={{
                                   pointerEvents:
                                     filter.numRoom === 1 ? "none" : "",
                                 }}
                                 onClick={() => {
                                   setFilter((prevFil) => {
                                     return {
                                       ...filter,
                                       numRoom: prevFil.numRoom - 1,
                                     };
                                   });
                                 }}
                                 className="quanity_sub"
                               >
                                 -
                               </div>
                               <div className="quanity_result">
                                 {filter.numRoom}
                               </div>
                               <div
                                 onClick={handeClickAdd}
                                 className="quanity_add"
                               >
                                 +
                               </div>
                             </div>
                           </div>
                           <div className="booking_header-adult">
                             <span> Người Lớn </span>
                             <div className="booking_header-quanity">
                               <div
                                 style={{
                                   pointerEvents:
                                     filter.numPeople === 1 ? "none" : "",
                                 }}
                                 onClick={() => {
                                   setFilter((prevFilter) => {
                                     return {
                                       ...filter,
                                       numPeople: prevFilter.numPeople - 1,
                                     };
                                   });
                                 }}
                                 className="quanity_sub"
                               >
                                 -
                               </div>
                               <div className="quanity_result">
                                 {filter.numPeople}
                               </div>
                               <div
                                 onClick={() => {
                                   setFilter((prevFilter) => {
                                     return {
                                       ...prevFilter,
                                       numPeople: prevFilter.numPeople + 1,
                                     };
                                   });
                                 }}
                                 className="quanity_add"
                               >
                                 +
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       {/* button */}
                       <div className="booking_header-button">
                         <button>
                           <FaSearch />
                         </button>
                       </div>
                     </div>
                   </form>
                 </div>
               </Container>
             </div>
           </div>
         </div>
         {/* payment */}
         <div
           className="booking_header-payment"
           style={{ display: pathname === "/payment" ? "block" : "none" }}
         >
           <div className="booking_header-payment-wrap">
             {/*  */}
             <div className="booking_header-payment-logo">
               <Link to="/">
                 <img
                   style={{ width: "120px", height: "32px" }}
                   src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour.svg"
                   alt=""
                 />
               </Link>
             </div>
             {/*  */}
           </div>
         </div>
       </header>
     );
}

export default HeaderBooking;