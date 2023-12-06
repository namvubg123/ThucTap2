import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Upload, Input } from 'antd';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faStreetView, faCloudArrowUp, faList, faRightLong, faDownLong, faLocationPin, faMoneyBillWave, faPhoneFlip } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import "./addNew.css";
import { faBed, faBath, faWarehouse, faPeopleRoof, faMaximize } from '@fortawesome/free-solid-svg-icons'
import { InboxOutlined } from '@ant-design/icons';
import MapLocation from '../../Map';
import { Select, Checkbox, Divider } from 'antd';


const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Wifi', 'Nóng lạnh', 'Điều hòa'];
const defaultCheckedList = ['Wifi', 'Nóng lạnh'];

const custom1 = require('../../../asset/img/custom/custom1.jpg');
const { Dragger } = Upload;
// address: '',
//     lat: 0,
//     lng: 0,
function AddNew() {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [location, setLocation] = useState({
    address: '',
    lat: -34.397, 
    lng: 150.644 
  });
  const [coordsLoaded, setCoordsLoaded] = useState(false);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  const conChangeViDo = (e) => {
    var newObject = {...location, lat: e.target.value}
    setLocation(newObject);
    if(location.lng != undefined || location.lat != undefined) {
      setCoordsLoaded(true);
    }
  } 

  const conChangeAddress = (e)=> {
    var newObject = {...location, lat: e.target.value}
    setLocation(newObject);
  }

  const conChangeKinhDo = (e) => {
    var newObject = {...location, address: e.target.value}
    setLocation(newObject);
    if(location.lng != undefined || location.lat != undefined) {
      setCoordsLoaded(true);
    }
  } 
  const props = {
    name: 'file',
    multiple: true,
    onChange(info) {

    },
    onDrop(e) {
    },
  };

  return (
    <div>
      <div className='dashboard-container'>
        <div className='dashboard-title'>
          <div className='header-container'>
            <h3 className='font-semibold text-xl'>ĐĂNG BÀI</h3>
            <div className='header-container-right'>
              <img src={custom1} className='w-10 h-10 rounded-full ml-2 '></img>
              <strong className='ml-2 mr-2'>Xin Chào, <span className='text-blue-500'>Alica Noory</span></strong>
              <Link to='/' className='border-l'>
                <FontAwesomeIcon icon={faPowerOff} className='p-5 text-blue-400 ' />
              </Link>
            </div>
          </div>
        </div>
        <div className='container-widget'>
          <div className='widget-header'>
            <FontAwesomeIcon icon={faStreetView} className='pt-1 text-blue-500 mr-1' />
            <h4 className='text-sm'>Thông tin vị trí</h4>
          </div>
          <div className='custom-form'>
            <Row gutter={16}>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className='pb-2 '>Địa chỉ</h5>
                  <ul className='input-item '>
                    <FontAwesomeIcon icon={faLocationPin} className='p-4 text-blue-500' />
                    <Input onChange={(e) => conChangeAddress(e)} type='text' className='input-style' placeholder='   Địa Chỉ của bạn'></Input>
                  </ul>
                </div>
              </Col>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className='pb-2 '>Kinh độ</h5>
                  <ul className='input-item'>
                    <FontAwesomeIcon icon={faRightLong} className='p-4 text-blue-500' />
                    <Input  onChange={(e) => conChangeKinhDo(e)} type='text' className='input-style' placeholder='Kinh độ trên Map'></Input>
                  </ul>
                </div>
              </Col>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className='pb-2'>Vĩ độ</h5>
                  <ul className='input-item'>
                    <FontAwesomeIcon icon={faDownLong} className='p-4 text-blue-500' />
                    <Input type='text'  onChange={(e) => conChangeViDo(e)} className='input-style' placeholder='  Vĩ độ trên Map ' ></Input>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
          {/* map */}
          {coordsLoaded && <MapLocation location={location} zoomLevel={17} /> }
          <div className='custom-form'>
            <Row gutter={16} className='mt-8'>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className='pb-2'>Giá tiền</h5>
                  <ul className='input-item'>
                    <FontAwesomeIcon icon={faMoneyBillWave} className='p-4 text-blue-500' />
                    <input type='text' className='input-style' placeholder='   Giá cho thuê' ></input>
                  </ul>
                </div>
              </Col>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className='pb-2'>Số điện Thoại</h5>
                  <ul className='input-item'>
                    <FontAwesomeIcon icon={faPhoneFlip} className='p-4 text-blue-500' />
                    <input type='text' className='input-style' placeholder='   Số điện thoại của bạn'></input>
                  </ul>
                </div>
              </Col>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className='pb-2'>Email</h5>
                  <ul className='input-item'>
                    <FontAwesomeIcon icon={faEnvelope} className='p-4 text-blue-500' />
                    <input type='text' className='input-style' placeholder='   Email của bạn' ></input>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className='container-widget'>
          <div className='widget-header'>
            <FontAwesomeIcon icon={faList} className='pt-1 text-blue-500 mr-1' />
            <h4 className='text-sm'>Chi tiết căn phòng</h4>
          </div>
          <div className='custom-form'>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <div>
                  <div className='pb-5'>
                    <h5 className='pb-2'>Tiêu đề</h5>
                    <ul className='input-item'>
                      <input type='text ' className='input-style' placeholder='   Nhập từ khóa'></input>
                    </ul>
                  </div>
                </div>
                <Row gutter={16}>
                  <Col className="gutter-row text-xs" span={11}>
                    <div>
                      <div className='pb-10'>
                        <h5 className='pb-2'>Số phòng</h5>
                        <ul className='input-item'>
                          <FontAwesomeIcon icon={faPeopleRoof} className='p-3 text-blue-500' />
                          <input type='text ' className='input-style' placeholder='   Số phòng'></input>
                        </ul>
                      </div>

                      <div className='pb-10'>
                        <h5 className='pb-2'>Diện tích</h5>
                        <ul className='input-item'>
                          <FontAwesomeIcon icon={faMaximize} className='p-3 text-blue-500' />
                          <input type='text ' className='input-style' placeholder='   Diện tích'></input>
                        </ul>
                      </div>

                      <div className=' '>
                        <h5 className='pb-2'>Phân loại</h5>
                        <Select
                          defaultValue="Chung cư"
                          style={{
                            width: 213,
                          }}

                          options={[
                            {
                              value: 'Chung cư',
                              label: 'Chung cư',
                            },
                            {
                              value: 'Phòng trọ',
                              label: 'Phòng trọ',
                            },
                            {
                              value: 'Nhà nguyên căn',
                              label: 'Nhà nguyên căn',
                            },
                            {
                              value: 'Ở ghép',
                              label: 'Ở ghép',
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={2}></Col>
                  <Col className="gutter-row text-xs" span={11}>
                    <div>
                      <div className='pb-10'>
                        <h5 className='pb-2'>Phòng ngủ</h5>
                        <ul className='input-item'>
                          <FontAwesomeIcon icon={faBed} className='p-3 text-blue-500' />
                          <input type='text ' className='input-style' placeholder='   Số điện thoại của bạn'></input>
                        </ul>
                      </div>

                      <div className='pb-10'>
                        <h5 className='pb-2'>Phòng tắm</h5>
                        <ul className='input-item'>
                          <FontAwesomeIcon icon={faBath} className='p-3 text-blue-500' />
                          <input type='text ' className='input-style' placeholder='   Số điện thoại của bạn'></input>
                        </ul>
                      </div>

                      <div className='pb-10'>
                        <h5 className='pb-2'>Chỗ để xe</h5>
                        <ul className='input-item'>
                          <FontAwesomeIcon icon={faWarehouse} className='p-3 text-blue-500' />
                          <input type='text ' className='input-style' placeholder='   Số điện thoại của bạn'></input>
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={24}>
                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                      Check all
                    </Checkbox>
                    <Divider />
                    <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                  </Col>
                </Row>
              </Col>
              <Col className="gutter-row mt-7" span={12}>
                <div>
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <FontAwesomeIcon icon={faCloudArrowUp} className='text-blue-500 text-4xl' />
                    </p>
                    <p className="ant-upload-text">Click here or drop files to upload</p>
                  </Dragger>
                </div>
                <div>
                  <div className='pb-2 pt-6'>
                    <h5 className='pb-2'>Chi tết căn phòng</h5>
                    <ul className='input-item'>
                      <input type='text ' className='input-text' placeholder='   Mô tả của bạn'></input>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <button className='btn-save'>
          <Link to="/" className='mt-0 flex items-center'>
            <span className=" text-sm font-semibold">
              Đăng bài
            </span>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default AddNew;