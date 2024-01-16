import React, { useEffect } from "react";
import { VideoPlayer } from "../../pages/first-page";
import { CheckOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { videos } from "../video-info";
import AxiosInstance from "../axios";

interface BlocksComponentProps {
  onCompletionChange: (moduleName: string, newStatus: boolean) => void;
  onNextClick: () => void;
  onPrevClick: () => void;
  userEmail: string;
  currentVideoIndex: number;
}
const BlocksComponent: React.FC<BlocksComponentProps> = ({
  onCompletionChange,
  onNextClick,
  onPrevClick,
  userEmail,
  currentVideoIndex,
}) => {
  const moduleName = "Blocks"; // The name of the module

  const [completed, setCompleted] = React.useState<boolean>(false);

  const numericVideoNumber = currentVideoIndex;

  useEffect(() => {
    const fetchCompletionStatus = async () => {
      try {
        // Make the POST request with formData including moduleName, numericVideoNumber, and email

        const response = await AxiosInstance.post(
          "/api/completion/video-completion-status",
          {
            email: userEmail,
            module: moduleName,
            videoNo: numericVideoNumber,
          }
        );

        setCompleted(response.data.completed || false);
      } catch (error) {
        console.error("Error fetching completion status:", error);
      }
    };

    fetchCompletionStatus();
    //eslint-disable-next-line
  }, [numericVideoNumber, moduleName, userEmail]);
  const handleButtonClick = async () => {
    const newCompletedStatus = !completed;
    setCompleted(newCompletedStatus);

    try {
      await AxiosInstance.post(`/api/completion/update-video-completion`, {
        email: userEmail,
        module: moduleName,
        videoNo: numericVideoNumber,
        status: newCompletedStatus,
      });
      sessionStorage.setItem(
        `${moduleName}-completedStatus-${numericVideoNumber}`,
        String(newCompletedStatus)
      );
      onCompletionChange(moduleName, newCompletedStatus);
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };
  // Handle "Next" button click
  const handleNextClick = () => {
    // Call the callback function to update the active index in the parent component
    onNextClick();
  };
  // Handle "Previous" button click
  const handlePrevClick = () => {
    // Call the callback function to update the active index in the parent component
    onPrevClick();
  };
  return (
    <div className=" p-3 text-left " data-aos="fade-left">
      <div>
        <div className="d-flex justify-content-between flex-wrap align-content-center">
          <h1 className="  mb-3">
            {" "}
            <strong>Blocks - Video {numericVideoNumber}</strong>
          </h1>

          <div
            className={`btn ${
              completed ? " btn-completed" : " btn-not-completed "
            }  mt-3 mt-lg-1 p-2 `}
            onClick={handleButtonClick}
            style={{ transition: "all 0.3s ease", height: "50px" }}
          >
            <span className="p-0" style={{ transition: "all 0.3s ease" }}>
              {completed ? (
                <>
                  <CheckOutlined /> Completed
                </>
              ) : (
                "Mark as Complete"
              )}
            </span>
          </div>
        </div>
      </div>
      <p>
        In Module 3, we deep dive into blocks, fears and limiting beliefs and
        how they are the obstacles on our way to happiness and joy. Through
        powerful questioning we challenge them and eliminate them.
      </p>
      <div className="d-flex w-100 justify-content-between ">
        <div
          className="mb-3 mt-3"
          style={{ cursor: "pointer" }}
          onClick={handlePrevClick}
        >
          <p style={{ color: "gray" }}>
            {" "}
            <LeftOutlined /> Previous
          </p>
        </div>
        <div
          className="mb-3 mt-3"
          style={{ cursor: "pointer" }}
          onClick={handleNextClick}
        >
          <p style={{ color: "gray" }}>
            Next <RightOutlined />
          </p>
        </div>
      </div>

      <div
        className="text-center"
        style={{
          height: "100%",
          width: "100%",
          display: "grid",
          justifyItems: "center",
        }}
      >
        <VideoPlayer
          src={videos[2]?.Blocks[numericVideoNumber - 1]?.url}
          poster={
            "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702563224/cymfgrw5mkkavedstduo.png"
          }
        />
      </div>
    </div>
  );
};

export default BlocksComponent;
