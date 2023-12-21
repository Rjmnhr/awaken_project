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
            <div style={{height:"90%",width:"90%"}}>
            <VideoPlayer
              src={welcomeVideo}
              poster={
                "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1702563224/cymfgrw5mkkavedstduo.png"
              }
            />
            </div>
            
          </div>
        </div>

        <footer className="bg-dark text-white p-3 mt-3">
          <h2>Footer</h2>
        </footer>
      </div>
    </div>
  );
};

export default WelcomeComponent;
