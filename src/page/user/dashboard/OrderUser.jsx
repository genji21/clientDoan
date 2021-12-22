import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import userApi from '../../../api/userApi'
import { useSelector } from 'react-redux';
import ContainerLoading from '../../../util/loading';
import { Card, CardBody, CardHeader, CardImg, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';
import { IoPeopleOutline } from "react-icons/io5";
import { BsMoon } from "react-icons/bs";
import dayjs from 'dayjs';
import NumberFormat from 'react-number-format';
OrderUser.propTypes = {
    
};

function OrderUser(props) {
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState()
     const user = useSelector((state) => state.user.current.user);
     dayjs.updateLocale("en", {
       weekdays: ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7 "],
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
    useEffect(() => {
        const getData = async () => {
          setLoading(true);
          const data = await userApi.getHistory(props.token, user?._id);
        setData(data.history)
          setLoading(false);
        };
        if(user !== undefined){
            getData();
            
        }
    }, [user]);
    return (
      <>
        {loading ? <ContainerLoading /> : ""}
        <div className="user_order-wrap">
        {
        data !== undefined ?
        data.map((item,idx)=>{
            return (
              <>
                <Card key={idx}>
                  <CardHeader>
                    Mã Đơn Hàng : <span>{item._id}</span>
                  </CardHeader>
                  <CardBody>
                    <CardImg
                      alt="Card image cap"
                      src={item.cart?.imageHotel}
                      top
                      width="100%"
                    />
                    <div className="card-name-room-people">
                      <CardText>{item.cart?.name}</CardText>
                      <CardText>
                        {item.cart?.numRoom}x {item.cart?.title}
                      </CardText>
                      <CardText>
                        <IoPeopleOutline />
                        {item.cart?.numPeople} Người
                      </CardText>
                    </div>
                    {/* checkIn,checkDate */}
                    <div className="card-checkin-checkout">
                      <div className="card-checkin">
                        <CardText>Nhận Phòng</CardText>
                        <CardText className="checkIn-checkOut">
                          {dayjs(item.cart?.startDate, "DD-MM-YY").format(
                            "dddd ,DD MMMM "
                          )}
                        </CardText>
                      </div>
                      {/* numNight */}
                      <div className="card-numDay">
                        <div className="numDay">
                          <span>{item.cart?.numDay}</span>
                          <BsMoon />
                        </div>
                      </div>
                      {/* checkout */}
                      <div className="card-checkout">
                        <CardText>Trả Phòng</CardText>
                        <CardText className="checkIn-checkOut">
                          {dayjs(item.cart?.endDate, "DD-MM-YY").format(
                            "dddd ,DD MMMM "
                          )}
                        </CardText>
                      </div>
                      {/* tong tien */}
                    </div>
                    {/*  */}
                    <div className="card-payment-total">
                      <CardTitle>Tổng Tiền</CardTitle>
                      <CardText>
                        <NumberFormat
                          value={item.cart?.price}
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix=""
                          suffix="đ"
                          displayType="text"
                        />
                      </CardText>
                    </div>
                    {/* status */}
                    <div className="card-payment-status">
                      <CardText>{item.status} </CardText>
                    </div>
                  </CardBody>
                </Card>
              </>
            );
        }) : ""
        }
        </div>
      </>
    );
}

export default OrderUser;