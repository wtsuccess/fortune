import Image from "next/image";
import logo from "@/assets/images/logo.png";

import discord from "@/assets/images/discord.png";
import twitter from "@/assets/images/twitter.png";
import instagram from "@/assets/images/instagram.png";

const Footer = () => {
  return (
    <footer className="flex">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Image src={logo} alt="PolarFi Logo" width={55} height={55} />
          <span>PolarFi</span>
        </div>
        <div className="flex justify-center items-center">
          <Image src={twitter} alt="Twitter" width={33} height={33} />
          <Image src={discord} alt="Discord" width={33} height={33} />
          <Image src={instagram} alt="Instagram" width={33} height={33} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
