import { Card } from "antd";
import React from "react";
import welcomeVideo from "../../videos/welcome-video.mp4";
import { ArrowRightOutlined, SearchOutlined } from "@ant-design/icons";
import { Player, ControlBar } from "video-react";
import "video-react/dist/video-react.css";
const modulesArray = [
  "Discovery",
  "Habits",
  "Blocks",
  "Values",
  "Spirituality",
  "Review",
  "Conclusion",
];

const sideBarTabs = [
  "Introduction",
  "Settings",
  "Products",
  "Emails",
  "Offers",
];
interface VideoPlayerProps {
  src: string;
  poster: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  return (
    <div style={{ width: "100%", height: "80%" }}>
      <Player src={src} poster={poster}>
        <ControlBar autoHide={false} />
      </Player>
    </div>
  );
};

const FirstPage: React.FC = () => {
  return (
    <>
      <div
        style={{ height: "97vh", background: "#f8f8f8" }}
        className="container-fluid  "
      >
        <div className="row">
          <div
            style={{ height: "97vh" }}
            className="col-md-3 col-lg-2 bg-light sidebar"
          >
            {/* Sidebar Content */}
            <div className="py-3 px-2 text-left">
              <h2 style={{ fontWeight: "500" }} className="mb-3 ">
                Awaken
              </h2>
              {sideBarTabs.map((tab) => {
                return (
                  <p
                    style={{ fontWeight: "500" }}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>{tab}</span>
                    <span>
                      <ArrowRightOutlined />
                    </span>
                  </p>
                );
              })}
            </div>
            {/* Add your sidebar content here */}
          </div>

          <div className="col-md-9 p-0 col-lg-10">
            <header
              className="bg-primary text-white p-0"
              style={{ height: "30%" }}
            >
              <div
                style={{
                  height: "70%",
                  background:
                    "url(https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702562135/nnau7bfmuktzsxteycpa.jpg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="container-fluid"
              ></div>
              <div className="p-2 text-left">
                <h3 style={{ color: "black" }}>Welcome Back</h3>
              </div>
              {/* Add your header content here */}
            </header>
            <div className="row ">
              <div className="col-8 pt-1 pr-0 ">
                <div
                  style={{ height: "67vh", overflowY: "scroll" }}
                  className="scrollable-container"
                >
                  <div className="p-3 mb-3 ">
                    <div
                      style={{
                        display: "grid",
                        justifyItems: "center",
                        alignContent: "center",
                      }}
                    >
                      <VideoPlayer
                        src={welcomeVideo}
                        poster={
                          "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702563224/cymfgrw5mkkavedstduo.png"
                        }
                      />
                    </div>
                  </div>

                  <footer className="bg-dark text-white p-3 mt-3">
                    <h2>Footer</h2>
                  </footer>
                </div>
              </div>
              <div className="col-md-3 col-lg-4   ">
                <div className="p-2">
                  <div className="row m-2 p-1 ">
                    <SearchOutlined className="pr-2" />
                    <input
                      style={{
                        outline: "none",
                        border: "none",
                        background: "transparent",
                      }}
                      type="text"
                      placeholder="Search for something.."
                    />
                  </div>
                  <div
                    style={{ height: "58vh", overflowY: "scroll" }}
                    className="scrollable-container"
                  >
                    {modulesArray.map((module) => {
                      return (
                        <Card className="m-2">
                          <div className="card-container">
                            <img
                              src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702538163/lv2yeybods4qfa1ko7lb.png"
                              alt="circle"
                            />
                            <h3>{module}</h3>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstPage;
