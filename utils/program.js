import { 
    Program, 
    AnchorProvider,
    setProvider,
} from "@coral-xyz/anchor";
import IDL from "./createAccountIDL.json";
import { PublicKey } from "@solana/web3.js";


export const getProgram = (connection, wallet) => {

    const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"});
    setProvider(provider);

    const programId = new PublicKey("5QWUcmZwcA9f3Ysff8mbvnNDte6U4Q7aF9hNyRrTKiGp");
    const program = new Program(IDL, programId, provider);

    // Alternative, we can create a program instance using the IDL and connection i.e. without wallet
    // const program = new Program<HelloAnchor>(IDL, programId, {
    //     connection,
    //   });

    return program;
}