import React, { useEffect, useState,useLayoutEffect, useRef } from 'react';
import { useForm } from "react-hook-form";

import PropTypes from 'prop-types';
import queryString from "query-string";
import { useLocation, useHistory, Redirect } from "react-router";
import './style.scss'
import { FcAlarmClock } from "react-icons/fc";
import { Button, Col, Container, Form, FormFeedback, FormGroup, FormText, Input, Label, Modal, Row } from 'reactstrap';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputField from '../../component/formControl/inputField';
import { Link } from 'react-router-dom';
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { Controller } from "react-hook-form";
import { BsFillPeopleFill } from "react-icons/bs";
import {FaBed} from "react-icons/fa";
import NumberFormat from "react-number-format";
import paymentApi from '../../api/paymentApi';

import axios from 'axios';
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

PaymenPage.propTypes = {
    
};

function PaymenPage(props) {
    const history= useHistory()
    const location = useLocation()
    const [valueTime,setValueTime] = useState(10)
    const valueSearch = useSelector((state)=>state.payment)
    const user = useSelector((state)=>state.user?.current?.user)
    const [Popup,setPopup] = useState(false)
    const [payment,setPayment] = useState("")
   
    const {
      avertage,
      _id,
      bed,
      endDate,
      startDate,
      userId,idCustomer,
      maxPeople,
      name,
      numDay,
      numPeople,
      numRoom,
      price,
      rank,
      stock,
      type,
      title,
      imageHotel,
      image,
    } = valueSearch;
     
      //   useEffect(() => {
      //     let timerId =   setInterval(()=>{
      //               setValueTime((valueTime) =>{
      //                  if (valueTime === 1) {
      //                    setPopup(true);
      //                    clearInterval(timerId);
      //                  }
      //                   return valueTime - 1}
                        
      //                   );
      //       },1000)
      //       return () => clearInterval(timerId)
            
      // },[])   
      useEffect(()=>{
        let timerId
        if(typeof valueTime ==="number"){
          timerId = setInterval(() => {
          setValueTime((valueTime) => {
            if ( valueTime === 1) {
            }
            return valueTime - 1;
          });
        }, 1000);
        }
        
         if (valueTime === 0) {
           setPopup(true);
           setValueTime('')
         }
         return () => clearInterval(timerId);
        
      },[valueTime])
    const handleSecondToMinute=()=>{
       return Math.floor(valueTime / 60) + ":" + Math.floor(valueTime % 60);
    }
    const PHONE_NO_REGEX = /^[0-9\- ]{8,14}$/
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Vui l??ng nh???p h??? t??n ")
        .test(
          "should have at least two word",
          "Please enter at least two word",
          (value) => {
            return value.split(" ").length >= 2 && value.split(" ")[1] !== "";
          }
        ),
      email: yup
        .string()
        .required("Vui l??ng nh???p email")
        .email("Please enter valid email"),
      phone: yup
        .string()
        .matches(PHONE_NO_REGEX, "S??? ??i???n Tho???i Kh??ng ????ng")
        .nullable(),
    });
     const form = useForm({
       defaultValues: {
         name: "",
         email:"",
         phone:"",
         method:""
       },
       resolver: yupResolver(schema),
     });
    const { register, control, getValues } = useForm();
    const handlesubmit =  (values) => {
      console.log(values.email)
      if(payment === "") {
        
        return toast.error("loi")
      }
      else if( payment === "vnpay") {
        const cart = {
          imageHotel,
          name,
          numPeople,
          startDate,
          endDate,
          numDay,
          numRoom,
          title,
          price,
          type:"VNPT",
          email: values.email,
          
          userId: user?._id || "visit",
          status: "ch??a thanh to??n ",
        };
        let newFilter = queryString.stringify({
          imageHotel,
          name,
          numPeople,
          startDate,
          endDate,
          numDay,
          numRoom,
          title,
          price,
          ownerId:userId,
          hotelid:_id,
          userId:user?._id || "visit"
        });
          localStorage.setItem('cart',newFilter)
        paymentApi.createPayment({ cart });
          window.open(
            `https://apidoan-production-5fa1.up.railway.app/order/create_payment_url?${newFilter}`
          );
         
        form.reset()
      }
      else {
        const cart = {
          imageHotel,
          name,
          numPeople,
          startDate,
          endDate,
          numDay,
          numRoom,
          title,
          price,
          email:values.email,
          type:"Chuyen khoan ngan hang",
          userId: user?._id ||  "visit",
          status:"ch??a thanh to??n "
        };
       paymentApi.createPayment({cart})
       toast.success("th??ng tin thanh to??n ???? g???i ????n Email c???a b???n . Vui L??ng ki???m tra email")
      }
    };
    // const handleClick = ()=>{
    //   window.open("/zing.vn","_blank")
    // }
    const handleChangeMethod = (e) =>{
      setPayment(e.target.value)
    }
   
    return (
      <main
        style={
          location.pathname === "/payment"
            ? { padding: "0" }
            : { padding: "50px" }
        }
      >
        <div className="paymentPage-wrap">
          <Container>
            <Row>
              <Col>
                <div className="paymentPage-left">
                  <div className="paymenPage-time">
                    <div className="paymentPage-time-content">
                      <div className="paymenPage-icon">
                        <FcAlarmClock />
                      </div>
                      <div className="paymenPage-time">
                        <span>
                          {`Th???i gian ho??n t???t thanh to??n ${handleSecondToMinute()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* intro hotel */}
                  <div className="paymentPage-hotel">
                    <div className="paymentPage-hotel-img">
                      <img src={imageHotel} alt="" />
                    </div>
                    {/*  */}
                    <div className="paymentPage-hotel-intro">
                      <h4>{name}</h4>
                      {/* sao kh??ch s???n  */}
                      <div className="paymentPage-hotel-star">
                        {Array.from({ length: rank }, (item, idx) => (
                          <FaStar key={idx} color="hsl(40, 100%, 61%)" />
                        ))}
                      </div>
                      {/* chekcin , checkout , s??? ????m */}
                      <div className="paymentPage-intro-checkinout">
                        <div className="paymentPage-check">
                          <span> Nh???n Ph??ng </span>
                          <span> {startDate} </span>
                        </div>
                        <div className="paymentPage-check">
                          <span> Tr??? Ph??ng </span>
                          <span> {endDate} </span>
                        </div>
                        <div className="paymentPage-check">
                          <span> S??? ????m </span>
                          <span> {numDay} </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* form detail */}
                  <div className="paymentPage-form">
                    <Form onSubmit={form.handleSubmit(handlesubmit)}>
                      <div className="paymenPage-form-wrap">
                        <h5>Th??ng Tin Li??n H???</h5>
                        <div className="paymenPage-form-top">
                          <FormGroup>
                            <Label htmlFor="name"> H??? Ten</Label>

                            <InputField
                              id="name"
                              form={form}
                              name="name"
                              label="name"
                            />
                          </FormGroup>
                        </div>
                        <div className="paymenPage-form-bot">
                          <FormGroup>
                            <Label htmlFor="email"> Email</Label>
                            <InputField
                              id="email"
                              form={form}
                              name="email"
                              label="email"
                            />
                          </FormGroup>
                          {/*  */}
                          <FormGroup>
                            <Label htmlFor="email"> S??? ??i???n tho???i</Label>
                            <InputField
                              id="sdt"
                              form={form}
                              name="phone"
                              label="s??? ??i???n tho???i"
                            />
                          </FormGroup>
                        </div>
                      </div>
                      {/*  */}
                      <div className="paymentPage-methodPage">
                        <h5>Ph????ng Th???c Thanh To??n </h5>
                        <span>
                          Sau khi ho??n t???t thanh to??n, m?? x??c nh???n ph??ng s??? ???????c
                          g???i ngay qua SMS v?? Email c???a b???n
                        </span>
                        <hr />
                        <FormGroup>
                          <div className="payment_method">
                            <Label htmlFor="vnpay">
                              <div className="payment-label">
                                <BsFillCreditCard2FrontFill />
                                <span>Thanh Toan Qua VNPAY </span>
                              </div>
                            </Label>
                            <Input
                              id="vnpay"
                              name="methodPayment"
                              type="radio"
                              value="vnpay"
                              onChange={(e) => {
                                setPayment(e.target.value);
                              }}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <div className="payment_method">
                            <Label htmlFor="online">
                              <div className="payment-label">
                                <BsFillCreditCard2FrontFill />
                                <span>Chuy???n Kho???n Qua Ng??n H??ng </span>
                              </div>
                            </Label>
                            <Input
                              id="online"
                              name="methodPayment"
                              type="radio"
                              value="online"
                              onChange={(e) => {
                                setPayment(e.target.value);
                              }}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <div className="button_subbmit">
                            <Button>Thanh To??n</Button>
                          </div>
                        </FormGroup>
                      </div>
                    </Form>
                  </div>
                  {/* payment method */}
                </div>
              </Col>
              <Col>
                <div className="paymentPage-right">
                  <div className="paymentPage-Detail-cart">
                    <div className="paymentPage-Hotel">
                      <div className="paymentPage-room-img">
                        {/* <img src={image[0]} alt="" /> */}
                      </div>
                      <div className="paymentPage-name">
                        {numRoom}x Ph??ng {title}
                      </div>
                      <div className="paymentPage-numberPeople">
                        <BsFillPeopleFill />
                        {numPeople} Ng?????i
                      </div>
                      <div className="paymentPage-numberBed">
                        <FaBed />
                        {bed}
                      </div>
                      <div className="paymentPage-numberRoom">
                        <span>
                          Ch??ng t??i ch??? c??n {stock} Ph??ng , ?????t ngay ?????ng b??? l???
                        </span>
                      </div>
                    </div>
                    {/*  */}
                    <div className="paymentPage-Detail-totalPayment">
                      <div className="paymentPage-price-wrap">
                        <div className="paymentPage-price">
                          <span>
                            {numRoom} Ph??ng {numDay} ????m
                          </span>
                          <div className="paymentPage-price-sub">
                            {/*  */}
                            <div className="paymentPage-price-old">
                              <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={price * numDay}
                                prefix=""
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true}
                                suffix="??"
                              />
                            </div>
                            <span className="paymentPage-percent-sub">10%</span>
                            <del className="paymentPage-price-before">
                              <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={price + (price * 10) / 100}
                                prefix=""
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true}
                                suffix="??"
                              />
                            </del>
                          </div>
                        </div>
                        {/* total */}
                        <div className="paymenPage-totalPrice">
                          <span className="paymenPage-Total-Price">
                            T???ng Ti???n Thanh To??n
                          </span>
                          <span className="paymenPage-TotalPrice-Number">
                            <NumberFormat
                              thousandsGroupStyle="thousand"
                              value={price * numDay}
                              prefix=""
                              decimalSeparator="."
                              displayType="text"
                              type="text"
                              thousandSeparator={true}
                              allowNegative={true}
                              suffix="??"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* popup end time */}
        <Modal centered isOpen={Popup}>
          <div className="popup_endtime" style={{"padding":"2rem 0"}} >
            <div
              className="popup_img"
              style={{ display: "flex", justifyItems: "center" }}
            >
              <img
                style={{ width: "50%", margin: "0 auto" }}
                src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_time_out.svg"
                alt=""
              />
            </div>
            {/* text */}
            <div className="popup-text" style={{ textAlign: "center" }}>
              <p className="popup-title">Th???i Gian Ho??n T???t Thanh To??n ???? H???t</p>
            </div>
            {/*  */}
            <div className="popup-button" style={{ textAlign: "center" ,display:"flex",justifyContent:"center"}}>
              <button onClick={()=>{
              history.goBack()
              }} className="button_one" style={{"marginRight":"1rem"}} >Ch???n Ph??ng Kh??c</button>
              <button onClick={()=>{
                setValueTime(10)
                setPopup(!Popup)
              }} className="button_two" >Ti???p T???c ?????t Ph??ng</button>
            </div>
          </div>
        </Modal>
      </main>
    );
}

export default PaymenPage;