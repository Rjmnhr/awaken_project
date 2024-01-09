import React from "react";
import { useNavigate } from "react-router-dom";
import headerImg from "../../images/top-header-photo.jpg";
import Footer from "../../components/footer";

const LibraryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("awaken-accessToken");
    localStorage.removeItem("awaken-isLoggedIn");
    localStorage.removeItem("awaken-user-name");
    navigate("/");
  };
  return (
    <>
      <nav>
        <div className="d-flex justify-content-between align-items-center container p-3">
          <h2
            style={{
              fontWeight: "500",
              fontFamily: "Marmelad",
            }}
          >
            Awaken
          </h2>

          <div className="nav-list d-flex justify-content-center align-items-center">
            <a className="mr-3" href="/library">
              Library
            </a>
            {/* <a className="mr-3" href="/account">
              Settings
            </a> */}
            <a href="/" onClick={handleLogOut}>
              Logout
            </a>
          </div>
        </div>
      </nav>
      <div className="container-fluid bg-light" style={{ minHeight: "75vh" }}>
        <div className="pt-3 container text-left">
          <div style={{ borderBottom: "2px solid gray" }}>
            <h1 className="mb-3">Your Library</h1>
          </div>

          <div className="products-card-container mt-3">
            <div
              style={{
                width: "320px",
                boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.5)",
              }}
              className="product-card "
            >
              <div className="image-container" style={{ position: "relative" }}>
                <img
                  style={{ width: "100%" }}
                  src={headerImg}
                  alt="Mid Life Journey"
                />
                <div
                  className="overlay-text  w-100 text-center "
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    color: "white",
                  }}
                >
                  <div
                    className="w-100 "
                    style={{
                      height: "5px",
                      backgroundColor: "rgba(71, 209, 195, 0.6)",
                    }}
                  ></div>
                  <h2
                    className="w-100 mt-1 mb-1"
                    style={{ backgroundColor: "rgba(71, 209, 195, 0.6)" }}
                  >
                    Awaken
                  </h2>
                  <div
                    style={{
                      height: "5px",
                      backgroundColor: "rgba(71, 209, 195, 0.6)",
                    }}
                  ></div>
                </div>
              </div>
              <div className="content p-3">
                <p style={{ fontSize: "18px" }}>
                  Online coaching tool for midlifers{" "}
                </p>

                <button
                  onClick={() => navigate("/mid-life-journey")}
                  className="btn btn-primary"
                >
                  View Product
                </button>
              </div>

              <div></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LibraryPage;
