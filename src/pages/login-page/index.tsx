import React from "react";
import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";
import { useApplicationContext } from "../../context/app-context";
import bgImg from "../../images/pexels-irina-iriser-1405691.jpg";
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
              backgroundImage: `url(${bgImg})`,
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
