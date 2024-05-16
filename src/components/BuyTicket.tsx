import Image from "next/image";
import buyTicketImage from "@/assets/images/buy_ticket.png";

export default function BuyTicket() {
  return (
    <div className="w-[706px] px-5 rounded-[20px]">
      <div>
        <Image
          src={buyTicketImage}
          alt="Buy Ticket"
          width={80}
          height={80}
          className="mx-auto"
        />
        <h2>Buy your Tickets</h2>
        <p className="title">1 ticket = 0.5STAX</p>
      </div>
      <div className="mx-auto flex flex-col bg-[#2E3452] py-5">
        <span className="font-bold text-[35px] leading-[40px] text-center">
          Total
        </span>
        <span className="text-center">5 STAX</span>
        <button className="bg-[#27AAE1] rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5">
          Enter drop
        </button>
        <p className="text-[16px] leading-normal bg-[#2E3452] text-center mt-5">
          You have bonus ?
        </p>
      </div>
    </div>
  );
}
