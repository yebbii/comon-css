import React from "react";
import { useSpring, animated } from "@react-spring/web";
import './adminChart.css';

function AnimatedNumber({ value }) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { mass: 1, tension: 280, friction: 120 },
  });

  return (
    <div className="total-Data" id="total-Data">
      <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>
    </div>
  );
}

export default AnimatedNumber;