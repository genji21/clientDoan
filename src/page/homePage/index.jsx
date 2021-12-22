import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
HomePage.propTypes = {
    
};

function HomePage(props) {
    return (
      <main id="home_page">
        <section id="homepage_service">
          <div className="homepage_service-wrap">
            <Container>
              <Row style={{ padding: "20px 0" }}>
                <Col>
                  <div className="homepage_service-detail">
                    <div className="homepage_service-icon">
                      <img
                        src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_support_247.svg"
                        alt=""
                      />
                    </div>
                    <div className="homepage_service-content">
                      <h5 className="homepage_service-title ">
                        Hỗ Trợ Khách Hàng 24/7
                      </h5>
                      <span className="homepage_service-text">
                        Chat là có, gọi là nghe, không quản đêm hôm, ngày nghỉ
                        và ngày lễ.
                      </span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="homepage_service-detail">
                    <div className="homepage_service-icon">
                      <img
                        src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_best_price.svg"
                        alt=""
                      />
                    </div>
                    <div className="homepage_service-content">
                      <h5 className="homepage_service-title ">
                        Giá tốt sát ngày
                      </h5>
                      <span className="homepage_service-text">
                        Cam kết giá tốt nhất khi đặt gần ngày cho chuyến đi của
                        bạn.
                      </span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="homepage_service-detail">
                    <div className="homepage_service-icon">
                      <img
                        src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_payment.svg"
                        alt=""
                      />
                    </div>
                    <div className="homepage_service-content">
                      <h5 className="homepage_service-title ">
                        Thanh toán dễ dàng, đa dạng
                      </h5>
                      <span className="homepage_service-text">
                        Bao gồm thêm chuyển khoản ngân hàng và tiền mặt tại cửa
                        hàng.
                      </span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="homepage_service-detail">
                    <div className="homepage_service-icon">
                      <img
                        src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_total_hotel.svg"
                        alt=""
                      />
                    </div>
                    <div className="homepage_service-content">
                      <h5 className="homepage_service-title ">
                        Hơn 8000+ khách sạn dọc Việt Nam
                      </h5>
                      <span className="homepage_service-text">
                        Hàng nghìn khách sạn, đặc biệt là 4 sao và 5 sao, cho
                        phép bạn thoải mái lựa chọn, giá cạnh tranh, phong phú.
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        {/* xu huong tim kiem */}
        <section id="homepage_location">
          <div className="homepage_location-wrap">
            <h2>Xu Hướng Tìm Kiếm</h2>

            <div className="homepage_location-district">
              <Container>
                <Row>
                  <Col>
                    <Link to="/hotel/Hồ Chí Minh">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">
                          Hồ Chí Minh{" "}
                        </div>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/hotel/Hà Nội">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">Hà Nội</div>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/hotel/Quy Nhơn">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">Quy Nhơn</div>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/hotel/Đà Nẵng">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">Đà Nẵng </div>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/hotel/huế">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">Huế</div>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/shop">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">Quan 10 </div>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </section>

        {/* đia diem yeu thich */}
        <section id="homepage_favorite-location">
          <div className="homepage_location-wrap">
            <h2>Điểm Đến Yêu Thích</h2>
            <span>Địa điểm hot nhất do Mytour đề xuất</span>
            <div className="homepage_location-district">
              <Container>
                <Row>
                  <Col>
                    <Link to="/shop">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">Quan 10 </div>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/shop">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">Quan 10 </div>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/shop">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">Quan 10 </div>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/shop">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">Quan 10 </div>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/shop">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">Quan 10 </div>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/shop">
                      <div className="homepage_location-item homepage_location_1">
                        <div className="homepage_location-detail">Quan 10 </div>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </section>

        {/* blog */}
        <section id="homepage_blog">
          <div className="homepage_blog-wrap">
            <h5>Cảm Hứng Cho Những Chuyến đi </h5>
            <span>Bí Quyết Du Lịch, những câu chuyện thú vị đang chờ bạn </span>
            <div className="homepage_blog-detail">
              <Container>
                <Row sm="1" lg="2" xs="1">
                  <Col>
                    <Link>
                      <div className="homepage_blog-left">
                        <div className="homepage_blog-left-detail-img">
                          <img
                            src="https://staticproxy.mytourcdn.com/480x360,q90/resources/pictures/locations/mfb1632998077.jpg"
                            alt=""
                          />
                        </div>
                        <span>
                          Top 5 Điểm Cắm Trại Quanh Hà Nội Siêu Hấp Dẫn Phải Rủ
                          “Cạ Cứng” Đi Ngay
                        </span>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <div className="homepage_blog-right">
                      <div className="homepage_blog-right-detail">
                        <div className="homepage_blog-right-item">
                          <Link>
                            <div className="homepage_blog-left">
                              <div className="homepage_blog-left-detail-img">
                                <img
                                  src="https://staticproxy.mytourcdn.com/480x360,q90/resources/pictures/locations/mfb1632998077.jpg"
                                  alt=""
                                />
                              </div>
                              <span>
                                Top 5 Điểm Cắm Trại Quanh Hà Nội Siêu Hấp Dẫn
                                Phải Rủ “Cạ Cứng” Đi Ngay
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="homepage_blog-right-item">
                          <Link>
                            <div className="homepage_blog-left">
                              <div className="homepage_blog-left-detail-img">
                                <img
                                  src="https://staticproxy.mytourcdn.com/480x360,q90/resources/pictures/locations/mfb1632998077.jpg"
                                  alt=""
                                />
                              </div>
                              <span>
                                Top 5 Điểm Cắm Trại Quanh Hà Nội Siêu Hấp Dẫn
                                Phải Rủ “Cạ Cứng” Đi Ngay
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="homepage_blog-right-item">
                          <Link>
                            <div className="homepage_blog-left">
                              <div className="homepage_blog-left-detail-img">
                                <img
                                  src="https://staticproxy.mytourcdn.com/480x360,q90/resources/pictures/locations/mfb1632998077.jpg"
                                  alt=""
                                />
                              </div>
                              <span>
                                Top 5 Điểm Cắm Trại Quanh Hà Nội Siêu Hấp Dẫn
                                Phải Rủ “Cạ Cứng” Đi Ngay
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="homepage_blog-right-item">
                          <Link>
                            <div className="homepage_blog-left">
                              <div className="homepage_blog-left-detail-img">
                                <img
                                  src="https://staticproxy.mytourcdn.com/480x360,q90/resources/pictures/locations/mfb1632998077.jpg"
                                  alt=""
                                />
                              </div>
                              <span>
                                Top 5 Điểm Cắm Trại Quanh Hà Nội Siêu Hấp Dẫn
                                Phải Rủ “Cạ Cứng” Đi Ngay
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </section>
      </main>
    );
}

export default HomePage;