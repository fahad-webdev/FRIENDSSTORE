import { useEffect } from "react";

const ParaAnimation = () => {
  useEffect(() => {
    const intersectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated-para");
          } else {
            entry.target.classList.remove("animated-para");
          }
        });
      },
      { threshold: 0.3}
    );

    const elements = document.querySelectorAll(".para");
    elements.forEach((el) => intersectObserver.observe(el));

    

  }, []);
};

export default ParaAnimation;
