import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import hotelApi from "../../api/hotelsApi";
import { useParams } from 'react-router';
import ContainerLoading from '../../util/loading'
import './style.scss'
import { FaStar } from 'react-icons/fa';
import { GrGallery } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import { BiBed } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addFilter, addRoom } from '../../slice/paymenSlice';
import {
  BsFillImageFill,
  BsTextareaResize,
  BsFillPeopleFill,
} from "react-icons/bs";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Slider from "react-slick";
import { FcFlashOn } from "react-icons/fc";
import { Link } from 'react-router-dom';
import queryString from "query-string";
import { useLocation, useHistory } from "react-router";
import { useSelector } from "react-redux";
import HotelPage from '../HotelPage';

DetailHotelPage.propTypes = {
    
};

function DetailHotelPage(props) {
   const dispatch = useDispatch();
    const {location,idHotel} = useParams();
    const [hotel,setHotel] = useState({})
    const [loading,setLoading] = useState(true)
    const [modalImage,setModalImage] = useState(false)
    const [modalService,setModalService] =useState(false)
    const locationF = useLocation();
    const valueSearch = useSelector((state) => {
      return state.payment;
    });
    const history = useHistory();

    useEffect(() => {
      console.log(queryString.parse(locationF.search));
      setLoading(true);
      const getData = async () => {
        const data = await hotelApi.getidHotel(idHotel);
        setHotel(data.data);
        // const { rooms } = hotel;
        setLoading(false);
      };
      getData();
    }, [idHotel, locationF.search]);

    const showRoomDetail =()=>{
      const filter = queryString.parse(locationF.search)
      const numPeople = filter.numPeople  || 1
      const numRoom = filter.numRoom || 1 
      const filterRoom = hotel.rooms.filter((item)=>{
       return item.maxPeople >= numPeople && item.stock > numRoom
      })
      if(filterRoom.length === 0 ) {
        return <h1>Không tìm thấy kết quả phù hợp với tìm kiếm </h1>
      }
      else {
      return  filterRoom.map((item,idx)=>{
         return (
           <div
           key={idx}
             className="hotelDetail-rooms-item"
             style={{
               marginBottom: "2rem",
               border: "1px solid grey",
             }}
           >
             {/*  */}
             <div className="hotelDetail-rooms-item-itemDetail">
               <div className="hotelDetail-rooms-item-image">
                 <img src={item.image[0]} alt="" />
               </div>
               <div className="hotelDetail-rooms-item-image-bot">
                 <div className="hotelDetail-rooms-item-image-bot-box">
                   <div className="hotelDetail-img-bot">
                     <img src={item.image[0]} alt="" />
                   </div>
                   <div className="hotelDetail-img-bot">
                     <img src={item.image[1]} alt="" />
                   </div>
                   <div className="hotelDetail-img-bot">
                     <img src={item.image[2]} alt="" />
                   </div>
                 </div>
               </div>
             </div>
             {/*  */}
             <div className="hotelDetail-rooms-item-itemDetail">
               <div className="hotelDetail-rooms-des">
                 <h5>{item.title}</h5>
                 <div className="hotelDetail-rooms-avertage">
                   <BsTextareaResize />
                   <span> {item.avertage} </span>
                 </div>
                 <div className="hotelDetail-rooms-service">
                   <div className="hotelDetail-rooms-service-item">
                     <img
                       src="https://storage.googleapis.com/tripi-assets/images/hotels/amenities/nhahanganuong/bua-sang-tru-toi.png"
                       alt=""
                     />
                     <span>Ăn Sáng Miễn Phí</span>
                   </div>
                   {/*  */}
                   <div className="hotelDetail-rooms-service-item">
                     <img
                       src="https://storage.googleapis.com/tripi-assets/images/hotels/amenities/nhahanganuong/bua-sang-tru-toi.png"
                       alt=""
                     />
                     <span>Wifi Miễn Phí</span>
                   </div>
                 </div>
               </div>
             </div>
             <div className="hotelDetail-rooms-item-itemDetail">
               <div
                 className="hotelDetail-room-people"
                 style={{
                   display: "flex",
                   flexDirection: "column",
                   alignItems: "start",
                 }}
               >
                 <BsFillPeopleFill />
                 <span> x {item.maxPeople} </span>
               </div>
             </div>
             <div className="hotelDetail-rooms-item-itemDetail">
               <div
                 className="hotelDetail-room-people"
                 style={{
                   display: "flex",
                   flexDirection: "column",
                   alignItems: "start",
                 }}
               >
                 <BiBed />
                 <span> {item.bed} </span>
               </div>
             </div>
             {/*  */}
             <div className="hotelDetail-rooms-item-tiemDetail">
               <div
                 className="hotelDetail-price"
                 style={{
                   display: "flex",
                   flexDirection: "column",
                 }}
               >
                 <span> {item.price} / dem </span>
                 <div className="hotelDetail-button-choose">
                   <Button
                     onClick={() => {
                       handleChooseRoom(item);
                     }}
                   >
                     Đặt Phòng
                   </Button>
                 </div>
               </div>
             </div>
           </div>
         );
       })
      }
    }
    const handleClick = () =>{
      setModalImage(!modalImage)
    }
    const handleModalService=()=>{
      setModalService(!modalService)
    }
    const handleChooseRoom = (item) =>{
      let newFilter = {
        ...valueSearch,userId:hotel.userId
      }
      console.log(queryString.stringify({userId:hotel.userId,id:hotel._id}))
      // console.log({...item,id:hotel._id,userId:hotel.userId})
      history.push({
        pathname:"/payment",
        search:queryString.stringify(newFilter)
      })
      dispatch(
        addFilter({
          ...hotel,
          imageHotel: hotel.image[0],
          ...newFilter,
          ...item,
          userId: hotel.userId,
          _id: hotel._id,
        })
      );
    }
    const settings = {
      customPaging: function (i) {
        return (
          <a>
            <img src={hotel.image?.[i]} />
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb slick-dots-custom",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <>
        {loading ? (
          <ContainerLoading />
        ) : (
          <main>
            {/* <div className="breadcump"></div> */}
            <section id="hoteldetail_page">
              <div className="hotelDetail">
                <Container>
                  <div className="hotelDetail-header">
                    <div className="hotel-name">
                      <h5> {hotel.name} </h5>
                      <div className="hotel-rank">
                        {Array.from({ length: hotel.rank }, (item, idx) => (
                          <FaStar key={idx} color="hsl(40, 100%, 61%)" />
                        ))}
                      </div>
                    </div>
                    {/* chon phong */}
                    <div className="hotel-book">
                      <span className="hotel-book-price">
                        {hotel.rooms?.[0].price} / đêm
                      </span>
                      <span className="hotel-book-button">Chọn Phòng</span>
                    </div>
                  </div>
                  {/* user review match */}
                  <div className="hotelDetail-review-match">
                    <div className="hotelDetail-user">
                      <span> {hotel.rating} </span>
                      <span>
                        {" "}
                        {hotel.rating > 8 ? "Tuyệt Vời" : "Tạm Được"}{" "}
                      </span>
                      <span>{`(${hotel.numReview})`} Đánh Giá</span>
                    </div>
                  </div>
                  {/* location */}
                  <div className="hotelDetail-location">
                    <GoLocation />
                    <span>{hotel.address}</span>
                  </div>

                  {/* hotel img */}
                  <div className="hotelDetail-image-section">
                    <Row>
                      <Col>
                        <div className="hotelDetail-image-left">
                          <img src={hotel.image?.[0]} alt="dsa" />
                        </div>
                      </Col>
                      <Col>
                        <div className="hotelDetail-image-right">
                          <div
                            className="hotelDetail-image-right-section"
                            style={{ position: "relative" }}
                          >
                            {hotel.image?.slice(0, 4).map((item, idx) => {
                              return (
                                <div
                                  key={idx}
                                  className="hotelDetail-image-right-item"
                                >
                                  <img src={item} alt="" />
                                </div>
                              );
                            })}
                            {hotel.image?.length >= 4 ? (
                              <div
                                onClick={handleClick}
                                className="hotelDetail-image-right-item-ab"
                              >
                                <div className="hotelDetail-image-right-item-text">
                                  <span>+ {hotel.image?.length - 4} </span>

                                  <BsFillImageFill
                                    style={{ fill: "rgb(255,255,255)" }}
                                  />
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* modal image */}
                  <Modal
                    isOpen={modalImage}
                    toggle={handleClick}
                    className={"abc"}
                  >
                    <ModalBody>
                      <div>
                        <Slider {...settings}>
                          {hotel.image?.map((item, idx) => {
                            return (
                              <div key={idx}>
                                <img
                                  style={{ height: "500px" }}
                                  src={item}
                                  alt="umbalaxibua"
                                />
                              </div>
                            );
                          })}
                        </Slider>
                      </div>
                    </ModalBody>
                  </Modal>
                </Container>
              </div>
              {/* service hotel */}
              <div
                className="hotelDetail-service"
                style={{ marginTop: "4rem" }}
              >
                <Container>
                  <Row xl="2" md="1">
                    <Col>
                      <div className="hotelDetail-service-left">
                        <div
                          className="hotelDetail-service-header"
                          style={{ marginBottom: "2rem" }}
                        >
                          <span>Tiện nghi khách sạn</span>
                          <span onClick={handleModalService}>
                            Xem tất cả tiện nghi
                          </span>
                        </div>
                        <div className="hotelDetail-service-detail">
                          {hotel.service?.slice(0, 9).map((item, idx) => {
                            return (
                              <div
                                key={idx}
                                className="hotelDetail-service-item"
                              >
                                <img src={item.serviceItem?.[0].image} alt="" />
                                <span>{item.serviceItem?.[0].title}</span>
                              </div>
                            );
                          })}
                          {hotel.service.length >= 10 && (
                            <div
                              onClick={handleModalService}
                              className="hotelDetail-service-item more-item"
                            >
                              <span>
                                +
                                {hotel.service.length >= 10 &&
                                  hotel.service?.reduce(
                                    (total, currentValue, i, array) => {
                                      return (
                                        total + array[i].serviceItem.length
                                      );
                                    },
                                    0
                                  ) - 9}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <h6 className="hotelDetail-review-header">Đánh Giá</h6>
                      <div className="hotelDetail-page-userReview">
                        <div className="hotelDetail-page-userReview-list">
                          <div className="hotelDetail-page-userReview-item">
                            <span>Vị Trí</span>
                            <div className="hotelDetail-page-item-detail">
                              <div className="hotelDetai-progess-blue"></div>
                            </div>
                            <span>7.4</span>
                          </div>
                          <div className="hotelDetail-page-userReview-item">
                            <span>Giá Cả</span>
                            <div className="hotelDetail-page-item-detail">
                              <div className="hotelDetai-progess-blue"></div>
                            </div>
                            <span>7.4</span>
                          </div>
                          <div className="hotelDetail-page-userReview-item">
                            <span>Phục Vụ</span>
                            <div className="hotelDetail-page-item-detail">
                              <div className="hotelDetai-progess-blue"></div>
                            </div>
                            <span>7.4</span>
                          </div>
                          <div className="hotelDetail-page-userReview-item">
                            <span>Tiện Nghi</span>
                            <div className="hotelDetail-page-item-detail">
                              <div className="hotelDetai-progess-blue"></div>
                            </div>
                            <span>7.4</span>
                          </div>
                          <div className="hotelDetail-page-userReview-item">
                            <span>Vị Trí</span>
                            <div className="hotelDetail-page-item-detail">
                              <div className="hotelDetai-progess-blue"></div>
                            </div>
                            <span>7.4</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
              {/* room hotels */}
              <div className="hotelDetail-rooms">
                <div className="hotelDetail-rooms-wrap">
                  <Container>
                    <Row>
                      <Col>
                        <div className="hotelDetail-rooms-list">
                          {showRoomDetail()}
                          
                          
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </section>
            <Modal
              isOpen={modalService}
              toggle={handleModalService}
              className={"abc"}
            >
              <ModalHeader toggle={handleModalService}>
                Tiện Nghi Khách Sạn{" "}
              </ModalHeader>
              <ModalBody>
                <div className="modalService-hotel">
                  {hotel.service.map((item,idx) => {
                    return (
                      
                      <div key={idx}
                        className="hotelDetail-service-list"
                        style={{ marginBottom: "30px" }}
                      >
                        <h6 style={{ fontSize: "1.6rem" }}> {item.title} </h6>
                        <div
                          className="serviceItemList"
                          style={{ display: "flex" }}
                        >
                          {item.serviceItem.map((item,idx) => {
                            return (
                              <div key={idx}
                                className="hotelDetail-service-item"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "33.33%",
                                }}
                              >
                                <img
                                  src={item.image}
                                  style={{ width: "30px", height: "30px" }}
                                  alt=""
                                />
                                <span style={{ marginLeft: "10px" }}>
                                  {item.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* 
                  
                  */}
                </div>
              </ModalBody>
            </Modal>
          </main>
          // modal
        )}
      </>
    );
}
         
export default DetailHotelPage;      