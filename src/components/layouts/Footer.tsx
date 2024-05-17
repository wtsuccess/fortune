import Image from "next/image";
import logo from "@/assets/images/logo.png";

import discord from "@/assets/images/discord.png";
import twitter from "@/assets/images/twitter.png";
import instagram from "@/assets/images/instagram.png";

const Footer = () => {
  return (
    <footer className="py-10 bg-[#0D0F14]">
      <div className="container">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center gap-4">
            <Image src={logo} alt="PolarFi Logo" width={55} height={55} />
            <span>PolarFi</span>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button>
              <Image src={twitter} alt="Twitter" width={33} height={33} />
            </button>
            <button>
              <Image src={discord} alt="Discord" width={33} height={33} />
            </button>
            <button>
              <Image src={instagram} alt="Instagram" width={33} height={33} />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[50px]">
          <p className="bottom">
            Copyright © 2023 Polar GameFi. All rights reserved.
          </p>
          <p className="bottom">Terms and Conditions | Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
