import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Rate, Carousel } from "antd";
import "./banner.css";

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

function Banner(props) {
  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };
  return (
    <>
      <Carousel afterChange={onChange} autoplay autoplaySpeed={3000}>
        <div>
          <div className="banner">
            <div className="overlay"></div>
            <div className="header">
              <h1 className="header-name">
                House in Financial District
                <FontAwesomeIcon icon={faCheck} style={{ marginLeft: "8px" }} />
              </h1>
              <div className="header-address">
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="ml-2 text-white mr-2 address">
                  70 Bright St New York, USA
                </span>
                <div className="rate-header">
                  <Rate disabled value={4} />
                  <span className="rate-text">{desc[4 - 1]}</span>
                </div>
              </div>
              <div className="prices-date">
                <div className="prices">
                  Price: $ <span>50.500</span>
                </div>
                <div className="date">Date: 20.05.2020</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="banner">
            <div className="overlay"></div>
            <div className="header">
              <h1 className="header-name">
                House in Financial District
                <FontAwesomeIcon icon={faCheck} style={{ marginLeft: "8px" }} />
              </h1>
              <div className="header-address">
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="ml-2 text-white mr-2 address">
                  70 Bright St New York, USA
                </span>
                <div className="rate-header">
                  <Rate disabled value={4} />
                  <span className="rate-text">{desc[4 - 1]}</span>
                </div>
              </div>
              <div className="prices-date">
                <div className="prices">
                  Price: $ <span>50.500</span>
                </div>
                <div className="date">Date: 20.05.2020</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="banner">
            <div className="overlay"></div>
            <div className="header">
              <h1 className="header-name">
                House in Financial District
                <FontAwesomeIcon icon={faCheck} style={{ marginLeft: "8px" }} />
              </h1>
              <div className="header-address">
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="ml-2 text-white mr-2 address">
                  70 Bright St New York, USA
                </span>
                <div className="rate-header">
                  <Rate disabled value={4} />
                  <span className="rate-text">{desc[4 - 1]}</span>
                </div>
              </div>
              <div className="prices-date">
                <div className="prices">
                  Price: $ <span>50.500</span>
                </div>
                <div className="date">Date: 20.05.2020</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="banner">
            <div className="overlay"></div>
            <div className="header">
              <h1 className="header-name">
                House in Financial District
                <FontAwesomeIcon icon={faCheck} style={{ marginLeft: "8px" }} />
              </h1>
              <div className="header-address">
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="ml-2 text-white mr-2 address">
                  70 Bright St New York, USA
                </span>
                <div className="rate-header">
                  <Rate disabled value={4} />
                  <span className="rate-text">{desc[4 - 1]}</span>
                </div>
              </div>
              <div className="prices-date">
                <div className="prices">
                  Price: $ <span>50.500</span>
                </div>
                <div className="date">Date: 20.05.2020</div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  );
}

export default Banner;
