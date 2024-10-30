"use client"

import Joyride from "react-joyride";
import React, { useState, useEffect } from "react";

const steps = [
  {
    target:
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2)",
    content: "Add multiple stores for price comparing",
    //disableBeacon: true, // Убедитесь, что beacon включен
    // spotlightClicks: true, // Опционально, чтобы выделить элемент при клике
    spotlight: true,
  },
  {
    target:
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > button",
    content: "Add iteem to the list for price comparing",
    //spotlightClicks: true, // Опционально, чтобы выделить элемент при клике
    spotlight: true,
  },
  {
    target:
      "body > div.headroom-wrapper > div > header > div:nth-child(3) > div",
    content: "All your added items are stored here",
    //spotlightClicks: true, // Опционально, чтобы выделить элемент при клике
    spotlight: true,
  },
];

function Tour() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setRun(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);
  return (
    <Joyride
      steps={steps}
      run={run}
      callback={(data) => {
        const { status } = data;
        if (status === "finished" || status === "skipped") {
          localStorage.setItem("hasVisited", "true"); // Устанавливаем ключ при завершении
        }
      }}
      disableScrolling={true}
      scrollToStep={false}
      continuous={true}
      styles={{
        options: {
          arrowColor: "#5caeab",
          backgroundColor: "#5caeab",
          overlayColor: "rgba(0, 0, 0, 0.85)",
          primaryColor: "#5caeab",
          textColor: "#fff",
          height: "200px",
        },
        spotlight: {
          backgroundColor: "#ffffff70",
          zIndex:'10'
        },
      }}
      showProgress={true}
      showSkipButton={true}
      disableOverlay={false}
    />
  );
}

export default Tour;
