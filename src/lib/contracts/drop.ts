import { config } from '@/config/wallet'
import {
    simulateContract,
    readContract,
    waitForTransactionReceipt,
    writeContract,
    getAccount
} from '@wagmi/core';
import fortuneAbi from "@/lib/abi/fortune.json";
import staxAbi from "@/lib/abi/stax.json";
import { FORTUNE_ADDRESS, STAX_ADDRESS } from '@/config/env';
import { parseEther, formatEther } from 'viem';

export const drop = async (numTicket: number) => {
    const account = getAccount(config);

    if (!account.address) throw Error('Please connect your wallet');
    if (numTicket <= 0) throw Error('Ticket should be larger than 0');

    const openDrawId = await getOpenDrawId();
    const ticketPrice = await getTicketPrice();
    const totalPrice = numTicket * ticketPrice;
    const allowance = await getAllowance(account.address, FORTUNE_ADDRESS);

    if (allowance < parseEther(totalPrice + "")) {
        const tx = await approve(totalPrice);
    }

    const { request } = await simulateContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'enterMultiple',
        args: [openDrawId, numTicket],
    });
    const hash = await writeContract(config, request);
    const result = await waitForTransactionReceipt(config, { hash });
}

const approve = async (totalPrice: number) => {
    const { request } = await simulateContract(config, {
        abi: staxAbi,
        address: STAX_ADDRESS as `0x${string}`,
        functionName: 'approve',
        args: [FORTUNE_ADDRESS, parseEther(totalPrice + "")],
    });
    const hash = await writeContract(config, request);
    const result = await waitForTransactionReceipt(config, { hash });
}

const getAllowance = async (owner: `0x${string}`, spender: string) => {
    const allowance = await readContract(config, {
        abi: staxAbi,
        address: STAX_ADDRESS as `0x${string}`,
        functionName: 'allowance',
        args: [owner, spender],
    })
    return allowance as bigint;
}

const getOpenDrawId = async () => {
    const nextDrawId = await readContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'nextDrawId',
    });

    const openDrawId = Number(nextDrawId) - 1;
    return openDrawId;
}

export const getTicketPrice = async () => {
    const openDrawId = await getOpenDrawId();
    const draw: any = await readContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'draws',
        args: [openDrawId]
    });

    const ticketPrice = Number(formatEther(draw[3]));
    return ticketPrice;

}
