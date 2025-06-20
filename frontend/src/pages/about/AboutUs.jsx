import React from "react";
import "./AboutUs.css";
import AboutUsStory from "./sections/aboutstory/AboutUsStory.jsx";
import AboutOurMission from "./sections/aboutOurMission/AboutOurMission.jsx";
import OurTeam from "./sections/ourteam/OurTeam.jsx";

const AboutUs = () => {
  return (
    <>
      <div className="about-main-back unselectable" id="aboutus">
        <div className="about-content-back">
          <div className="about-content">
            <h1>ABOUT US</h1>
            <p >
              FRIENDSSTORE began as a shared dream between two university
              friends aiming to create a brand where fashion meets quality and
              affordability. With limited resources and big ambition, we started
              by selling shoes using our personal savings. Over time, our
              dedication turned us from resellers into manufacturers, allowing
              us to craft each product with precision and purpose. Today,
              FRIENDSSTORE offers a carefully curated collection of premium
              shoes, hoodies, and dresses{" "}
            </p>
          </div>
        </div>
        <AboutUsStory />
        <AboutOurMission />
        <OurTeam />
      </div>
    </>
  );
};
export default AboutUs;
