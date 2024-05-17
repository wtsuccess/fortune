"use client";

import connectWalletImage from "@/assets/images/connect_wallet.png";
import buyTicketImage from "@/assets/images/buy_ticket.png";
import drawImage from "@/assets/images/draw.png";
import Card from "@/components/Card";
import BuyTicket from "../BuyTicket";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import GradientImage from "@/assets/images/bg_gradient.png";

const steps: { image: StaticImageData; title: string; description: string }[] =
  [
    {
      image: connectWalletImage,
      title: "1.Connect Wallet",
      description: "Connect easily with your wallet (Metamask etc...)",
    },
    {
      image: buyTicketImage,
      title: "2.Buy tickets",
      description:
        "Buy as many tickets as you want, increase your chances of winning!",
    },
    {
      image: drawImage,
      title: "3.Wait for the draw",
      description: "Try to win the jackpot of 20.000AVAX !",
    },
  ];

export default function TicketSection() {
  const [progress, setProgress] = useState<number>(0);

  return (
    <div className="py-[116px] lg:pt-0 relative">
      <div className="relative z-10 container">
        <div className="grid grid-cols-3 max-w-[1176px] w-full mx-auto justify-center gap-12 lg:grid-cols-1">
          {steps.map((step, i) => (
            <Card step={step} key={i} />
          ))}
        </div>
        <div className="max-w-[920px] my-[116px] mx-auto">
          <p className="font-bold text-[40px] leading-normal text-center">
            Only <span className="bg-primary">15.000</span> to go
          </p>
          <p className="font-bold text-[20px] leading-normal text-center">
            before trying to win 20,000AVAX
          </p>
          <div className="relative pt-4 mt-[35px]">
            <p className="absolute -bottom-10 left-0">0</p>
            <p className="absolute -bottom-10 right-0">
              20.000
            </p>
            <p
              className="absolute bottom-2 -translate-x-1/2"
              style={{ left: `${progress / 0.2}%` }}
            >
              {progress}
            </p>
            <Slider
              className="mySlider"
              onChange={(e) => setProgress(e as number)}
              min={0}
              max={20.0}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <BuyTicket />
        </div>
      </div>
      <Image
        src={GradientImage}
        alt="Gradient"
        className="w-screen absolute bottom-0"
      />
    </div>
  );
}
