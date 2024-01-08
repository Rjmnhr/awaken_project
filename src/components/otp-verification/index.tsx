import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { OtpVerificationPageStyled } from "./style";
import AxiosInstance from "../axios";
import { LoadingOutlined } from "@ant-design/icons";

import { AxiosError, AxiosResponse } from "axios";

interface OtpVerificationProps {}

const OtpVerification: React.FC<OtpVerificationProps> = () => {
  const [warning, setWarning] = useState<string>("");
  const [otpPin, setOtpPin] = useState<string[]>(Array(6).fill(""));
  const navigate = useNavigate();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const email: string | null = sessionStorage.getItem("email") || "";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;

    if (/^\d?$/.test(input)) {
      const updatedOtpPin = [...otpPin];
      updatedOtpPin[index] = input;

      if (input && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
      setOtpPin(updatedOtpPin);
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && otpPin[index] === "") {
      const updatedOtpPin = [...otpPin];
      updatedOtpPin[index - 1] = "";

      setOtpPin(updatedOtpPin);

      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (
      event.key === "ArrowRight" &&
      index < 5 &&
      otpPin[index] !== ""
    ) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const joinedOtpPin = otpPin.join("");

    AxiosInstance.post("/api/otp/verify-otp", {
      email: email,
      otp: joinedOtpPin,
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
              {otpPin.map((otp, index) => (
                <input
                  style={{
                    width: "20px",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid black",
                    outline: "none",
                  }}
                  key={index}
                  type="number"
                  id={`otp-${index}`}
                  ref={(ref) => ref && (inputRefs.current[index] = ref)}
                  value={otp}
                  onChange={(event) => handleInputChange(index, event)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  maxLength={1}
                />
              ))}

              <p style={{ color: "red" }}>{warning}</p>
              <br />

              {otpPin.length > 5 ? (
                <button className="btn btn-primary btn-lg" type="submit">
                  {isLoading ? <LoadingOutlined /> : "Verify"}
                </button>
              ) : (
                <button
                  disabled
                  className="btn btn-primary btn-lg"
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
