import cx from "classnames";

import MetamaskImage from "@/assets/images/metamask.png";
import Image from "next/image";
import { openSans } from "@/app/fonts";

export default function HeroSection() {
  return (
    <div className="h-[708px] relaitve flex items-center justify-center overflow-hidden bg-[url('/assets/images/hero_background.png')] bg-cover bg-center">
      <div className="absolute top-5 w-full">
        <div className="max-w-[1560px] w-full mx-auto px-5 flex justify-end">
          <button className="py-[15px] px-10 flex items-center gap-2.5 rounded-full bg-[#ECECEC]">
            <Image src={MetamaskImage} alt="Metamask" width={32} height={32} />
            <p className="text-black text-base font-medium">
              Login with Meta Mask
            </p>
          </button>
        </div>
      </div>
      <div className="container">
        <div className="max-w-[690px] mx-auto">
          <h4 className="text-primary">PolarFI Fortune</h4>
          <h1 className="text-text">Get the Jackpot</h1>
          <p className={cx("text text-text", openSans.className)}>
            Welcome to the PolarFi Drop where dreams come true and the
            possibilities are endless. Buy tickets to participate in our global
            prize pool which is growing every moment!
          </p>
          <p className={cx("text mt-1 text-text", openSans.className)}>
            The more tickets you buy, the greater your chances of winning this
            gargantuan prize pool. Don&apos;t wait any longer, turn your
            investment into a fabulous victory !
          </p>
          <button className="rounded-full h-[54px] w-[196px] font-semibold text-text bg-blue block mx-auto mt-6">
            Buy ticket
          </button>
        </div>
      </div>
    </div>
  );
}
