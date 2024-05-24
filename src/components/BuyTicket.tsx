import Image from "next/image";
import buyTicketImage from "@/assets/images/buy_ticket.png";
import { useEffect, useState } from "react";
import { drop, getTicketPrice } from "@/lib/contracts/drop";
import toast from "react-hot-toast";

export default function BuyTicket() {
  const [numTicket, setNumTicket] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);

  useEffect(() => {
    const fetchTicketPrice = async () => {
      const ticketPrice = await getTicketPrice();
      setTicketPrice(ticketPrice);
    };
    fetchTicketPrice()
  }, []);

  const decreaseNumTicket = () => {
    if (numTicket > 0) setNumTicket(numTicket - 1);
  };

  const increaseNumTicket = () => {
    setNumTicket(numTicket + 1);
  };

  const handleDrop = async () => {
    try {
      await drop(numTicket);
      toast.success("Transaction Successful!");
    } catch (err: any) {
      toast.error(err.message);
    }
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
        <p className="title mt-1">1 ticket = {ticketPrice} STAX</p>
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
        <h2 className="text-center lg:text-3xl">{numTicket * ticketPrice} STAX</h2>
        <button
          className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer hover:bg-sky-400 ease-in transition-all"
          onClick={handleDrop}
        >
          Enter drop
        </button>
        <p className="text mt-5">You have bonus ?</p>
      </div>
    </div>
  );
}
