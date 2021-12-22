import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Input, Row } from 'reactstrap';
import { FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdFastfood } from "react-icons/md";
import './style.scss'
import hotelApi from '../../api/hotelsApi';
import ContainerLoading from '../../util/loading'
import { useDispatch } from "react-redux";
import { addFilter } from "../../slice/paymenSlice";
import { useSelector } from "react-redux";

import { useHistory, useLocation, useParams } from "react-router";
import { Link } from 'react-router-dom';
HotelPage.propTypes = {
    
};

function HotelPage(props) {
  const {location} = useParams();
   const dispatch = useDispatch();

  const [filter,setFilter] = useState({
    limit:10,
    page:1,
    rating:'',
    rank:'',
    location:location,
    type:""
    
  })
    const valueSearch = useSelector((state) => {
      return state.payment;
    });
    const [hotel,setHotel]= useState([])
    const [loading,setLoading] = useState(true)
  useEffect(()=>{
    console.log(valueSearch);

    const getData = async () =>{
      const res = await hotelApi.getHotel(filter)
      console.log(res.data.data)
      setHotel(res.data.data)
      setLoading(!loading);

    }
    getData()
  },[filter])
  
  // useEffect(()=>{
  //   console.log(rating)
  //   console.log(hotel.filter(item=>{
  //     return item.rank === rating
  //   }))
  //   const newHotel = hotel.filter(item=>{
  //     return item.rank === rating
  //   })
  //   setHotel(newHotel)
  // },[rating])
 


  const handleRating = (hotel) =>{
    if(hotel){
      const { rating, numReview } = hotel;
if (rating >= 9 && rating <= 10) {
  return (
    <>
      <span className="hotelpage_user-match">{rating}</span>
      <span>Tuyệt Vờit</span>
      {/* số lượng đánh giá */}
      <span>({numReview} đánh giá ) </span>
    </>
  );
}
if(rating <=9 && rating >= 8 ) {
  return (
    <>
      <span className="hotelpage_user-match">{rating}</span>
      <span>Rất Tốt </span>
      {/* số lượng đánh giá */}
      <span>({numReview} đánh giá ) </span>
    </>
  );
}
return (
  <>
    <span className="hotelpage_user-match">{rating}</span>
    <span>Tạm Được </span>
    {/* số lượng đánh giá */}
    <span>({numReview} đánh giá ) </span>
  </>
);
    }}
    const handleClick = (item) =>{
      const newFilter = {...valueSearch,value:item.name}
      dispatch(addFilter(newFilter))
    }
    return (
      <>
        {loading ? <ContainerLoading /> : ""}
        <main id="hotel_page" style={{ background: "#F4F8FA" }}>
          <div className="hotel_page-container">
            <Container>
              <h3>
                {/* {hotel.length} {hotel[0]?.type} {filter.rank === '' ? "": hotel[0]?.rank  + " sao"}   Tại {location} */}
                {hotel?.length !== 0
                  ? `${hotel?.length} ${hotel?.[0].type} ${
                      filter.rank === "" ? "" : hotel?.[0]?.rank + "sao"
                    } tại ${location} `
                  : ""}
              </h3>
              <Row>
                <Col style={{ flexBasis: "30%" }}>
                  <section className="hotelPage-filter">
                    <div className="hotelPage-filter-detail">
                      <div
                        className="hotelPage-filter-header"
                        style={{
                          padding: "10px 0 ",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        <span>Bộ Lọc</span>
                        <span>Xóa Tất Cả Lọc</span>
                      </div>
                      {/* Hang Khach San */}
                      <div
                        className="hotelPAge-filter_rank"
                        style={{
                          padding: "10px 0 ",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        <h5>Hạng Khách Sạn</h5>
                        <div className="hotelPage-filter-star">
                          <Input
                            checked={filter.rank === 5 ? true : false}
                            onChange={(e) => {
                              setLoading(!loading);
                              setFilter({ ...filter, rank: 5 });
                            }}
                            id="star5"
                            type="radio"
                            name="star"
                          />
                          <label htmlFor="star5">
                            <div className="hotelPage-filterStar-container">
                              <FaStar></FaStar>
                              <FaStar></FaStar>
                              <FaStar></FaStar>
                              <FaStar></FaStar>
                              <FaStar></FaStar>
                            </div>
                          </label>
                        </div>
                        <div className="hotelPage-filter-star">
                          <Input
                            onChange={(e) => {
                              setLoading(!loading);
                              setFilter({ ...filter, rank: 4 });
                            }}
                            id="star4"
                            type="radio"
                            name="star"
                          />
                          <label htmlFor="star4">
                            <div className="hotelPage-filterStar-container">
                              <FaStar></FaStar>
                              <FaStar></FaStar>
                              <FaStar></FaStar>
                              <FaStar></FaStar>
                            </div>
                          </label>
                        </div>
                        <div className="hotelPage-filter-star">
                          <Input
                            onChange={(e) => {
                              setLoading(!loading);
                              setFilter({ ...filter, rank: 3 });
                            }}
                            id="star3"
                            type="radio"
                            name="star"
                          />
                          <label htmlFor="star3">
                            <div className="hotelPage-filterStar-container">
                              <FaStar></FaStar>
                              <FaStar></FaStar>
                              <FaStar></FaStar>
                            </div>
                          </label>
                        </div>
                        <div className="hotelPage-filter-star">
                          <Input
                            onChange={(e) => {
                              setLoading(!loading);
                              setFilter({ ...filter, rank: 2 });
                            }}
                            id="star2"
                            type="radio"
                            name="star"
                          />
                          <label htmlFor="star2">
                            <div className="hotelPage-filterStar-container">
                              <FaStar></FaStar>
                              <FaStar></FaStar>
                            </div>
                          </label>
                        </div>
                        <div className="hotelPage-filter-star">
                          <Input
                            onChange={(e) => {
                              setLoading(!loading);
                              setFilter({ ...filter, rank: 1 });
                            }}
                            id="star1"
                            type="radio"
                            name="star"
                          />
                          <label htmlFor="star1">
                            <div className="hotelPage-filterStar-container">
                              <FaStar></FaStar>
                            </div>
                          </label>
                        </div>
                      </div>
                      {/* user review */}
                      <div
                        className="hotelPage-filter_userReview"
                        style={{
                          padding: "10px 0 ",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        <h5>Người dùng đánh giá </h5>
                        <div className="hotelPage-filter-review">
                          <div className="hotelPage-filter-item">
                            <Input
                              onChange={() => {
                                setLoading(!loading);
                                setFilter({ ...filter, rating: 9 });
                              }}
                              type="radio"
                              id="perfect"
                              name="userReview"
                            />
                            <label htmlFor="perfect">Tuyệt Vời (9.0+)</label>
                          </div>
                          <div className="hotelPage-filter-item">
                            <Input
                              onChange={() => {
                                setLoading(!loading);
                                setFilter({ ...filter, rating: 8 });
                              }}
                              type="radio"
                              id="good"
                              name="userReview"
                            />
                            <label htmlFor="good">Rất Tốt (8.0+)</label>
                          </div>
                          <div className="hotelPage-filter-item">
                            <Input
                              onChange={() => {
                                setLoading(!loading);
                                setFilter({ ...filter, rating: 7 });
                              }}
                              type="radio"
                              id="normal"
                              name="userReview"
                            />
                            <label htmlFor="normal">Tốt (7.0+)</label>
                          </div>
                        </div>
                      </div>
                      {/* type Hotel */}
                      <div className="hotelPage-filter_tyoeHotel">
                        <h5>Loại Khách Sạn</h5>
                        <div className="hotelPage-filter-review">
                          <div className="hotelPage-filter-item">
                            <Input
                              onChange={() => {
                                setLoading(!loading);
                                setFilter({
                                  ...filter,
                                  rank: '',
                                  type: "hotel",
                                });
                              }}
                              type="radio"
                              id="hotel"
                              name="typeHotel"
                            />
                            <label htmlFor="hotel">Khách Sạn</label>
                          </div>
                          <div className="hotelPage-filter-item">
                            <Input
                              onChange={() => {
                                setLoading(!loading);
                                setFilter({
                                  ...filter,
                                  rank:'',

                                  type: "apartment",
                                });
                              }}
                              type="radio"
                              id="hotelapartment"
                              name="typeHotel"
                            />
                            <label htmlFor="hotelapartment">
                              Khách Sạn Căn Hộ
                            </label>
                          </div>
                          <div className="hotelPage-filter-item">
                            <Input
                              onChange={() => {
                                setLoading(!loading);
                                setFilter({
                                  ...filter,
                                  rank: '',

                                  type: "resort",
                                });
                              }}
                              type="radio"
                              id="resort"
                              name="typeHotel"
                            />
                            <label htmlFor="resort">
                              Khu Nghỉ Dưỡng Ressort
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </Col>
                <Col style={{ flexBasis: "70%" }}>
                  <section className="hotelPage-listHotel">
                    <div className="hotelPage-wrap">
                      {hotel?.length === 0  ? (
                        <div>
                          <h5>
                            Không tìm thấy kết quả nào với các tiêu chí tìm kiếm
                            của bạn. Vui lòng thay đổi tiêu chí tìm kiếm
                          </h5>
                          <img
                          style={{"width":"50%"}}
                            src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_no_result_search_listing.svg"
                            alt=""
                          />
                        </div>
                      ) : (
                        hotel.map((item,id) => {
                          return (
                            <Link
                            onClick={()=>{
                              handleClick(item)
                            }} 
                             key={id} style={{"textDecoration":"none","color":"inherit"}} to = {`/hotel/${location}/${item._id}`}>
                              <div className="hotelPage-item">
                                <div className="hotelPage-hotel">
                                  <div className="hotelPage-hotel-img">
                                    <img src={item.image[0]} alt="" />
                                  </div>
                                  <div className="hotelPage-content">
                                    <span className="hotelPage-price">
                                      Giá Độc Quyền
                                    </span>
                                    <h4 className="hotelPage-name">
                                      {item.name}
                                    </h4>
                                    <div className="hotelpage_rank">
                                      {Array.from(
                                        { length: item.rank },
                                        (item, idx) => (
                                          <FaStar key={idx} color="black" />
                                        )
                                      )}
                                    </div>
                                    <div className="hotelpage_user_review">
                                      {handleRating(item)}
                                    </div>
                                    {/* location */}
                                    <div className="hotelpage_detail-location">
                                      <HiOutlineLocationMarker />
                                      <span> {item.location}</span>
                                    </div>
                                    {/* food-service */}
                                    <div className="hotelpage_detail-food">
                                      <MdFastfood />
                                      <span>Bữa Sáng Miễn Phí</span>
                                    </div>
                                    {/* price */}
                                    <div
                                      className="hotelpage_price"
                                      style={{ textAlign: "right" }}
                                    >
                                      <strong>
                                        {item.rooms[0].price} / <span>Đêm</span>
                                      </strong>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })
                      )}
                    </div>
                  </section>
                </Col>
              </Row>
            </Container>
          </div>
        </main>
      </>
    );
}

export default HotelPage;