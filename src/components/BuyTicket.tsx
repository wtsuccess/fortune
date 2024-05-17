import Image from "next/image";
import buyTicketImage from "@/assets/images/buy_ticket.png";
import { useState } from "react";
import { drop } from "@/lib/contracts/drop";

export default function BuyTicket() {
  const [numTicket, setNumTicket] = useState(0);
  const decreaseNumTicket = () => {
    if (numTicket > 0) setNumTicket(numTicket - 1);
  };

  const increaseNumTicket = () => {
    setNumTicket(numTicket + 1);
  };

  return (
    <div className="rounded-[20px] border-primary border-[3px]">
      <div className="bg-background rounded-t-[20px] pt-[30px] pb-[64px] px-[30px] lg:pb-6">
        <Image
          src={buyTicketImage}
          alt="Buy Ticket"
          width={80}
          height={80}
          className="mx-auto"
        />
        <h2 className="lg:text-3xl mt-1">Buy your Tickets</h2>
        <p className="title mt-1">1 ticket = 0.5STAX</p>
        <div className="flex gap-10 justify-center items-center mt-12 lg:mt-6">
          <button
            className="rounded-full border-[3px] text-white w-14 h-14 text-3xl"
            onClick={() => decreaseNumTicket()}
          >
            -
          </button>
          <h2>{numTicket}</h2>
          <button
            className="rounded-full border-[3px] text-white w-14 h-14 text-3xl"
            onClick={() => increaseNumTicket()}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-[#2E3452] py-5 px-[30px] rounded-b-[20px]">
        <p className="title">Total</p>
        <h2 className="text-center lg:text-3xl">{numTicket * 5} STAX</h2>
        <button
          className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer"
          onClick={() => drop(numTicket)}
        >
          Enter drop
        </button>
        <p className="text mt-5">You have bonus ?</p>
      </div>
    </div>
  );
}
