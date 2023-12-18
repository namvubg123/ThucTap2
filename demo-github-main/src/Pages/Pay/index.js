import React from "react";
import { ScanOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMoneyBill1Wave,
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "./pay.css";

const qr = require("../../asset/QR.jpg");
export default function Pay() {
  return (
    <div className="form-pay">
      <Row gutter={16} className="container-pay">
        <Col className="gutter-row" span={10}>
          <div className="content-form-pay">
            <div className="item-form-pay">
              <h4>
                {" "}
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Số điện thoại hỗ trợ:
              </h4>
              <span className="ml-6 text-lg font-normal">0342 616 807</span>
            </div>
            <div className="item-form-pay">
              <h4>
                <FontAwesomeIcon icon={faMoneyBill1Wave} className="mr-2" />
                Số tiền:
              </h4>
              <span className="ml-6 text-lg font-normal">20.000</span>
            </div>
            <div className="item-form-pay">
              <h4>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="mr-2 text-yellow-300"
                />
                Lưu ý
              </h4>
              <span className="font-normal">
                Bạn cần nạp tiền để bài viết hiển thị.<br></br>Bài viết của bạn
                sẽ được hiển thị trong 30 ngày kể từ ngày đăng
              </span>
            </div>
            {/* <div className='item-form-pay'>
                            <h4><FontAwesomeIcon icon={faArrowLeft} className='mr-2' />Quay lại</h4>
                        </div> */}
          </div>
        </Col>
        <Col className="gutter-row" span={14}>
          <div className="container-qr">
            <div className="img-qr">
              <h4>Quét mã để thanh toán</h4>
              <img src={qr} className="max-h-64 pt-5" />
            </div>
            <div className="content-qr">
              <p>
                <ScanOutlined className="mr-2" />
                Sử dụng App <strong>MoMo</strong>
                <br></br>hoặc ứng dụng Camera hỗ trợ QR code để quét mã
              </p>
              <p className="pt-3">
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                Đang chờ bạn quét mã...
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
