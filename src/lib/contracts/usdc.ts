import { config } from '@/config/wallet'
import {
    simulateContract,
    readContract,
    waitForTransactionReceipt,
    writeContract,
} from '@wagmi/core';
import usdcAbi from "@/lib/abi/usdc.json";
import { FORTUNE_ADDRESS, USDC_ADDRESS } from '@/config/env';
import { parseEther } from 'viem';

export const approve = async (totalPrice: number) => {
    const { request } = await simulateContract(config, {
        abi: usdcAbi,
        address: USDC_ADDRESS as `0x${string}`,
        functionName: 'approve',
        args: [FORTUNE_ADDRESS, parseEther(totalPrice + "")],
    });
    const hash = await writeContract(config, request);
    const approveResult = await waitForTransactionReceipt(config, { hash });
    console.log("approveResult", approveResult);
}

export const getAllowance = async (owner: `0x${string}`, spender: string) => {
    const allowance = await readContract(config, {
        abi: usdcAbi,
        address: USDC_ADDRESS as `0x${string}`,
        functionName: 'allowance',
        args: [owner, spender],
    });
    
    return allowance as bigint;
}

export const getBalance = async (address: string) => {
    const balance = await readContract(config, {
       abi: usdcAbi,
       address: USDC_ADDRESS as `0x${string}`,
       functionName: 'balanceOf',
       args: [address]
    });

    return balance as bigint;
}