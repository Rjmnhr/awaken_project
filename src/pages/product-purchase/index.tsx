import React from "react";
import SignUp from "../../components/sign-up/sign-up";
import { Steps } from "antd";
import { LoginPageStyled } from "../login-page/style";
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
const ProductPurchasePage = () => {
  return (
    <div className="">
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
                fontFamily: "'Marmelad', sans-serif",
                fontSize: "80px",
              }}
              className="mb-5 mt-5 "
            >
              Awaken <br />
            </h2>
            <Steps
              className="col-lg-8 col-12"
              current={0}
              size="small"
              items={items}
            />
            <div className="right-sub-container ">
              <div>
                <SignUp />
              </div>
            </div>
          </div>
        </div>
      </LoginPageStyled>
    </div>
  );
};

export default ProductPurchasePage;
