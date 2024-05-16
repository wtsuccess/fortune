import Image, { StaticImageData } from "next/image";

interface IStep {
  image: StaticImageData;
  title: string;
  description: string;
}

export default function Card({ step }: { step: IStep }) {
  return (
    <div className="w-[354px] p-10 bg-[#1D1E2E] mx-6">
      <Image
        src={step.image}
        alt="Connect Wallet"
        width={70}
        height={70}
        className="mx-auto"
      />
      <h3 className="text-[#ECECEC] mt-8">{step.title}</h3>
      <p className="title mt-3">{step.description}</p>
    </div>
  );
}
