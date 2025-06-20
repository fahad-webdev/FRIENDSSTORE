import {useEffect} from "react";

const HeadAnimation = () => {
  useEffect(() => {
    const intersectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated-head");
          } else {
            entry.target.classList.remove("animated-head");
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll(".head");
    elements.forEach((el) => intersectObserver.observe(el));
  }, []);
};

export default HeadAnimation;
