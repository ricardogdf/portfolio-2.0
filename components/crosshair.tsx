import React from "react";

const Crosshair = () => {
  const [detected, setDetected] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setDetected(true);
    }, 4000);
  }, []);

  return (
    <div className={`crosshair ${detected ? "blinking" : ""}`}>
      {!detected && (
        <>
          <div className="scannerLine horiz" />
          <div className="scannerLine vert" />
        </>
      )}
      <div className="cornerText tl">SYS: ACTIVE</div>
      <div className="cornerText tr">COORD: [000,000]</div>
      <div className="cornerText bl">
        {!detected ? "SCAN MODE" : "DETECTED"}
      </div>
      <div className="cornerText br">
        STATUS: {!detected ? "SAFE" : "WARNING"}
      </div>
    </div>
  );
};

export default Crosshair;
