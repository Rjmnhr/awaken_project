import { Card, notification, Collapse, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import workBookImg from "../../images/workbook-button.jpg";
import resourcesImg from "../../images/resource-button.jpg";
import facebookCommunityImg from "../../images/fb-button.jpg";
import workBookIcon from "../../images/notebook.png";
import resourcesIcon from "../../images/hiring.png";
import facebookCommunityIcon from "../../images/facebook-2.png";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  ArrowLeftOutlined,
  CaretRightOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import "video-react/dist/video-react.css";
import headerImg from "../../images/top-header-photo.jpg";
import DiscoveryComponent from "../../components/discovery-component";
import HabitsComponent from "../../components/habits-component";
import BlocksComponent from "../../components/blocks-component";
import ValuesComponent from "../../components/values-component";
import SpiritualityComponent from "../../components/spirituality-component";
import ReviewComponent from "../../components/review-component";
import CompletionComponent from "../../components/oncompletion-component";
import videoPosterImg from "../../images/Awaken-video.png";
import pdfPathWorkbook from "../../components/download-pdf/awaken-workbook.pdf"; // Update with the correct path
import pdfPathResources from "../../components/download-pdf/awaken-resources.pdf"; // Update with the correct path
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import AxiosInstance from "../../components/axios";
import Footer from "../../components/footer";

const { Panel } = Collapse;
const modulesArray = [
  {
    title: "Discovery / Introduction",
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
    title: "Review / Conclusion",
    videos: ["Video 1", "Video 2"],
  },
  {
    title: "On Completion",
    videos: ["Video 1"],
  },
];
interface RightSidebarItem {
  title: string;
  url: string;
  action?: () => void; // Function to execute when clicked
  icon: string;
  modalTitle: string; // Add modal title
  modalContent: React.ReactNode; // Add modal content
}

interface VideoPlayerProps {
  src: string;
  poster: string;
}

const moduleComponentsArray = [
  DiscoveryComponent,
  HabitsComponent,
  BlocksComponent,
  ValuesComponent,
  SpiritualityComponent,
  ReviewComponent,
  CompletionComponent,
];

const FirstPage: React.FC = () => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("awaken-user-email") || "";
  //eslint-disable-next-line
  const [forceUpdate, setForceUpdate] = useState(false); // Define the forceUpdate state variable
  const storedUserName = localStorage.getItem("awaken-user-name");
  const [completionStatuses, setCompletionStatuses] = useState<any[]>([]);
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

  const alertNotification = () => {
    api.error({
      message: `You have videos left to complete`,
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

  const rightSidebarArray: RightSidebarItem[] = [
    {
      title: "Work book",
      url: workBookImg,
      action: () => downloadPdf(pdfPathWorkbook, "awaken-workbook.pdf"),
      icon: workBookIcon,
      modalTitle: "Download Workbook",
      modalContent: (
        <p style={{ maxWidth: "200px" }}>
          Are you sure you want to download the Awaken Workbook?
        </p>
      ),
    },
    {
      title: "Facebook community",
      url: facebookCommunityImg,
      action: () =>
        window.open(
          "https://www.facebook.com/groups/733711701964744/",
          "_blank"
        ),
      icon: facebookCommunityIcon,
      modalTitle: "Visit Facebook Community",
      modalContent: (
        <p style={{ maxWidth: "200px" }}>
          Are you sure you want to visit the Awaken Facebook Community?
        </p>
      ),
    },
    {
      title: "Resources",
      url: resourcesImg,
      action: () => downloadPdf(pdfPathResources, "resources.pdf"),
      icon: resourcesIcon,
      modalTitle: "Download Resources",
      modalContent: (
        <p style={{ maxWidth: "200px" }}>
          Are you sure you want to download the Awaken Resources?
        </p>
      ),
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
    const ComponentToRender = moduleComponentsArray[activeModuleIndex];
    const currentVideoIndex = activeVideoIndex + 1;
    return (
      <ComponentToRender
        onCompletionChange={onCompletionChange}
        onNextClick={handleNextClick}
        onPrevClick={handlePrevClick}
        userEmail={userEmail}
        currentVideoIndex={currentVideoIndex}
      />
    );
  };
  const loadCompletionStatuses = async () => {
    try {
      const completionStatuses = await Promise.all(
        modulesArray.map(async (module, index) => {
          if (module.title === "On Completion") {
            // Skip checking the "On Completion" module
            return {
              moduleTitle: module.title,
              moduleCompleted: true,
              videoStatuses: [],
            };
          }

          const videoCompletionStatuses = await Promise.all(
            module.videos.map(async (video, videoIndex) => {
              const response = await AxiosInstance.post(
                "/api/completion/video-completion-status",
                {
                  email: userEmail,
                  module: module.title,
                  videoNo: videoIndex + 1,
                }
              );
              return response.data.completed || false;
            })
          );

          const moduleCompleted = videoCompletionStatuses.every(
            (status) => status
          );

          return {
            moduleTitle: module.title,
            moduleCompleted: moduleCompleted,
            videoStatuses: videoCompletionStatuses,
          };
        })
      );

      // Check if all modules (excluding the "On Completion" module) are completed
      const allModulesCompleted = completionStatuses.every(
        (module) => module.moduleCompleted
      );
      console.log(
        "🚀 ~ loadCompletionStatuses ~ allModulesCompleted:",
        allModulesCompleted
      );

      // Set the state variable based on the overall completion
      setCompletionStatuses(completionStatuses);
      setOverallCompletion(allModulesCompleted);
    } catch (error) {
      console.error("Error fetching completion statuses:", error);
    }
  };

  // Assuming you have a state variable to store the overall completion status
  const [overallCompletion, setOverallCompletion] = useState(false);

  const isModuleCompleted = (moduleName: string, videoIndex: number) => {
    const completedStatus = sessionStorage.getItem(
      `${moduleName}-completedStatus-${videoIndex + 1}`
    );

    if (completedStatus) {
      return completedStatus === "true";
    } else {
      const moduleIndex = modulesArray.findIndex(
        (module) => module.title === moduleName
      );
      return (
        completionStatuses[moduleIndex]?.videoStatuses[videoIndex] || false
      );
    }
  };

  useEffect(() => {
    loadCompletionStatuses();
    // eslint-disable-next-line
  }, [userEmail, forceUpdate]);

  const handleNextClick = () => {
    const currentModule = modulesArray[activeModuleIndex];
    const totalVideos = currentModule.videos.length;
    const nextVideoIndex = (activeVideoIndex + 1) % totalVideos;

    if (nextVideoIndex === 0) {
      // Move to the next module when reaching the last video in the current module
      if (activeModuleIndex < modulesArray.length - 1) {
        setActiveModuleIndex((prevIndex) => prevIndex + 1);
      }
    }

    setActiveVideoIndex(nextVideoIndex);
  };

  const handlePrevClick = () => {
    const prevVideoIndex =
      (activeVideoIndex - 1 + modulesArray[activeModuleIndex].videos.length) %
      modulesArray[activeModuleIndex].videos.length;

    if (prevVideoIndex === modulesArray[activeModuleIndex].videos.length - 1) {
      // Move to the previous module when reaching the first video in the current module
      if (activeModuleIndex > 0) {
        setActiveModuleIndex((prevIndex) => prevIndex - 1);
      }
    }

    setActiveVideoIndex(prevVideoIndex);
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

              <Collapse ghost expandIconPosition="right">
                {modulesArray.map((module, index) => {
                  return (
                    <Panel
                      key={index}
                      header={
                        <div
                          className={`my-2 hover-card text-left ${
                            activeModuleIndex === index ? "active" : ""
                          }`}
                        >
                          <div className="card-container tex-left">
                            <h4
                              onClick={() => {
                                if (module.title === "On Completion") {
                                  if (overallCompletion) {
                                    setActiveModuleIndex(index);
                                    setActiveVideoIndex(0);
                                  } else {
                                    alertNotification();
                                  }
                                } else {
                                  setActiveModuleIndex(index);
                                  setActiveVideoIndex(0);
                                }
                              }}
                              className="m-0 text-left"
                            >
                              {module.title}
                            </h4>
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
                            <p
                              style={{
                                cursor: "pointer",
                                color: "black",
                                fontSize: "18px",
                              }}
                              className="pl-0 m-1 "
                              onClick={() => {
                                if (module.title === "On Completion") {
                                  if (overallCompletion) {
                                    setActiveVideoIndex(videoIndex);
                                    setActiveModuleIndex(index);
                                  } else {
                                    alertNotification();
                                  }
                                } else {
                                  setActiveVideoIndex(videoIndex);
                                  setActiveModuleIndex(index);
                                }
                              }}
                            >
                              <CaretRightOutlined className="mr-1 " />
                              {video}
                            </p>
                            {isCompleted ? (
                              <p className="m-0">
                                {" "}
                                <TaskAltIcon
                                  className="check-tick "
                                  style={{
                                    fontSize: "18px",
                                    marginLeft: "8px",
                                    color: "#e0af2a",
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
            {isMobile ? (
              <div style={{ fontSize: "8px" }} className="text-left mb-3 mt-3">
                <p className="mb-1">Video courtesy:</p>

                <p className="m-0">
                  {" "}
                  Video by Ruvim Miksanskiy: {""}
                  <a href="https://www.pexels.com/video/video-of-forest-1448735/">
                    https://www.pexels.com/video/video-of-forest-1448735/
                  </a>
                </p>
                <p className="m-0">
                  Video by Kelly :
                  <a href=" https://www.pexels.com/video/a-big-cascading-waterfall-2253462/">
                    {" "}
                    https://www.pexels.com/video/a-big-cascading-waterfall-2253462/
                  </a>
                </p>
                <p className="m-0">
                  {" "}
                  Video by Peter Fowler:
                  <a href=" https://www.pexels.com/video/ocean-waves-video-1093652/">
                    {" "}
                    https://www.pexels.com/video/ocean-waves-video-1093652/
                  </a>
                </p>
                <p className="m-0">
                  Video by Alex Fu:
                  <a href=" https://www.pexels.com/video/timelapse-of-night-sky-over-lake-3493603/">
                    {" "}
                    https://www.pexels.com/video/timelapse-of-night-sky-over-lake-3493603/
                  </a>
                </p>
              </div>
            ) : (
              ""
            )}

            {isMobile ? <Footer /> : ""}
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
                  background: `url(${headerImg})`,
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
                      "rgba(250, 250, 250, 0.5)" /* Adjust the opacity as needed */,
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
                style={{ maxHeight: "69vh", overflowY: "scroll" }}
              >
                {renderComponent(
                  handleCompletionChange,
                  handleNextClick,
                  handlePrevClick
                )}

                <p
                  onClick={() =>
                    downloadPdf(pdfPathWorkbook, "awaken-workbook.pdf")
                  }
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  className="text-center text-primary"
                >
                  Download Work Book <CloudDownloadOutlined />
                </p>

                {isMobile ? (
                  ""
                ) : (
                  <div
                    style={{ fontSize: "8px" }}
                    className="text-left mb-3 mt-5 container"
                  >
                    <p className="mb-1">Video courtesy:</p>

                    <p className="m-0">
                      {" "}
                      Video by Ruvim Miksanskiy: {""}
                      <a href="https://www.pexels.com/video/video-of-forest-1448735/">
                        https://www.pexels.com/video/video-of-forest-1448735/
                      </a>
                    </p>
                    <p className="m-0">
                      Video by Kelly :
                      <a href=" https://www.pexels.com/video/a-big-cascading-waterfall-2253462/">
                        {" "}
                        https://www.pexels.com/video/a-big-cascading-waterfall-2253462/
                      </a>
                    </p>
                    <p className="m-0">
                      {" "}
                      Video by Peter Fowler:
                      <a href=" https://www.pexels.com/video/ocean-waves-video-1093652/">
                        {" "}
                        https://www.pexels.com/video/ocean-waves-video-1093652/
                      </a>
                    </p>
                    <p className="m-0">
                      Video by Alex Fu:
                      <a href=" https://www.pexels.com/video/timelapse-of-night-sky-over-lake-3493603/">
                        {" "}
                        https://www.pexels.com/video/timelapse-of-night-sky-over-lake-3493603/
                      </a>
                    </p>
                  </div>
                )}
                {isMobile ? "" : <Footer />}
              </div>
              {isMobile ? (
                <div>
                  <div className="p-2 d-flex justify-content-around text-center container-fluid">
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

                    {rightSidebarArray.map((module, index) => {
                      return (
                        <Popconfirm
                          title={module.modalTitle}
                          description={module.modalContent}
                          onConfirm={module.action}
                          okText="Yes"
                          cancelText="No"
                        >
                          <div key={index} className={`m-2   `}>
                            <img
                              style={{ width: "30px" }}
                              src={module.icon}
                              alt=""
                              className="mb-2"
                            />
                            <label style={{ fontSize: "14px" }}>
                              {module.title}
                            </label>
                          </div>
                        </Popconfirm>
                      );
                    })}
                  </div>
                </div>
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
                      style={{ height: "67vh", overflowY: "scroll" }}
                      className="scrollable-container "
                    >
                      {rightSidebarArray.map((module, index) => {
                        return (
                          <Popconfirm
                            title={module.modalTitle}
                            description={module.modalContent}
                            onConfirm={module.action}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Card
                              style={{
                                backgroundImage: `url(${module.url})`,
                                height: "300px",

                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                cursor: "pointer",
                                backgroundSize: "contain",
                              }}
                              key={index}
                              className={`m-2   `}
                            >
                              {/* <div className="card-container">
                            
                            <img style={{width:"100%"}} src ={module.url} alt=""/>
                          </div> */}
                            </Card>
                          </Popconfirm>
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
