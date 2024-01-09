import React from "react";
import { VideoPlayer } from "../../pages/first-page";
import successTick from "../../images/check-soft-bg.svg";
import { videos } from "../video-info";

interface CompletionComponentProps {
  currentVideoIndex: number;
}
const CompletionComponent: React.FC<CompletionComponentProps> = ({
  currentVideoIndex,
}) => {
  const numericVideoNumber = currentVideoIndex;

  return (
    <div className=" p-3 text-left " data-aos="fade-left">
      <div>
        <div className="d-flex justify-content-center flex-wrap align-content-center">
          <p style={{fontSize:"30px"}} className=" mb-5">
            {" "}
            <strong>Congrats! you have completed </strong>
            <img
              style={{ marginLeft: "10px" }}
              src={successTick}
              alt=""
              width={50}
              height={50}
            />{" "}
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
          src={videos[6]?.Completion[numericVideoNumber - 1]?.url}
          poster={
            "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702563224/cymfgrw5mkkavedstduo.png"
          }
        />
      </div>
    </div>
  );
};

export default CompletionComponent;
