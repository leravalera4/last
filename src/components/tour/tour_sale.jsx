import Joyride from "react-joyride";
import React, { useState, useEffect } from 'react';

  
const steps = [
  {
    target: "body > div:nth-child(14) > div > div:nth-child(4)",
    content: "Use the tabs to explore different categories.",
    disableBeacon: true, // Убедитесь, что beacon включен
   spotlightClicks: true, // Опционально, чтобы выделить элемент при клике
    spotlight: true,
  },
  // {
  //   target: "#button",
  //   content: "All your items are stored here",
  //   placement: 'bottom',
  //   spotlight:true,
  //   styles: {
  //     options: {
  //       width: 200,
  //       height: 100
  //     },
  //     spotlight: {
  //       backgroundColor: "#ffffff70",
  //     },
  //   },
  // },
  {
    target: "body > div:nth-child(14) > div > div.react-tabs > div > div:nth-child(1) > ul",
    content: "Add iteem to the list for price comparing",
    //spotlightClicks: true, // Опционально, чтобы выделить элемент при клике
    spotlight: true,
  },
  {
    target: "ul > li:nth-child(1) > div > button",
    content: "Add iteem to the list for price comparing",
    //spotlightClicks: true, // Опционально, чтобы выделить элемент при клике
    spotlight: true,
  },
  {
    target: "body > div.headroom-wrapper > div > header > div:nth-child(3) > div",
    content: "All your added items are stored here",
    //spotlightClicks: true, // Опционально, чтобы выделить элемент при клике
    spotlight: true,
  },
  // {
  //   target: ".explore",
  //   content: "Click here to find out more about other packages",
  // },
  // {
  //   target: ".footer .form",
  //   content: "Subscribe to our newsletter here",
  // },
];

function Tour() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedSale');
    if (!hasVisited) {
      setRun(true);
      localStorage.setItem('hasVisitedSale', 'true');
    }
  }, []);
  return (
    <Joyride
  steps={steps}
  run={run}
  callback={(data) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') {
      localStorage.setItem('hasVisitedSale', 'true'); // Устанавливаем ключ при завершении
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
      height:"200px",
    },
    spotlight: {
      backgroundColor: "#ffffff70",
    },
    options: {
      zIndex: 100,
    }
  }}
  showProgress={true}
  showSkipButton={true}
  disableOverlay={false}
/>

      // <Joyride
      //   steps={steps}
      //   disableScrolling={true}
      //   scrollToStep={false} // Убедитесь, что прокрутка отключена
      //   continuous={true}
      //   styles={{
      //     options: {
      //       arrowColor: "#5caeab",
      //       backgroundColor: "#5caeab",
      //       overlayColor: "rgba(0, 0, 0, 0.85)",
      //       primaryColor: "#5caeab",
      //       textColor: "#fff",
      //       height:"200px",
      //     },
      //     spotlight: {
      //       backgroundColor: "#ffffff70",
      //     },
      //   }}
      //   showProgress={true}
      //   showSkipButton={true}
      //   disableOverlay={false}
      // />
  );
}

export default Tour;
