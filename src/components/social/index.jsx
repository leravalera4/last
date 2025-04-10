import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaTiktok,
  FaReddit,
  FaMedium,
} from "react-icons/fa6";

import instagram from "../../app/images/instagram.svg";
import linkedin from "../../app/images/linkedIn.svg";
import facebook from "../../app/images/facebook.svg";
import x from "../../app/images/x.svg";
import Image from "next/image.js";

const socialLinks = [
  { href: "https://www.instagram.com/shoppyscan.ca/", icon: <FaInstagram /> },
  { href: "https://facebook.com/shoppyscan", icon: <FaFacebook /> },
  { href: "https://twitter.com/shoppyscan", icon: <FaXTwitter /> },
  { href: "https://linkedin.com/company/shoppyscan", icon: <FaLinkedin /> },
  { href: "https://www.reddit.com/r/ShoppyScan/", icon: <FaReddit /> },
  { href: "https://medium.com/@shoppyscan", icon: <FaMedium /> },
];

const SocialIcons = () => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Image
        className="image"
        alt="added"
        src={instagram}
        width={70}
        height={70}
        style={{ fill: "black" }}
      >
        <a href="https://www.instagram.com/shoppyscan.ca/" />
      </Image>
      <Image
        className="image"
        alt="added"
        src={facebook}
        width={70}
        height={70}
        style={{ fill: "black" }}
      >
        <a href="https://www.instagram.com/shoppyscan.ca/" />
      </Image>
      <Image
        className="image"
        alt="added"
        src={linkedin}
        width={70}
        height={70}
        style={{ fill: "black" }}
      >
        <a href="https://www.linkedin.com/company/shoppyscan" />
      </Image>
      <Image
        className="image"
        alt="added"
        src={x}
        width={60}
        height={60}
        style={{ fill: "black" }}
      >
        <a href="https://x.com/shoppyscan" />
      </Image>
    </div>
  );
};

export default SocialIcons;
