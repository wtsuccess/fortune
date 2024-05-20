'use client'

import Footer from "@/components/layouts/Footer";
import { PropsWithChildren, useState } from "react";
import BubbleImage from "@/assets/images/bubble.png";
import Image from "next/image";
import React from "react";
import cx from "classnames";

export default function RootTemplate({ children }: PropsWithChildren) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      {children}
      <Footer />
      <Image
        src={BubbleImage}
        alt="Bubble"
        width={64}
        height={64}
        
        className="fixed bottom-4 left-4 animate-[spin_4s_linear_infinite] cursor-pointer z-10"
        onClick={() => setShow(true)}
      />
      <div
        className={cx(
          "fixed h-screen w-screen z-50 flex bottom-0 left-0 items-center justify-center transition-all ease-in-out duration-300 bg-black/20",
          show
            ? "pointer-events-auto opacity-100 h-screen w-screen scale-100"
            : "pointer-events-none opacity-0 h-0 w-0 scale-0"
        )}
      >
        <iframe
          title="PolarFi Fortune Widget"
          src="https://swapspace.co/widget/4c494778f45d93c66ad9431e"
          width="404px"
          height="536px"
          style={{
            zIndex: 10,
            width: "404px",
            height: "536px",
            borderRadius: "20px",
            // "@media screen and (maxWidth: 403px)": {
            //   width: "100%",
            //   height: "617px",
            // },
            // "@media screen and (maxWidth: 353px)": {
            //   width: "353px",
            //   height: "617px",
            // },
          }}
        />
        <div className="absolute inset-0" onClick={() => setShow(false)}></div>
      </div>
    </div>
  );
}
