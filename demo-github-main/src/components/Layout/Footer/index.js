import React from 'react';

import { Col, Row } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { PhoneOutlined } from '@ant-design/icons';
import { EnvironmentOutlined } from '@ant-design/icons';
import { FacebookOutlined } from '@ant-design/icons';
import { TwitterOutlined } from '@ant-design/icons';
import { InstagramOutlined } from '@ant-design/icons';
import { LinkedinOutlined } from '@ant-design/icons';
import { CaretRightOutlined } from '@ant-design/icons';
import { AppleOutlined } from '@ant-design/icons';
import { WindowsOutlined } from '@ant-design/icons';
import "./Footer.css"


const style = {
    padding: '8px 0',
};

const logo = require('../../../asset/img/Logo.png');

export default function Footer() {
    return (
        <div>
            <div className="footer">
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div style={style} className='col-md-3'>
                            <div className='flex-wrap'>
                                <div className='flex-wrap py-5'>
                                    <img src={logo} className="h-12 mr-3" ></img>
                                </div>
                                <p className='text-footer'>CleanHome tự hào là nơi đem đến những trải nghiệm tốt nhất cho quý khách.</p>
                                <div className='mt-5'>
                                    <span className='font-medium'>
                                        Monday - Friday:
                                        <strong className='text-blue-500'> 8am - 6pm</strong>
                                    </span>
                                </div>
                                <div className='mt-2'>
                                    <span className='font-medium'>
                                        Saturday - Sunday:
                                        <strong className='text-blue-500'> 9am - 3pm</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style} className='col-md-3'>
                            <div className='flex-wrap py-8'>
                                <strong><h4 className='footer-widget'>Thông tin Website</h4></strong>
                            </div>
                            <ul>
                                <li className="items-infor-web">
                                    <CaretRightOutlined className='btn-contact-i' />
                                    <a href="#" className='contact-address'>Giới thiệu</a>
                                </li>
                                <li className="items-infor-web">
                                    <CaretRightOutlined className='btn-contact-i' />
                                    <a href="#" className='contact-address'>Tin tức mới nhất</a>

                                </li>
                                <li className="items-infor-web">
                                    <CaretRightOutlined className='btn-contact-i' />
                                    <a href="#" className='contact-address'>Bảng giá dịch vụ</a>

                                </li>
                                <li className="items-infor-web">
                                    <CaretRightOutlined className='btn-contact-i' />
                                    <a href="#" className='contact-address'>Quy chế hoạt động</a>

                                </li>
                                <li className="items-infor-web">
                                    <CaretRightOutlined className='btn-contact-i' />
                                    <a href="#" className='contact-address'>Trung tâm trợ giúp</a>

                                </li>

                            </ul>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style} className='col-md-3'>
                            <div className='flex-wrap py-8'>
                                <strong><h4 className='footer-widget'>Thông tin liên hệ</h4></strong>
                            </div>
                            <ul >
                                <li>
                                    <MailOutlined className='btn-contact-i' />
                                    <span className='text-neutral-400'>
                                        Mail:
                                    </span>
                                    <a href="#" className='contact-address'>cleanhome@domain.com</a>
                                </li>
                                <li>
                                    <EnvironmentOutlined className='btn-contact-i' />
                                    <span className='text-neutral-400'>
                                        Adress:
                                    </span>
                                    <a href="#" className='contact-address'>TT.Trâu Quỳ-Gia Lâm-Hà Nội</a>
                                </li>
                                <li>
                                    <PhoneOutlined className='btn-contact-i' />
                                    <span className='text-neutral-400'>
                                        Phone:
                                    </span>
                                    <a href="#" className='contact-address'>+84 325 423 895</a>
                                </li>
                            </ul>
                            <div>
                                <ul className='flex mt-3'>
                                    <li className='btn-social'>
                                        <a href='#'><FacebookOutlined /></a>
                                    </li>
                                    <li className='btn-social'>
                                        <a href='#'><TwitterOutlined /></a>
                                    </li>
                                    <li className='btn-social'>
                                        <a href='#'><InstagramOutlined /></a>
                                    </li>
                                    <li className='btn-social'>
                                        <a href='#'><LinkedinOutlined /></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style} className='col-md-3'>
                            <div className='flex-wrap py-7'>
                                <strong><h4 className='footer-widget mb-0'>Tải xuống ứng dụng</h4></strong>
                            </div>
                            <p className='text-footer my-1'>Bắt đầu làm việc với CleanHome, nơi có thể cung cấp mọi thứ bạn cần</p>
                            <div className='flex flex-col'>
                                <a href='#' className='api-link'>
                                    <AppleOutlined className='mr-2' />AppStore
                                </a>
                                <a href='#' className='api-link'>
                                    <WindowsOutlined className='mr-2' />Window
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='main-footer'>
                <Row className='sub-footer'>
                    <Col span={8}>© Homeradar 2022 .  All rights reserved.</Col>
                    <Col span={8} offset={8}>
                        <div className='no-list'>
                            <ul className='ml-44 flex text-blue-500'>
                                <li className='mr-2'><a href='#'>Terms of use</a></li>
                                <li className='mr-2'><a href='#'>Privacy Policy</a></li>
                                <li className='mr-2'><a href='#'>Blog</a></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
