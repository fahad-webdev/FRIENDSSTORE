import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutOption.css';
import HeadAnimation from '../../../../hooks/HeadAnimation';


const AboutOption = () =>{
    const Navigate = useNavigate();
    /*const intersectObserver = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                entry.target.classList.add("animated-para");
            }
            else{
                entry.target.classList.remove("animated-para");
            }
        });
    },{threshold:0.5});
    const paragraph = document.querySelectorAll(".para");
    paragraph.forEach((el)=>{intersectObserver.observe(el)});*/
HeadAnimation();
    return (
        <>
        <div className="aboutoption-main-back promotion-main-back">
            <div className="aboutoption-main promotion-main">
            <div className="heading1 head">
            <h1>OUR JOURNEY - FROM DREAM TO REALITY</h1>
          </div>
          <div className="aboutoption-content collection-content ">
            <p className='para'>
            What started as a vision between two university friends, Fahad and Hassan, turned into a thriving brand built on passion, perseverance, and ambition. In his second semester, Fahad dreamed of launching an online store to sell high-quality shoes and accessories. With limited resources but unwavering determination, he shared the idea with Hassan, and together, they took a leap of faith—investing their pocket money and savings to kickstart their journey as sellers.
            </p>
            <div className="aboutoption-image head" onClick={()=>{Navigate("/aboutus");}}>
                <h1>FRIENDSSTORE</h1>
            </div>
          </div>
            </div>
        </div>
        </>
    )
}
export default AboutOption;