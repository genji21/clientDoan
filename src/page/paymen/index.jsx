import React, { useEffect, useState,useLayoutEffect, useRef } from 'react';
import { useForm } from "react-hook-form";

import PropTypes from 'prop-types';
import queryString from "query-string";
import { useLocation, useHistory, Redirect } from "react-router";
import './style.scss'
import { FcAlarmClock } from "react-icons/fc";
import { Button, Col, Container, Form, FormFeedback, FormGroup, FormText, Input, Label, Row } from 'reactstrap';
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
     
        useEffect(() => {
          let timerId =   setInterval(()=>{
                    setValueTime((valueTime) =>{
                       if (valueTime === 1) {
                         setPopup(true);
                         clearInterval(timerId);
                       }
                        return valueTime - 1}
                        
                        );
                        
            },1000)
            return () => clearInterval(timerId)
            
      },[])   
    const handleSecondToMinute=()=>{
       return Math.floor(valueTime / 60) + ":" + Math.floor(valueTime % 60);
    }
    const PHONE_NO_REGEX = /^[0-9\- ]{8,14}$/
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Vui lòng nhập họ tên ")
        .test(
          "should have at least two word",
          "Please enter at least two word",
          (value) => {
            return value.split(" ").length >= 2 && value.split(" ")[1] !== "";
          }
        ),
      email: yup
        .string()
        .required("Vui lòng nhập email")
        .email("Please enter valid email"),
      phone: yup
        .string()
        .matches(PHONE_NO_REGEX, "Số Điện Thoại Không Đúng")
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
          status: "chưa thanh toán ",
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
            `apidoan-production-5fa1.up.railway.app/order/create_payment_url?${newFilter}`
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
          status:"chưa thanh toán "
        };
       paymentApi.createPayment({cart})
       toast.success("thông tin thanh toán đã gửi đên Email của bạn . Vui Lòng kiểm tra email")
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
                          {`Thời gian hoàn tất thanh toán ${handleSecondToMinute()}`}
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
                      {/* sao khách sạn  */}
                      <div className="paymentPage-hotel-star">
                        {Array.from({ length: rank }, (item, idx) => (
                          <FaStar key={idx} color="hsl(40, 100%, 61%)" />
                        ))}
                      </div>
                      {/* chekcin , checkout , số đêm */}
                      <div className="paymentPage-intro-checkinout">
                        <div className="paymentPage-check">
                          <span> Nhận Phòng </span>
                          <span> {startDate} </span>
                        </div>
                        <div className="paymentPage-check">
                          <span> Trả Phòng </span>
                          <span> {endDate} </span>
                        </div>
                        <div className="paymentPage-check">
                          <span> Số Đêm </span>
                          <span> {numDay} </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* form detail */}
                  <div className="paymentPage-form">
                    <Form onSubmit={form.handleSubmit(handlesubmit)}>
                      <div className="paymenPage-form-wrap">
                        <h5>Thông Tin Liên Hệ</h5>
                        <div className="paymenPage-form-top">
                          <FormGroup>
                            <Label htmlFor="name"> Họ Ten</Label>

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
                            <Label htmlFor="email"> Số điện thoại</Label>
                            <InputField
                              id="sdt"
                              form={form}
                              name="phone"
                              label="số điện thoại"
                            />
                          </FormGroup>
                        </div>
                      </div>
                      {/*  */}
                      <div className="paymentPage-methodPage">
                        <h5>Phương Thức Thanh Toán </h5>
                        <span>
                          Sau khi hoàn tất thanh toán, mã xác nhận phòng sẽ được
                          gửi ngay qua SMS và Email của bạn
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
                                <span>Chuyển Khoản Qua Ngân Hàng </span>
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
                            <Button>Thanh Toán</Button>
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
                        <img src={image[0]} alt="" />
                      </div>
                      <div className="paymentPage-name">
                        {numRoom}x Phòng {title}
                      </div>
                      <div className="paymentPage-numberPeople">
                        <BsFillPeopleFill />
                        {numPeople} Người
                      </div>
                      <div className="paymentPage-numberBed">
                        <FaBed />
                        {bed}
                      </div>
                      <div className="paymentPage-numberRoom">
                        <span>
                          Chúng tôi chỉ còn {stock} Phòng , đặt ngay đừng bỏ lỡ
                        </span>
                      </div>
                    </div>
                    {/*  */}
                    <div className="paymentPage-Detail-totalPayment">
                      <div className="paymentPage-price-wrap">
                        <div className="paymentPage-price">
                          <span>
                            {numRoom} Phòng {numDay} đêm
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
                                suffix="Đ"
                              />
                            </div>
                            <span className="paymentPage-percent-sub">10%</span>
                            <del className="paymentPage-price-before">
                              <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={price + price*10/100}
                                prefix=""
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true}
                                suffix="Đ"
                              />
                            </del>
                          </div>
                        </div>
                        {/* total */}
                        <div className="paymenPage-totalPrice">
                          <span className="paymenPage-Total-Price">
                            Tổng Tiền Thanh Toán
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
                              suffix="Đ"
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
      </main>
    );
}

export default PaymenPage;