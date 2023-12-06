import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Card  } from 'antd';
import { Rate } from 'antd'
import { faPowerOff, faMagnifyingGlass, faLocationDot, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import './listwrite.css'

const custom1 = require('../../../asset/img/custom/custom1.jpg');
const product = require('../../../asset/img/Product/Forsale.jpg');

export default function ListWrite() {
    return (
        <div>
            <div className='dashboard-container'>
                <div className='dashboard-title'>
                    <div className='header-container'>
                        <h3 className='font-semibold text-xl'>DANH SÁCH BÀI VIẾT</h3>
                        <div className='header-container-right'>
                            <img src={custom1} className='w-10 h-10 rounded-full ml-2 '></img>
                            <strong className='ml-2 mr-2'>Xin Chào, <span className='text-blue-500'>Alica Noory</span></strong>
                            <Link to='/' className='border-l'>
                                <FontAwesomeIcon icon={faPowerOff} className='p-5 text-blue-400 ' />
                            </Link>
                        </div>
                    </div>
                    <div className='dashboard-opt'>
                        <div className='dashboard-list-container'>
                            <div className='header-list'>
                                <input tyle='text' onclick='this.select()' placeholder='Search'>
                                </input>
                                <button tyle='submit'>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className='text-blue-500 ml-5' />
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className='list-items pt-10'>
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={12}>
                                        <div className='new-item flex'>
                                            <div className='new-item-img'>
                                                <img src={product} alt="" className='item-img'></img>
                                            </div>
                                            <Card
                                                bordered={false}
                                            >
                                                <div className='new-item-content'>
                                                <h4 className='font-semibold text-xl'>Gorgeous House For Sale</h4>
                                                <div>
                                                    <FontAwesomeIcon icon={faLocationDot} className='text-blue-500' />
                                                    <span className='font-semibold ml-2'>70 Bright St New York, USA</span>
                                                </div>
                                                <div className='rate'>
                                                    <Rate disabled allowHalf defaultValue={3.5} className='text-sm' />
                                                    <FontAwesomeIcon icon={faTrashCan} className='icon-delete text-blue-500' />
                                                </div>
                                            </div>
                                            </Card>
                                            
                                        </div>
                                    </Col>
                                    <Col className="gutter-row" span={12}>
                                        <div className='new-item flex'>
                                            <div className='new-item-img'>
                                                <img src={product} alt="" className='item-img'></img>
                                            </div>
                                            <Card
                                                bordered={false}
                                            >
                                                <div className='new-item-content'>
                                                <h4 className='font-semibold text-xl'>Gorgeous House For Sale</h4>
                                                <div>
                                                    <FontAwesomeIcon icon={faLocationDot} className='text-blue-500' />
                                                    <span className='font-semibold ml-2'>70 Bright St New York, USA</span>
                                                </div>
                                                <div className='rate'>
                                                    <Rate disabled allowHalf defaultValue={3.5} className='text-sm' />
                                                    <FontAwesomeIcon icon={faTrashCan} className='icon-delete text-blue-500' />
                                                </div>
                                            </div>
                                            </Card>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
