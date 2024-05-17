// export const drop = async (numTicket: number) => {
//     console.log("numTicket", numTicket);
    
//     try {
//         // Recover the connected wallet
//         const accounts = await window.ethereum.request({
//             method: "eth_accounts",
//         });

//         // Verify if the wallet is connected
//         const balanceWithZeros = await getBalance(accounts[0]);
//         const balanceWithoutZeros = balanceWithZeros / 1e18;
//         if (balanceWithoutZeros < XFull) {
//             const transaction = await enterMultiple(numTickets);
//             console.log("waiting for transaction to be mined...");
//             await transaction.wait();
//             console.log(
//                 `Transaction successful! ${accounts[0]} bought ${numTickets} tickets.`
//             );

//             // Handle the transaction success or other logic here
//             setTransactionSuccessful(true);
//         } else {
//             console.log("Fortune is full.");
//             alert("Fortune is full.");
//         }
//     } catch (error) {
//         console.error("Error entering fortune:", error);
//         alert("You don't have enough USDC to enter Fortune.");
//         // Handle the error, show a message to the user, etc.
//     }
// };

// const handleApprove = async () => {
//     if (numTickets > 0) {
//         try {
//             // Recover the connected wallet
//             const accounts = await window.ethereum.request({
//                 method: "eth_accounts",
//             });
//             console.log("accounts", accounts);

//             // Verify if the wallet is connected
//             if (accounts.length > 0) {
//                 const approveTransaction = await approve(numTickets);
//                 console.log("waiting for approval transaction to be mined...");
//                 setWaitingApproval(true);
//                 await approveTransaction.wait();
//                 console.log("Transaction successful!");

//                 // Handle the approval success or other logic here
//                 setApprovalStatus(true);
//                 setWaitingApproval(false);
//                 setButtonsDisabled(true);
//             } else {
//                 console.log("No connected wallet. Please connect your wallet.");
//             }
//         } catch (error) {
//             console.error("Error approving:", error);
//             setWaitingApproval(false);
//             setButtonsDisabled(false);
//             // Handle the error, show a message to the user, etc.
//         }
//     } else {
//         console.log("Cannot enter Fortune with 0 tickets.");
//         alert("You cannot enter Fortune with 0 tickets.");
//         // Optionally, you can show a message to the user indicating they cannot enter Fortune with 0 tickets.
//     }
// };