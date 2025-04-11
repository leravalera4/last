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

const SocialIcons = () => {
  return (
<div style={{ display: "flex", gap: "1rem" }}>
  <a href="https://www.instagram.com/shoppyscan.ca/" target="_blank" rel="noopener noreferrer">
    <Image
      className="image"
      alt="Instagram"
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
  <a href="https://www.linkedin.com/company/shoppyscan" target="_blank" rel="noopener noreferrer">
    <Image
      className="image"
      alt="LinkedIn"
      src={linkedin}
      width={30}
      height={30}
      style={{ filter: "brightness(0)" }}
    />
  </a>
  <a href="https://x.com/shoppyscan" target="_blank" rel="noopener noreferrer">
    <Image
      className="image"
      alt="X"
      src={x}
      width={25}
      height={25}
      style={{ filter: "brightness(0)" }}
    />
  </a>
</div>

  );
};

export default SocialIcons;
