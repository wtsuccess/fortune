import { config } from '@/config/wallet'
import {
    simulateContract,
    readContract,
    waitForTransactionReceipt,
    writeContract,
    getAccount
} from '@wagmi/core';
import fortuneAbi from "@/lib/abi/fortune.json";
import { FORTUNE_ADDRESS } from '@/config/env';
import { parseEther, formatEther } from 'viem';
import { approve, getAllowance } from './usdc';

export const drop = async (numTicket: number) => {
    const account = getAccount(config);

    if (!account.address) throw Error('Please connect your wallet');
    if (numTicket <= 0) throw Error('Ticket should be larger than 0');

    const openDrawId = await getOpenDrawId();

    const draw = await getDraw();
    const ticketPrice = Number(formatEther(draw[2]));
    
    const totalPrice = numTicket * ticketPrice;
    const allowance = await getAllowance(account.address, FORTUNE_ADDRESS);
    console.log("allowance", allowance);
    
    if (allowance < parseEther(totalPrice + "")) {
        const approveTx = await approve(totalPrice);
        console.log("approveTx", approveTx);
    }

    const { request } = await simulateContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'enterMultiple',
        args: [openDrawId, numTicket],
    });
    const hash = await writeContract(config, request);
    const dropResult = await waitForTransactionReceipt(config, { hash });
    console.log("dropResult", dropResult);
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

export const getDraw = async () => {
    const openDrawId = await getOpenDrawId();

    const draw: any = await readContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'draws',
        args: [openDrawId]
    });
    
    return draw;
}

export const getDistributionRate = async () => {
    const distributionRate: any = await readContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'distributionRate',
    });

    return distributionRate;
}