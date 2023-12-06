import React from 'react';
import { faUserPen, faTableList, faFileCirclePlus, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs } from 'antd';
import "./addlisting.css"
import AddNew from "./AddNew";
import ListWrite from './ListWrite';
import Profile from './Profile';


const items = [
  {
    key: '1',
    label: (
      <span>
        <FontAwesomeIcon icon={faFileCirclePlus} className='pr-2 text-blue-600' />
        Đăng bài
      </span>
    ),
    children: <AddNew />,
  },
  {
    key: '2',
    label: (
      <span>
        <FontAwesomeIcon icon={faTableList} className='pr-2 text-blue-600' />
        Danh sách bài viết
      </span>
    ),
    children: <ListWrite/>,
  },
  {
    key: '3',
    label: (
      <span>
        <FontAwesomeIcon icon={faUserPen}  className='pr-2 text-blue-600' />
        Thông tin cá nhân
      </span>
    ),
    children: <Profile/>,
  },
  
];


export default function AddListing() {
  return (
    <div className='dashboard-menu'>
      <Tabs tabAddlisting tabPosition='left' defaultActiveKey="1" items={items} />
      {/* <div className='dashboard-menu-footer'>© CLEANHOME 2022 . ALL RIGHTS RESERVED.</div> */}
    </div>
  );
}
