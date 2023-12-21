import React from "react";

import { LoginPageStyled } from "../login-page/style";
import OtpVerification from "../../components/otp-verification";

const OtpValidationPage: React.FC = () => {
  return (
    <>
      <LoginPageStyled>
        <div className="main-container" style={{ height: "100vh" }}>
          <div
            className="left-container img_container"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702562135/nnau7bfmuktzsxteycpa.jpg)`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "100vh",
              transform: "translate3d(0px, 0px, 0px)",
            }}
          ></div>
          <div className="right-container">
            <h2
              style={{
                fontWeight: "500",
                fontFamily: " 'Dancing Script', cursive",
                fontSize: "80px",
              }}
              className="mb-5 mt-5 invisible"
            >
              Awaken <br />
            </h2>

            <div className="right-sub-container ">
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
