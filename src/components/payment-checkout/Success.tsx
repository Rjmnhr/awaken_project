import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "../axios";
import successTick from "../../images/check-soft-bg.svg";
import preLoader from "../../images/Settings.gif";

const Success: React.FC = () => {
  //eslint-disable-next-line
  const [session, setSession] = useState({});
  const [isProfileCreated, setProfileCreated] = useState(false);
  //eslint-disable-next-line
  const [seconds, setSeconds] = useState(5);
  const location = useLocation();
  const sessionId = location.search.replace("?session_id=", "");
  const email: string | null = sessionStorage.getItem("email") || "";
  const first_name: string | null = sessionStorage.getItem("first_name") || "";
  const last_name: string | null = sessionStorage.getItem("last_name") || "";
  const password: string | null = sessionStorage.getItem("password") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [sessionId]);

  useEffect(() => {
    async function fetchSession() {
      await AxiosInstance.get("/checkout-session?sessionId=" + sessionId).then(
        async (res) => {
          const response = await res.data;
          setSession(response);

          const status = response.payment_status;

          if (status === "paid") {
            CreateProfile();
          }
        }
      );
    }

    if (sessionId) {
      fetchSession();
    }

    //eslint-disable-next-line
  }, [sessionId]);
  const clearSessionStorage = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("first_name");
    sessionStorage.removeItem("last_name");
    sessionStorage.removeItem("password");
  };
  const CreateProfile = async () => {
    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      await AxiosInstance.post("/api/user/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setProfileCreated(true);
      clearSessionStorage();
    } catch (err: any) {
      if (err.isAxiosError) {
        console.log(err.response);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (isProfileCreated) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          clearInterval(countdown);
          navigate("/");
        }
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [seconds, navigate, isProfileCreated]);
  return (
    <>
      {sessionId ? (
        <div
          className="sr-root"
          style={{
            display: "grid",
            justifyItems: "center",
            height: "100vh",
            alignContent: "center",
          }}
        >
          {/* <div className="sr-section completed-view">
      <div className="sr-callout">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div> */}

          <div className="sr-content p-3 col-12 col-lg-8">
            <div>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                <h1>Payment Successful!</h1>
                <img
                  style={{ marginLeft: "10px" }}
                  src={successTick}
                  alt=""
                  width={50}
                  height={50}
                />{" "}
              </div>
              {isProfileCreated ? (
                <>
                  {" "}
                  <h1>Your Account is ready </h1>{" "}
                  <h3>You can now login now with your credentials</h3>
                  <p>
                    You will be redirecting automatically in {seconds} seconds
                  </p>{" "}
                  or <a href="/">Click here</a>{" "}
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                  <h1>Your Account is getting ready </h1>
                  <img
                    style={{ marginLeft: "10px" }}
                    src={preLoader}
                    alt=""
                    width={50}
                    height={50}
                  />{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Success;
