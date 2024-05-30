export const shortenAddress = (address: `0x${string}`) => {
    const totalLength = address.length;
    return `${address.slice(0, 4)}...${address.slice(totalLength - 4, totalLength)}`;
};

export const calculateCompletionPercentage = (balance: number, hardcap: number) => {
    console.log("balance", balance);
    console.log("hardcap", hardcap);
    
    const completionPercentage = (balance / hardcap) * 100;
    return completionPercentage;
};
