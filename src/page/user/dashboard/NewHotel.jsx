import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, FormGroup, Label, Button } from "reactstrap";
import "./newHotelStyle.scss";
import { useState } from "react";
import { useStore } from "react-redux";
NewHotel.propTypes = {};

function NewHotel(props) {
    const [inforHotel,setinforHotel] = useState({
        "nameHotel":"",
        "type":"",
        "rank":0,
        "service":[

        ]
    })

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(inforHotel)
    }
    const handleChangeInfor = (e) =>{
        if(e.target.name !== "service") { 
              setinforHotel({
                ...inforHotel,
                [e.target.name]: e.target.value,
              });
           
        }
        else {
            if(e.target.checked){
                const index =e.target.getAttribute("dataindex")
                
                inforHotel.service.push({
                  title: e.target.getAttribute("datatype"),
                  image:
                    "https://tripi.vn/cdn-cgi/image/width=1280,height=1280/https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/1223%2FZAWE6R31IG_97528369.jpg?generation=1586414644815393&alt=media",
                  serviceItem: [
                    {
                      title: e.target.value,
                      image:
                        "https://tripi.vn/cdn-cgi/image/width=1280,height=1280/https://www.googleapis.com/download/storage/v1/b/hotelcdn/o/1223%2FZAWE6R31IG_97528369.jpg?generation=1586414644815393&alt=media",
                    },
                  ],
                });
               let  key ="title"
              const arrayUniqueByKey = [
                ...new Map(inforHotel.service.map((item) => [item[key], item])).values(),];
                 setinforHotel({
                       ...inforHotel,
                        service:arrayUniqueByKey
                     });
               
            }
            else {
                
                let newService = inforHotel.service.filter((item) => {
                  return item.title !== e.target.getAttribute("datatype");
                });
                setinforHotel({
                    ...inforHotel,service:newService
                })
            }
               
        }
    }
    useEffect(()=>{
        // console.log(inforHotel)
    },[inforHotel])
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="nameHotel"> Tên Khách Sạn </Label>
          <Input
            value={inforHotel.nameHotel}
            name="nameHotel"
            id="nameHotel"
            onChange={handleChangeInfor}
          />
        </FormGroup>
        <div className="type_hotel-rank">
          <FormGroup>
            <Label for="exampleSelect">Loại Chổ Nghĩ</Label>
            <Input
              id="exampleSelect"
              name="type"
              onChange={handleChangeInfor}
              type="select"
            >
              <option value="Hotel">Hotel</option>
              <option value="Apartment">Apartment</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <div className="review-user_star">
              <div className="hotel_rank">
                <span>Hạng Khách Sạn </span>
                <div className="reviews">
                  <input
                    onChange={handleChangeInfor}
                    type="radio"
                    name="rank"
                    id="rd-5"
                    value="5"
                  />
                  <label htmlFor="rd-5" className="fas fa-star"></label>

                  <input
                    onChange={handleChangeInfor}
                    type="radio"
                    name="rank"
                    id="rd-4"
                    value="4"
                  />
                  <label htmlFor="rd-4" className="fas fa-star"></label>

                  <input
                    onChange={handleChangeInfor}
                    type="radio"
                    name="rank"
                    id="rd-3"
                    value="3"
                  />
                  <label
                    onChange={handleChangeInfor}
                    htmlFor="rd-3"
                    className="fas fa-star"
                  ></label>

                  <input
                    onChange={handleChangeInfor}
                    type="radio"
                    name="rank"
                    id="rd-2"
                    value="2"
                  />
                  <label
                    onChange={handleChangeInfor}
                    htmlFor="rd-2"
                    className="fas fa-star"
                  ></label>

                  <input
                    onChange={handleChangeInfor}
                    type="radio"
                    name="rank"
                    id="rd-1"
                    value="1"
                  />
                  <label htmlFor="rd-1" className="fas fa-star"></label>
                </div>
              </div>
            </div>
          </FormGroup>
          {/*  */}
          <FormGroup>
            {/* service */}
            <div>
                <h4>Tiện Nghi Cho Khách Sạn </h4>
              <Label>4G Toc Do Cao</Label>
              <Input
                onChange={handleChangeInfor}
                type="checkbox"
                id="service_internet"
                name="service"
                value="4G Toc Do Cao"
                datatype="Internet"
                dataindex="1"
              />
            </div>
            <div>
              <Label htmlFor="service_dichvukhachsan">Le Tan 24h </Label>
              <Input
                onChange={handleChangeInfor}
                type="checkbox"
                id="service_letan"
                name="service"
                datatype="dichvukhachsan"
                value="LeTan24H"
                dataindex="2"
              />
            </div>
          </FormGroup>
        </div>
        <Button> Test</Button>
      </Form>
    </>
  );
}

export default NewHotel;
