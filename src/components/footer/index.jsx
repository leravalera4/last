import localFont from "next/font/local";
import SocialIcons from "../social";

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
    {
      path: "../../app/fonts/NoirPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
});

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow:" rgba(37, 39, 89, 0.08) 0px -8px 8px 0px"
        }}
      >
        <p className={noir.className}>
          &copy; {new Date().getFullYear()} Shoppy Scan.
        </p>
        <p className={noir.className}> The content of this site is intended for personal purposes only.</p>
        <p className={noir.className}>support@shoppyscan.ca</p>
        <SocialIcons/>
      </div>
    </footer>
  );
};

export default Footer;
