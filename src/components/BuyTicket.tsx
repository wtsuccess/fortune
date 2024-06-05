import Image from "next/image";
import buyTicketImage from "@/assets/images/buy_ticket.png";
import { useEffect, useState } from "react";
import {
  drop,
  getDepositedAmount,
  getDraw,
  getIsExpired,
  getIsRefund,
  refund,
} from "@/lib/contracts/drop";
import toast from "react-hot-toast";
import { formatEther } from "viem";

export default function BuyTicket() {
  const [numTicket, setNumTicket] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [isExpired, setIsExpired] = useState();
  const [depositedAmount, setDepositedAmount] = useState<number>(0);
  const [status, setStatus] = useState();
  const [isRefunded, setIsRefunded] = useState<boolean>(false);

  useEffect(() => {
    const fetchTicketPrice = async () => {
      const draw = await getDraw();
      const ticketPrice = Number(formatEther(draw[2]));
      setTicketPrice(ticketPrice);
    };
    fetchTicketPrice();
  }, [ticketPrice]);

  useEffect(() => {
    const fetchIsExpired = async () => {
      const isExpired = await getIsExpired();
      console.log("isExpired", isExpired);
      setIsExpired(isExpired);
    };
    fetchIsExpired();
  }, [isExpired]);

  useEffect(() => {
    const fetchDepositedAmount = async () => {
      const depositedAmount = await getDepositedAmount();
      setDepositedAmount(depositedAmount);
    };
    fetchDepositedAmount();
  }, [depositedAmount]);

  useEffect(() => {
    const fetchStatus = async () => {
      const draw = await getDraw();
      const status = draw[1];
      console.log("status", status);

      setStatus(status);
    };
    fetchStatus();
  }, [status]);

  useEffect(() => {
    const fetchIsRefunded = async () => {
      const isRefunded = await getIsRefund();
      setIsRefunded(isRefunded);
    };
    fetchIsRefunded();
  }, [isRefunded]);

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

  const handleRefund = async () => {
    try {
      await refund();
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
        <h2 className="lg:text-3xl mt-1">
          {!isExpired && status === 1 && "Buy Your Tickets"}
          {!isExpired && status === 3 && "Draw Closed"}
          {isExpired && "Draw Expired"}
        </h2>
        {!isExpired && status === 1 && (
          <>
            <p className="title mt-1">1 ticket = {ticketPrice} USDC</p>
            <div className="flex gap-10 justify-center items-center mt-12 lg:mt-6">
              <button
                className="rounded-full border-[3px] text-white w-14 h-14 text-3xl cursor-pointer"
                onClick={() => decreaseNumTicket()}
                disabled={!isExpired && status === 1 ? false : true}
              >
                -
              </button>
              <h2>{numTicket}</h2>
              <button
                className="rounded-full border-[3px] text-white w-14 h-14 text-3xl cursor-pointer"
                onClick={() => increaseNumTicket()}
                disabled={!isExpired && status === 1 ? false : true}
              >
                +
              </button>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col bg-[#2E3452] py-5 px-[30px] rounded-b-[20px]">
        {!isExpired && status === 1 && (
          <>
            <p className="title">Total</p>
            <h2 className="text-center lg:text-3xl">
              {numTicket * ticketPrice} USDC
            </h2>
            <button
              className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer hover:bg-sky-400 ease-in transition-all"
              onClick={handleDrop}
            >
              Enter Drop
            </button>
            <p className="text mt-5">You have bonus ?</p>
          </>
        )}

        {isExpired && depositedAmount > 0 && !isRefunded && (
          <button
            className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer hover:bg-sky-400 ease-in transition-all"
            onClick={handleRefund}
          >
            Withdraw USDC
          </button>
        )}

        {isExpired && depositedAmount > 0 && isRefunded && (
          <button
            className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer hover:bg-sky-400 ease-in transition-all"
            disabled
          >
            Already Refunded
          </button>
        )}

        {isExpired && depositedAmount === 0 && (
          <button
            className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer hover:bg-sky-400 ease-in transition-all"
            disabled
          >
            Notify me when new available
          </button>
        )}

        {!isExpired && status === 3 && (
          <button
            className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer hover:bg-sky-400 ease-in transition-all"
            disabled
          >
            Notify me when new available
          </button>
        )}
      </div>
    </div>
  );
}
