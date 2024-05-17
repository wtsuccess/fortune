export const shortenAddress = (address: `0x${string}`) => {
    const totalLength = address.length;
    return `${address.slice(0, 4)}...${address.slice(totalLength - 4, totalLength)}`;
};
