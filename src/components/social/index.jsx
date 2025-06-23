import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaTiktok,
  FaReddit,
  FaMedium,
} from "react-icons/fa6";
import { FaRedditAlien } from "react-icons/fa6";
import instagram from "../../app/images/instagram.svg";
import linkedin from "../../app/images/linkedIn.svg";
import facebook from "../../app/images/facebook.svg";
import x from "../../app/images/x.svg";
import Image from "next/image.js";

const SocialIcons = () => {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <a
        href="https://www.instagram.com/shoppyscan.ca/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="image"
          src={instagram}
          width={30}
          height={30}
          style={{ filter: "brightness(0)" }}
        />
      </a>
      {/* <a href="https://www.facebook.com/shoppyscan" target="_blank" rel="noopener noreferrer">
    <Image
      className="image"
      alt="Facebook"
      src={facebook}
      width={70}
      height={70}
      style={{ filter: "brightness(0)" }}
    />
  </a> */}
      <a
        href="https://www.linkedin.com/company/shoppyscan"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="image"
          alt="LinkedIn"
          src={linkedin}
          width={30}
          height={30}
          style={{ filter: "brightness(0)" }}
        />
      </a>
      <a
        href="https://x.com/shoppyscan"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="image"
          alt="X"
          src={x}
          width={25}
          height={25}
          style={{ filter: "brightness(0)" }}
        />
      </a>
      <a
        href="https://www.reddit.com/r/ShoppyScan/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaReddit style={{ width: "25", height: "25" }} />
      </a>
    </div>
  );
};

export default SocialIcons;
