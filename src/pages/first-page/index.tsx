import { Card } from "antd";
import React, { useState } from "react";

import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Player, ControlBar } from "video-react";
import "video-react/dist/video-react.css";
import WelcomeComponent from "../../components/welcome";
import DiscoveryComponent from "../../components/discovery-component";
import HabitsComponent from "../../components/habits-component";
import BlocksComponent from "../../components/blocks-component";
import ValuesComponent from "../../components/values-component";
import SpiritualityComponent from "../../components/spirituality-component";
import ReviewComponent from "../../components/review-component";
import ConclusionComponent from "../../components/conclusion-component";
import { useNavigate } from "react-router-dom";
const modulesArray = [
  "Discovery",
  "Habits",
  "Blocks",
  "Values",
  "Spirituality",
  "Review",
  "Conclusion",
];




interface VideoPlayerProps {
  src: string;
  poster: string;
}



const moduleComponentsArray = [
  WelcomeComponent,
  DiscoveryComponent,
  HabitsComponent,
  BlocksComponent,
  ValuesComponent,
  SpiritualityComponent,
  ReviewComponent,
  ConclusionComponent,
];

const FirstPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  //eslint-disable-next-line
  const [forceUpdate, setForceUpdate] = useState(false); // Define the forceUpdate state variable
  const storedUserName = localStorage.getItem("awaken-user-name");
  const navigate = useNavigate();
  const handleLogOut = ()=>{
localStorage.removeItem("awaken-accessToken")
localStorage.removeItem("awaken-isLoggedIn")
localStorage.removeItem("awaken-user-name")
navigate("/")
  }


  const sideBarTabs = [
    <a href="/">Introduction</a>,
    <a style={{color:"black"}} href="/account">Settings</a>,
  <p onClick={handleLogOut} style={{color:"black"}} >Logout</p>,
   
  
  ];

 

  // Callback function to update completion status in the parent component
  const handleCompletionChange = (moduleName: string, newStatus: boolean) => {
    // Update the completion status in the parent component's state or perform any necessary actions
    // For now, we'll just force a re-render by updating a dummy state variable
    setForceUpdate((prev: boolean) => !prev);
  };

  const renderComponent = (
    onCompletionChange: (moduleName: string, newStatus: boolean) => void,
    handleNextClick: () => void,
    handlePrevClick: () => void
  ) => {
    const ComponentToRender = moduleComponentsArray[activeIndex];
    return (
      <ComponentToRender
        onCompletionChange={onCompletionChange}
        onNextClick={handleNextClick}
        onPrevClick={handlePrevClick}
      />
    );
  };
  const isModuleCompleted = (moduleName: string) => {
    const completedStatus = sessionStorage.getItem(
      `${moduleName}-completedStatus`
    );
    return completedStatus === "true";
  };

  const handleNextClick = () => {
    // Implement the logic to update the activeIndex in the parent component
    // For now, I'll just increment the activeIndex as an example
    if (activeIndex < 7) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    // Implement the logic to update the activeIndex in the parent component
    // For now, I'll just increment the activeIndex as an example
    if (activeIndex > 1) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <>
      <div
        style={{ height: "100vh", background: "#f8f8f8" }}
        className="container-fluid  "
      >
        <div className="row">
          <div
            style={{ height: "100vh", fontFamily: "'DM Serif Display', serif" }}
            className="col-md-3 col-lg-2 bg-light sidebar"
          >
            {/* Sidebar Content */}
            <div className="py-3 px-2 text-left">
              <h2
                style={{
                  fontWeight: "500",
                  fontFamily: " 'Dancing Script', cursive",
                  fontSize: "50px",
                }}
                className="mb-3 "
              >
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
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                }}
                className="container-fluid"
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "rgba(0, 0, 0, 0.3)" /* Adjust the opacity as needed */,
                  }}
                ></div>
                <h2
                  style={{
                    fontWeight: "500",
                    fontFamily: " 'Dancing Script', cursive",
                    fontSize: "80px",
                    zIndex: "1",
                  }}
                  className="mb-3 "
                >
                  Mid Life Evolution
                </h2>
              </div>
              <div className="p-2 text-left">
                <h3
                  className="mt-2"
                  style={{
                    color: "black",
                    fontFamily: "'DM Serif Display', serif",
                  }}
                >
                  Welcome {storedUserName}
                </h3>
              </div>
              {/* Add your header content here */}
            </header>
            <div className="row ">
              <div
                className="col-8 pt-1 pr-0  mt-2 scrollable-container"
                style={{ height: "70vh", overflowY: "scroll" }}
              >
                {renderComponent(
                  handleCompletionChange,
                  handleNextClick,
                  handlePrevClick
                )}
              </div>
              <div className="col-md-3 col-lg-4  mt-2  ">
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
                    style={{ height: "60vh", overflowY: "scroll" }}
                    className="scrollable-container"
                  >
                    {modulesArray.map((module, index) => {
                      const isCompleted = isModuleCompleted(module);
                      return (
                        <Card
                          key={index}
                          onClick={() => setActiveIndex(index + 1)}
                          className={`m-2 hover-card ${
                            activeIndex === index + 1 ? "active" : ""
                          }`}
                        >
                          <div className="card-container">
                            {isCompleted ? (
                              <h3>
                                <strong>
                                  {" "}
                                  <CheckCircleOutlined
                                    className="check-tick"
                                    style={{
                                      fontWeight: "bold",
                                      marginRight: "10px",
                                    }}
                                  />
                                </strong>
                              </h3>
                            ) : (
                              <h3>
                                <strong>
                                  {" "}
                                  <CheckCircleOutlined
                                    className="check-tick invisible"
                                    style={{
                                      fontWeight: "bold",
                                      marginRight: "10px",
                                    }}
                                  />
                                </strong>
                              </h3>
                            )}
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

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  return (
    <div style={{ width: "100%", height: "80%" }}>
      <Player src={src} poster={poster}>
        <ControlBar autoHide={false} />
      </Player>
    </div>
  );
};