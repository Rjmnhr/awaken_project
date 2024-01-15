import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { OtpVerificationPageStyled } from "./style";
import AxiosInstance from "../axios";
import { LoadingOutlined } from "@ant-design/icons";

import { AxiosError, AxiosResponse } from "axios";

interface OtpVerificationProps {}

const OtpVerification: React.FC<OtpVerificationProps> = () => {
  const [warning, setWarning] = useState<string>("");
  const [otpPin, setOtpPin] = useState<string>("");
  const navigate = useNavigate();

  const email: string | null = sessionStorage.getItem("email") || "";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (/^\d{0,6}$/.test(input)) {
      setOtpPin(input);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    AxiosInstance.post("/api/otp/verify-otp", {
      email: email,
      otp: otpPin,
    })
      .then(async (response: AxiosResponse) => {
        setIsLoading(false);

        if (response.status !== 200) {
          alert("something wrong");
          return;
        }

        navigate("/payment-checkout");
      })
      .catch((err: AxiosError) => {
        setIsLoading(false);
        setWarning("Invalid OTP");
        console.log(err);
      });
  };

  return (
    <OtpVerificationPageStyled>
      <div
        style={{
          transition: "all 0.3s ease",
        }}
        className="overflow-hidden"
      >
        <div
          style={{ display: "grid", placeItems: "center" }}
          className="container col-12 text-left"
        >
          <div className="col-lg-12 col-12">
            <div>
              <div>
                <h3>Enter Verification Code</h3>
              </div>
              <p style={{ width: "80%" }}>
                Please type in the <span>6-digit code</span>
                sent to your email. If it does not appear in your Inbox, please
                check your Updates, Quarantined or Spam folders.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                className="p-1"
                placeholder="OTP"
                type="text"
                id="otp"
                value={otpPin}
                onChange={handleChange}
                maxLength={6}
              />
              <p style={{ color: "red" }}>{warning}</p>
              <br />

              {otpPin.length > 5 ? (
                <button className="btn btn-primary " type="submit">
                  {isLoading ? <LoadingOutlined /> : "Verify"}
                </button>
              ) : (
                <button
                  disabled
                  className="btn btn-primary "
                  type="submit"
                >
                  {isLoading ? <LoadingOutlined /> : "Verify"}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </OtpVerificationPageStyled>
  );
};

export default OtpVerification;
