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
import { parseEther } from 'viem';

export const drop = async (numTicket: number) => {
    const account = getAccount(config);

    if (!account.address) throw Error('Please connect your wallet');
    if (numTicket <= 0) throw Error('Ticket should be larger than 0');

    const allowance = await getAllowance(account.address, FORTUNE_ADDRESS);

    if (allowance < parseEther(numTicket + "")) {
        const tx = await approve(numTicket);
    }

    const { request } = await simulateContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'enterMultiple',
        args: [3, numTicket],
    });
    const hash = await writeContract(config, request);
    const result = await waitForTransactionReceipt(config, { hash });
}

const approve = async (numTicket: number) => {
    const { request } = await simulateContract(config, {
        abi: staxAbi,
        address: STAX_ADDRESS as `0x${string}`,
        functionName: 'approve',
        args: [FORTUNE_ADDRESS, parseEther(numTicket + "")],
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
