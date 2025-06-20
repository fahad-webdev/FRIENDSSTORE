import React ,{useState} from 'react';
import "./OurTeam.css";
import HeadAnimation from '../../../../hooks/HeadAnimation';

const OurTeam=()=>{
    HeadAnimation();
    return(
        <>
        <div className="ourteam-main-back ">
        <div className="ourteam-main">
       <div className="ourteam">
       <div className="heading1">
            <h1 className='head'>OUR TEAM</h1>
        </div>
        <div className="ourteam-content-back">
            {/*Card 1 */}
           <div className="team-card-back head">
            <div className="team-image">

            </div>
           <div className="team-info" id="image1">
           <h3>Fahad Pervaiz – Co-Founder & CEO </h3>
           </div>
           </div>
            {/*Card 2 */}
            <div className="team-card-back head" >
            <div className="team-image" id='image2'>

            </div>
           <div className="team-info">
           <h3>Hassan Ali – Co-Founder & Head of Operations </h3>
           </div>
           </div>
            {/*Card 3 */}
            <div className="team-card-back head" >
            <div className="team-image" id='image3'>

            </div>
           <div className="team-info">
           <h3>Muhammad Ali – Sales & Partnerships Manager </h3>
           </div>
           </div>
            {/*Card 4 */}
            <div className="team-card-back head" >
            <div className="team-image" id='image4'>

            </div>
           <div className="team-info">
           <h3>Hammad Raza – E-Commerce & Technology Lead</h3>
           </div>
           </div>
            {/*Card 5 */}
            <div className="team-card-back head" >
            <div className="team-image" id='image5'>

            </div>
           <div className="team-info">
           <h3>Sameer Khan – Production & Quality Manager</h3>
           </div>
           </div> {/*Card 6 */}
           <div className="team-card-back head" >
            <div className="team-image" id='image6'>

            </div>
           <div className="team-info">
           <h3> Zara Rehman – Customer Experience Specialist</h3>
           </div>
           </div> {/*Card 7 */}
           <div className="team-card-back head" >
            <div className="team-image"  id='image7'>

            </div>
           <div className="team-info">
           <h3>Bilal Ahmed – Marketing & Brand Manager</h3>
           </div>
           </div> {/*Card 8 */}
           <div className="team-card-back head">
            <div className="team-image" id='image8'>

            </div>
           <div className="team-info">
           <h3>Ayesha Malik – Creative Director</h3>
           </div>
           </div>
           
        </div>
       </div>
            </div>
        </div>
        </>
    )
}
export default OurTeam;