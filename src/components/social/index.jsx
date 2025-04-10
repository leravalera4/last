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
    <div className="flex justify-center gap-6 py-4 text-2xl text-gray-600">
      <Image
        className="image"
        alt="added"
        src={instagram}
        width={70}
        height={70}
        style={{ fill: 'black'}}
      />
      <Image
        className="image"
        alt="added"
        src={facebook}
        width={70}
        height={70}
        style={{ fill: 'black'}}
      />
      <Image
        className="image"
        alt="added"
        src={linkedin}
        width={70}
        height={70}
        style={{ fill: 'black'}}
      />
      <Image className="image" alt="added" src={x} width={70} height={70} style={{ fill: 'black'}} />
    </div>
  );
};

export default SocialIcons;
