import React from "react";
import notFound from "../../app/images/not_f.svg";
import Image from "next/image.js";
import localFont from "next/font/local";

const noir = localFont({
  src: [
    {
      path: "../../app/fonts/NoirPro-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../app/fonts/NoirPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../app/fonts/NoirPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const index = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center",justifyContent:'center'}}>
      <Image src={notFound} alt="Not Found" width={200} height={200}/>
      <h1 className = {noir.className} style={{ textAlign: "center", marginTop: "20px" }}>
        Oops! No results found.
      </h1>
    </div>
  );
};

export default index;
