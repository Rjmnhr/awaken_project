import React from "react";
import { VideoPlayer } from "../../pages/first-page";
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
          <p style={{ fontSize: "25px" }} className=" mb-5">
            {" "}
            <strong>
              Congratulations! I am so glad you have completed your journey. I
              wish you all the very best for your onward path. Sending you love
              and light, Ansua
            </strong>
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
