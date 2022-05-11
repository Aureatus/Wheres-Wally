import { useEffect, useRef, useState } from "react";

import wallyProfile from "../Assets/wally.jpg";
import odlawProfile from "../Assets/Odlaw.jpg";
import wizardProfile from "../Assets/Wizard.jpeg";

const GameCanvas = ({ drawWallyImage, wallyImage1 }) => {
  const canvasRef = useRef(null);

  const [mouseClickLocation, setMouseClickLocation] = useState(null);

  const getMouseCoordinates = (event) => {
    const mouseX = event.nativeEvent.clientX;
    const mouseY = event.nativeEvent.clientY;
    return { mouseX, mouseY };
  };

  const [targetingBoxPresent, setTargetingBoxPresent] = useState(false);
  const boxWidth = 50;
  const boxHeight = 50;

  const drawTargetBox = ({ mouseClickLocation }, context) => {
    const { mouseX, mouseY } = mouseClickLocation;

    context.strokeRect(
      mouseX - boxWidth / 2,
      mouseY - boxHeight / 2,
      boxWidth,
      boxHeight
    );
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    wallyImage1.onload = () => {
      drawWallyImage(context, wallyImage1);
    };
  }, [drawWallyImage, wallyImage1]);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    drawWallyImage(context, wallyImage1);
  });

  useEffect(() => {
    if (mouseClickLocation) {
      const context = canvasRef.current.getContext("2d");
      drawTargetBox({ mouseClickLocation }, context);
    }
  }, [mouseClickLocation]);

  if (!targetingBoxPresent) {
    return (
      <canvas
        ref={canvasRef}
        height={1075}
        width={1434}
        onClick={(event) => {
          setMouseClickLocation(getMouseCoordinates(event));
          setTargetingBoxPresent(true);
        }}
      ></canvas>
    );
  } else {
    return (
      <>
        <div
          className="char-select-div"
          style={{
            position: "absolute",
            left: mouseClickLocation.mouseX - boxWidth / 2 + 50,
            top: mouseClickLocation.mouseY - boxHeight / 2,
          }}
        >
          <div className="char-select-card" id="wally">
            <img src={wallyProfile} alt="Wally" height={26} width={26} />
            <p>Wally</p>
          </div>
          <div className="char-select-card" id="waldo">
            <img src={odlawProfile} alt="Odlaw" height={26} width={26} />
            <p>Wally</p>
          </div>
          <div className="char-select-card" id="wizard">
            <img src={wizardProfile} alt="Wizard" height={26} width={26} />
            <p>Wally</p>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          height={1075}
          width={1434}
          onClick={() => {
            setTargetingBoxPresent(false);
          }}
        ></canvas>
      </>
    );
  }
};

export default GameCanvas;
