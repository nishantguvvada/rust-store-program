"use client";
import { 
    WalletMultiButton, 
    WalletDisconnectButton 
} from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Wallet() {

    return (
            <div className="flex flex-row justify-between items-center w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 className="mb-1 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-800 from-indigo-400">NG</span><span className="text-transparent bg-clip-text bg-gradient-to-r to-rose-950 from-violet-700">X.</span></h1>
                <div className="flex justify-center items-center gap-4 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <WalletMultiButton/>
                    <WalletDisconnectButton/>
                </div>
            </div>
    )
}