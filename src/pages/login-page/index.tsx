import React from "react";
import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";
import { useApplicationContext } from "../../context/app-context";

import { LoginPageStyled } from "./style";

const LoginPage: React.FC = () => {
  const { isSignIn } = useApplicationContext();

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
                fontFamily: "'Marmelad', sans-serif",
                fontSize: "80px",
              }}
              className="mb-5 mt-5 "
            >
              Awaken <br />
            </h2>

            <div className="right-sub-container ">
              <div>{isSignIn ? <SignIn /> : <SignUp />}</div>
            </div>
          </div>
        </div>
      </LoginPageStyled>
    </>
  );
};

export default LoginPage;
