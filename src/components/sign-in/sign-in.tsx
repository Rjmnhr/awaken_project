import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";

import AxiosInstance from "../axios";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const handleSwitch = () => {
    navigate("/create-account");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await AxiosInstance.post("/api/user/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.data;

      setIsLoading(false);

      if (data === 404) {
        error("Wrong password or username");

        const inputWrapper = document.querySelector(
          ".ant-input-affix-wrapper"
        ) as HTMLElement | null;
        const emailInput = document.querySelector(
          "#email-login"
        ) as HTMLElement | null;

        if (inputWrapper && emailInput) {
          inputWrapper.style.border = "1px solid red";
          emailInput.style.border = "1px solid red";
        }

        return;
      }
      success();

      const accessToken = data.accessToken;

      const userName = data.first_name;
      const userEmail = data.email;
      localStorage.setItem("awaken-isLoggedIn", "true");
      localStorage.setItem("awaken-user-name", userName);
      localStorage.setItem("awaken-user-email", userEmail);

      localStorage.setItem("awaken-accessToken", accessToken);

      setEmail("");
      setPassword("");
      navigate("/library");
    } catch (err) {
      alert("error");
      console.log(err);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Login successfully",
    });
  };

  const error = (data: string) => {
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
        error("Check your internet connection");
      }, 15000);
    }
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, [isLoading]);

  return (
    <div className="container ">
      {contextHolder}
      <div className="container card col-12  p-3" data-aos="fade-left">
        <div className="section-title">
          <h3>Login to Awaken </h3>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12">
            <form className="php-email-form" onSubmit={handleSubmit}>
              <div className="col form-group">
                <Input
                  style={{ borderRadius: "0", height: "50px" }}
                  type="email"
                  name="email"
                  id="email-login"
                  placeholder="Email"
                  data-rule="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="validate"></div>
              </div>
              <div className="mb-3 col-12 col-lg-12">
                <Input.Password
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="text-start"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-end mb-4 pr-3">
                <a className="form-label-link" href="/forgot-password">
                  Forgot Password?
                </a>
              </div>

              <div className="text-center">
                <button
                  className="btn btn-primary  mb-3"
                  type="submit"
                  style={{ width: "92%", height: "50px" }}
                >
                  {isLoading ? <LoadingOutlined /> : "Log in"}
                </button>
                <p className="card-text text-muted">
                  Don't have an account yet?
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={handleSwitch}
                  >
                    {" "}
                    Sign up here
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
