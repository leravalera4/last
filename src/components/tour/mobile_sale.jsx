"use client"

import Joyride from "react-joyride";
import React, { useState, useEffect } from "react";

const steps = [
    {
      target: "body > div.headroom-wrapper > div > header > div:nth-child(2)",
      content: "Use these button to navigate between tabs.",
      spotlight: true,
    },
    {
      target: "body > div.headroom-wrapper > div > header > div:nth-child(1) > a:nth-child(1)",
      content: "Click here to return to the homepage at any time.",
      spotlight: true,
    },
    {
      target: "body > div.headroom-wrapper > div > header > div.cart > div",
      content: "This is your cart — all selected items appear here.",
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
        },
        options: {
          zIndex: 100,
        },
      }}
      showProgress={true}
      showSkipButton={true}
      disableOverlay={false}
    />
  );
}

export default Tour;
