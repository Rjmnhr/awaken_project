import React from "react";

import { LoginPageStyled } from "../login-page/style";
import OtpVerification from "../../components/otp-verification";
import bgImg from "../../images/pexels-irina-iriser-1405691.jpg";
import { Steps } from "antd";
const items = [
  {
    title: "Details",
  },
  {
    title: "Verification",
  },
  {
    title: "Payment",
  },
];
const OtpValidationPage: React.FC = () => {
  return (
    <>
      <LoginPageStyled>
        <div className="main-container" style={{ height: "100vh" }}>
          <div
            className="left-container img_container"
            style={{
              backgroundImage: `url(${bgImg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "100vh",
              transform: "translate3d(0px, 0px, 0px)",
            }}
          ></div>
          <div className="right-container">
            <Steps
              className="col-lg-12 col-12  mb-5 "
              current={1}
              size="small"
              items={items}
            />
            <div className="right-sub-container mt-5 ">
              <div>
                <OtpVerification />
              </div>
            </div>
          </div>
        </div>
      </LoginPageStyled>
    </>
  );
};

export default OtpValidationPage;
