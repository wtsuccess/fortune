import Image from "next/image";
import buyTicketImage from "@/assets/images/buy_ticket.png";

export default function BuyTicket() {
  return (
    <div className="w-[706px] rounded-[20px] border-primary border-[3px]">
      <div className="pt-[27px] pb-[65px] bg-background rounded-t-[20px]">
        <Image
          src={buyTicketImage}
          alt="Buy Ticket"
          width={80}
          height={80}
          className="mx-auto"
        />
        <h2>Buy your Tickets</h2>
        <p className="title">1 ticket = 0.5STAX</p>
        <div className="flex gap-10 justify-center mt-12">
          <button className="rounded-full border-[3px] text-white w-14 h-14">-</button>
          <h2>10</h2>
          <button className="rounded-full border-[3px] text-white w-14 h-14">+</button>
        </div>
      </div>
      <div className="flex flex-col bg-[#2E3452] py-5 rounded-b-[20px]">
        <p className="title">Total</p>
        <h2 className="text-center">5 STAX</h2>
        <button className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text">
          Enter drop
        </button>
        <p className="text mt-5">
          You have bonus ?
        </p>
      </div>
    </div>
  );
}
