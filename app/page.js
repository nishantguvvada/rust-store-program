"use client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import Wallet from "@/components/ui/Wallet";
import Account from "@/components/ui/Account";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";

export default function Home() {

  return (
    <div>
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Wallet/>
            <MantineProvider>
              <Account/>
            </MantineProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      <Toaster/>
    </div>
  );
}
