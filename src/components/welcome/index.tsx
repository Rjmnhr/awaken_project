import React from "react";
import { VideoPlayer } from "../../pages/first-page";
import welcomeVideo from "../../videos/welcome-video.mp4";

const WelcomeComponent: React.FC = () => {
  return (
    <div>
      <div>
        <div className="p-3 mb-3 ">
          <div className="section-title">
            <h2 className="  mb-3">
              {" "}
              <strong>Introduction</strong>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              justifyItems: "center",
              alignContent: "center",
            }}
          >
            <div>
              <VideoPlayer
                src={welcomeVideo}
                poster={
                  "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702563224/cymfgrw5mkkavedstduo.png"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeComponent;
