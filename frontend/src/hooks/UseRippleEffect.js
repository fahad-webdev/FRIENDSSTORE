import { useCallback } from "react";

const useRippleEffect = () => {
  const handleClick = useCallback((e) => {
    const button = e.currentTarget;

    // Create ripple span element
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    // Get button size & click position
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    // Set ripple size and position dynamically
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    // Append ripple effect to the button
    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 500);
  }, []);

  return handleClick; // Return the function
};

export default useRippleEffect;
