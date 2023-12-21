import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApplicationContext } from "../../context/app-context";
import AxiosInstance from "../axios";
import { Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserExists, setIsUserExists] = useState<boolean>(false);


  const { setIsSignIn } = useApplicationContext();
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Passwords do not match",
    });
  };

  const handleSwitch = () => {
    setIsSignIn(true);
  };

  const checkForExistingUser = async () => {
    try {
      const res = await AxiosInstance.post("/api/user/check", { email: email });
      const response = res.data;

      return response;
    } catch (err) {
      console.log(err);
      // Handle the error here or return an error response if needed
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validate = await checkForExistingUser();

    if (validate.exists) {
      setIsUserExists(true);
      setIsLoading(false);
      return;
    }

    if (confirmPassword !== password) {
      error();
      return;
    }

    const lowerCasedEmail = email.toLowerCase();
    console.log(lowerCasedEmail);

    AxiosInstance.post("/api/otp/send-otp", {
      email: lowerCasedEmail,
    })
      .then(async (response: any) => {
        const data: any = response.data;
        // Handle successful OTP request
        console.log(data);
        sessionStorage.setItem("email", lowerCasedEmail);
        sessionStorage.setItem("first_name", firstName);
        sessionStorage.setItem("last_name", lastName);
        sessionStorage.setItem("password", password);
      
        setIsLoading(false);
        navigate("/otp-validation");
      })
      .catch((err: string) => {
        console.log(err);
        // Handle the error here
      });

    }

  useEffect(() => {
    if (password && confirmPassword)
      if (password === confirmPassword) {
        setIsPasswordSame(true);
      } else {
        setIsPasswordSame(false);
      }
    // eslint-disable-next-line
  }, [password, confirmPassword]);

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "grid",
          placeItems: "center",
         
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {contextHolder}
        <div className="container card col-12  p-3" data-aos="fade-left">
          <div className="section-title">
            <h3>Create your account</h3>
          </div>

          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12">
              <form className="php-email-form" onSubmit={handleSubmit}>
                <div className="d-flex">
                  <div className="col-6 form-group">
                    <input
                       style={{height:"50px"}}
                      required
                      type="text"
                      name="first Name"
                      className="form-control"
                      id="name"
                      placeholder="First name"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <div className="validate"></div>
                  </div>
                  <div className="col-6 form-group">
                    <input
                       style={{height:"50px"}}
                      required
                      type="text"
                      className="form-control"
                      name="last name"
                      id="last name"
                      placeholder="Last name"
                      data-rule="last name"
                      data-msg="Please enter a valid last name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <div className="validate"></div>
                  </div>
                </div>
             
                <div className="col form-group">
                  <input
                  style={{height:"50px"}}
                    required
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    data-rule="email"
                    data-msg="Please enter a valid email"
                    onChange={(e) => setEmail(e.target.value)}
                  />{" "}
                  {isUserExists ? (
                    <p className="mt-2" style={{ color: "red", fontSize: "12px" }}>
                      {" "}
                      User already exists
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3 col-12 col-lg-12">
                  <Input.Password
                    required
                    placeholder=" Password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    className="border text-start"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-12 col-lg-12">
                  <Input.Password
                    required
                    placeholder="Confirm password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    className="border text-start"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {isPasswordSame === false ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      margin: "0",
                      paddingLeft: "15px",
                    }}
                  >
                    Password does not match the confirm password.
                  </p>
                ) : (
                  ""
                )}

                <div className="text-center">
                  <button className="btn btn-primary  mb-3" style={{width:"92%",height:"50px"}} type="submit">
                    {isLoading ? <LoadingOutlined /> : "Create an account"}
                  </button>
                  <p className="card-text text-muted">
                    Remember your password?
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={handleSwitch}
                    >
                      {" "}
                      Log in
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
