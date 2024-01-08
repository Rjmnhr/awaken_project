import { Card, notification, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import workBookImg from "../../images/workbook-button.jpg";
import resourcesImg from "../../images/resource-button.jpg";
import facebookCommunityImg from "../../images/fb-button.jpg";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { ArrowLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import "video-react/dist/video-react.css";
import WelcomeComponent from "../../components/welcome";
import DiscoveryComponent from "../../components/discovery-component";
import HabitsComponent from "../../components/habits-component";
import BlocksComponent from "../../components/blocks-component";
import ValuesComponent from "../../components/values-component";
import SpiritualityComponent from "../../components/spirituality-component";
import ReviewComponent from "../../components/review-component";
import ConclusionComponent from "../../components/conclusion-component";
import videoPosterImg from "../../images/Awaken-video.png";
import pdfPathWorkbook from "../../components/download-pdf/awaken-workbook.pdf"; // Update with the correct path
import pdfPathResources from "../../components/download-pdf/awaken-resources.pdf"; // Update with the correct path
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const { Panel } = Collapse;
const modulesArray = [
  {
    title: "Discovery",
    videos: ["Video 1"],
  },
  {
    title: "Habits",
    videos: ["Video 1", "Video 2", "Video 3"],
  },
  {
    title: "Blocks",
    videos: [
      "Video 1",
      "Video 2",
      "Video 3",
      "Video 4",
      "Video 5",
      "Video 6",
      "Video 7",
    ],
  },
  {
    title: "Values",
    videos: ["Video 1", "Video 2", "Video 3", "Video 4", "Video 5"],
  },
  {
    title: "Spirituality",
    videos: ["Video 1", "Video 2", "Video 3", "Video 4", "Video 5"],
  },
  {
    title: "Review",
    videos: ["Video 1"],
  },
  {
    title: "Conclusion",
    videos: ["Video 1"],
  },
];
interface RightSidebarItem {
  title: string;
  url: string;
  action?: () => void; // Function to execute when clicked
}

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
  const navigate = useNavigate();

  //eslint-disable-next-line
  const [forceUpdate, setForceUpdate] = useState(false); // Define the forceUpdate state variable
  const storedUserName = localStorage.getItem("awaken-user-name");
  // const navigate = useNavigate();
  // const handleLogOut = () => {
  //   localStorage.removeItem("awaken-accessToken");
  //   localStorage.removeItem("awaken-isLoggedIn");
  //   localStorage.removeItem("awaken-user-name");
  //   navigate("/");
  // };

  const [api, contextHolder] = notification.useNotification();

  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  const openNotification = (fileName: string) => {
    let content =
      fileName === "awaken-workbook.pdf"
        ? "Awaken Work Book"
        : "Awaken Resource";
    api.info({
      message: `Your ${content} PDF is getting downloaded`,
    });
  };

  // Define the downloadPdf function outside the component
  const downloadPdf = (pdfPath: string, fileName: string) => {
    openNotification(fileName);
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = fileName;
    link.click();
  };
  // const sideBarTabs = [
  //   <a href="/mid-life-journey">Introduction</a>,
  //   <a style={{ color: "black" }} href="/account">
  //     Settings
  //   </a>,
  //   <p onClick={handleLogOut} style={{ color: "black" }}>
  //     Logout
  //   </p>,
  // ];

  const rightSidebarArray: RightSidebarItem[] = [
    {
      title: "work book",
      url: workBookImg,
      action: () => downloadPdf(pdfPathWorkbook, "awaken-workbook.pdf"),
    },
    {
      title: "facebook community",
      url: facebookCommunityImg,
      action: () => window.open("https://www.facebook.com", "_blank"),
    },
    {
      title: "resources",
      url: resourcesImg,
      action: () => downloadPdf(pdfPathResources, "resources.pdf"),
    },
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
  const isModuleCompleted = (moduleName: string, number: number) => {
    const completedStatus = sessionStorage.getItem(
      `${moduleName}-completedStatus-${number + 1}`
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
      {contextHolder}
      <div
        style={{ height: "100vh", background: "#f8f8f8" }}
        className="container-fluid  "
      >
        <div className="row flex-column-reverse flex-md-row">
          <div
            style={{
              height: `${isMobile ? "100%" : "100vh"}`,
              fontWeight: "bold",
              overflowY: "scroll",
              alignContent: "space-between",
              display: "grid",
            }}
            className="col-md-3 col-lg-2 bg-light  sidebar scrollable-container"
          >
            {/* Sidebar Content */}
            <div className="py-3 px-2 text-left ">
              <p
                onClick={() => navigate("/library")}
                style={{ cursor: "pointer" }}
              >
                <ArrowLeftOutlined className="mr-2" /> Library
              </p>

              <h4
                className={`hover-card ${activeIndex === 0 ? "active" : ""}`}
                onClick={() => {
                  setActiveIndex(0);
                  navigate("/mid-life-journey");
                }}
              >
                Introduction
              </h4>
              <Collapse ghost expandIconPosition="right">
                {modulesArray.map((module, index) => {
                  return (
                    <Panel
                      key={index}
                      header={
                        <div
                          className={`my-2 hover-card text-left ${
                            activeIndex === index + 1 ? "active" : ""
                          }`}
                        >
                          <div className="card-container">
                            <h4 className="m-0">{module.title}</h4>
                          </div>
                        </div>
                      }
                    >
                      {module.videos.map((video, videoIndex) => {
                        const isCompleted = isModuleCompleted(
                          module.title,
                          videoIndex
                        );
                        return (
                          <div
                            className="d-flex align-items-center "
                            key={videoIndex}
                          >
                            <a
                              href={`#${video}`}
                              style={{
                                cursor: "pointer",
                                color: "black",
                                fontSize: "18px",
                              }}
                              className="pl-0 m-1 "
                              onClick={() => setActiveIndex(index + 1)}
                            >
                              <CaretRightOutlined className="mr-1 " />
                              {video}
                            </a>
                            {isCompleted ? (
                              <p className="m-0">
                                {" "}
                                <TaskAltIcon
                                  className="check-tick text-primary"
                                  style={{
                                    fontSize: "18px",
                                    marginLeft: "8px",
                                  }}
                                />
                              </p>
                            ) : (
                              ""
                            )}
                            <br />
                          </div>
                        );
                      })}
                    </Panel>
                  );
                })}
              </Collapse>
            </div>
            <div style={{ fontSize: "11px" }} className="text-left">
              <p>Video courtesy:</p>

              <p>
                {" "}
                Video by Ruvim Miksanskiy: {""}
                <a href="https://www.pexels.com/video/video-of-forest-1448735/">
                  https://www.pexels.com/video/video-of-forest-1448735/
                </a>
              </p>
              <p>
                Video by Kelly :
                <a href=" https://www.pexels.com/video/a-big-cascading-waterfall-2253462/">
                  {" "}
                  https://www.pexels.com/video/a-big-cascading-waterfall-2253462/
                </a>
              </p>
              <p>
                {" "}
                Video by Peter Fowler:
                <a href=" https://www.pexels.com/video/ocean-waves-video-1093652/">
                  {" "}
                  https://www.pexels.com/video/ocean-waves-video-1093652/
                </a>
              </p>
              <p>
                Video by Alex Fu:
                <a href=" https://www.pexels.com/video/timelapse-of-night-sky-over-lake-3493603/">
                  {" "}
                  https://www.pexels.com/video/timelapse-of-night-sky-over-lake-3493603/
                </a>
              </p>
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
                    fontFamily: "'Marmelad', sans-serif",
                    fontSize: "80px",
                    zIndex: "1",
                  }}
                  className="mb-3 "
                >
                  Awaken
                </h2>
              </div>
              <div className="p-2 text-left">
                <h3
                  className="mt-2 pl-3x"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Welcome {storedUserName}
                </h3>
              </div>
              {/* Add your header content here */}
            </header>
            <div className="d-md-flex">
              <div
                className="col-lg-8 col-12 pt-1 pr-0  mt-2 scrollable-container"
                style={{ maxHeight: "70vh", overflowY: "scroll" }}
              >
                {renderComponent(
                  handleCompletionChange,
                  handleNextClick,
                  handlePrevClick
                )}
              </div>
              {isMobile ? (
                ""
              ) : (
                <div className="col-md-3 col-lg-4  mt-2 d-lg-block   ">
                  <div className="p-2">
                    {/* <div className="row m-2 p-1 ">
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
                  </div> */}
                    <div
                      style={{ height: "60vh", overflowY: "scroll" }}
                      className="scrollable-container "
                    >
                      {rightSidebarArray.map((module, index) => {
                        return (
                          <Card
                            onClick={module.action}
                            style={{
                              background: `url(${module.url})`,
                              height: "300px",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              cursor: "pointer",
                              backgroundSize: "cover",
                            }}
                            key={index}
                            className={`m-2   `}
                          >
                            {/* <div className="card-container">
                            
                            <img style={{width:"100%"}} src ={module.url} alt=""/>
                          </div> */}
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstPage;

// export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
//   return (
//     <div style={{ width: "100%", height: "80%" }}>
//       <Player src={src} poster={poster}>
//         <ControlBar autoHide={false} />
//       </Player>
//     </div>
//   );
// };

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  const youtubeConfig = {
    playerVars: {
      color: "white", // Change the color of the player controls
      modestbranding: 1, // Hide the YouTube logo in the player
      showinfo: 0, // Hide the "Watch on YouTube" button
    },
  };
  return (
    <div>
      <ReactPlayer
        width={isMobile ? 320 : 640}
        height={isMobile ? 180 : 360}
        url={src}
        light={videoPosterImg}
        controls={true}
        playing={true}
        config={{ youtube: youtubeConfig }}
      />
    </div>
  );
};
