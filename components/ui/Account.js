"use client";

import { getProgram } from "@/utils/program"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast';
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { JsonInput } from '@mantine/core';

export default function Account () {

    const [account, setAccount] = useState([]);
    const [data, setData] = useState();
    const [key, setKey] = useState();
    const [inputKey, setInputKey] = useState();
    const [newData, setNewData] = useState();

    const { connection } = useConnection();
    const wallet = useWallet();

    const program = useMemo(()=>{
        if(wallet.publicKey) {
            return getProgram(connection, wallet);
        }
    },[connection, wallet]);

    const createAccount = async () => {
        try{
            if(!key || !data){
                toast.error("No data found!");
                return;
            }
            const keypair = Keypair.generate();
            console.log("New Account Public Key: ", keypair.publicKey.toBase58());
            console.log("Public Key: ", new PublicKey(key));
            console.log("system program id", SystemProgram.programId.toBase58());
    
            const txHash = await program.methods.initialize(
                parseInt(data),
                new PublicKey(key)
            ).accounts({
                newAccount: keypair.publicKey,
                signer: wallet.publicKey,
                systemProgram: SystemProgram.programId // "1111...." import { SystemProgram } from "@solana/web3.js";
            }).signers([
                keypair
            ]).rpc(); 
            // rpc() Error 1: Transaction fee payer required - due to provider not having wallet, error was using wallet.publicKey
            // Error 2: Signature verification failed. - due to missing signers([keypair]), if newAccount is a PDA, signer not required
            // Error 3: Error Code: InvalidProgramId. Error Number: 3008 - due to program.programId supplied as systemProgram, should be "1111...." import { SystemProgram } from "@solana/web3.js";
            
            // rpc() sends a signed transaction with the instruction and returns a signature
            // transaction() builds a transaction and adds the instruction without sending
            // instruction() builds a transaction instruction (used to combine with other instructions)
    
            console.log(`Transaction: ${txHash}` );
            toast.success(`Transaction: ${txHash}`);
        } catch(err){
            toast.error(err);
            console.log("Error: createAccount: ", err);
        }

    }

    // {
    //     "publicKey": "2vqRQnFgF9WD32bwsTZM65szFTQYtqKQfHWN1qFCko55",
    //     "account": {
    //       "data": 32,
    //       "owner": "DQ2SGiWBXsx6ttfthSB9e4Sgv5DkuZWCVkdknEmWRNaP"
    //     }
    //   }

    return (
        <div className="grid h-screen grid-cols-3">
            <div className="grid col-span-1 h-screen place-items-center border-teal-700 border-r-4 rounded-lg">
                <div className="p-4 flex flex-col justify-center items-center gap-4 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-5 dark:bg-gray-800 dark:border-gray-700">
                    <label className="font-semibold">Generate random data to store within the account</label>
                    <Input value={inputKey} readOnly className="w-96" placeholder="Public Key" />
                    <Input value={newData} readOnly className="w-96" placeholder="Data" />
                    <Button className="w-24" onClick={()=>{
                        const newKey = Keypair.generate();
                        setInputKey(newKey.publicKey.toBase58());
                        const newData = Math.floor(Math.random() * 100);
                        setNewData(newData);
                    }} variant="outline">Generate</Button>
                </div>
            </div>
            <div className="grid col-span-1 h-screen place-items-center border-teal-700 border-r-4 rounded-lg">
                <div className="p-4 flex flex-col justify-center items-center gap-4 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-5 dark:bg-gray-800 dark:border-gray-700">
                    <label className="font-semibold">Use the generated data to create new account</label>
                    <Input onChange={(e)=>{setKey(String(e.target.value))}} className="w-96" placeholder="Public Key: String" />
                    <Input onChange={(e)=>{setData(e.target.value)}} className="w-96" placeholder="Data: Number" />
                    <Button className="w-24" onClick={createAccount} variant="outline">Create</Button>
                </div>
            </div>
            <div className="grid col-span-1 h-screen place-items-center border-teal-700 border-r-4 rounded-lg">
                <div className="bg-gray-50 w-90 p-2 m-4 flex flex-col justify-center items-center">
                    <div className="overflow-auto">
                        {account.map((acc, i) => <div key={i} className="my-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col gap-4 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                <h1 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">Owner {acc.account.owner.toBase58()}</h1>
                                <h1 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">Data {acc.account.data}</h1>
                            </div>
                        </div>)
                        }
                    </div>

                <Button className="w-24" onClick={async ()=>{
                    try{
                        const accounts = await program.account.accountKey.all();
                        // all() to fetch all existing accounts for a specific account type
                        // fetch(ACCOUNT_ADDRESS) to get the account data for a specific account
                        // fetchMultiple() to get the account data for multiple accounts by passing
                        // an array of account addresses
                        setAccount(accounts);
                        toast.success("Info fetched")
                    } catch(err) {
                        toast.error("Wallet not connected!")
                    }
                }} variant="outline">Fetch</Button>
                </div>
            </div>
        </div>
    )
}