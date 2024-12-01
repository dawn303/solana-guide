import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Guide1 } from "../target/types/guide_1";

import { Keypair, SystemProgram } from "@solana/web3.js"; // ...

describe("guide_1", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Guide1 as Program<Guide1>;

  it("Is initialized!", async () => {
    // Create a new account to initialize
    const newAccount = Keypair.generate();
    const lamports = await anchor
      .getProvider()
      .connection.getMinimumBalanceForRentExemption(8 + 32); // Account size: 8 + 32 bytes

    // Create a transaction to fund and create the account
    const tx = await anchor
      .getProvider()
      .connection.requestAirdrop(newAccount.publicKey, lamports);
    await tx; // Ensure the airdrop goes through

    // Now, initialize the account
    const transactionSignature = await program.methods
      .initialize()
      .accounts({
        myAccount: newAccount.publicKey, // The newly created account
        user: anchor.getProvider().publicKey, // Payer account

        // systemProgram 是 Anchor 自动处理的，因此你不需要显式传递它。
        // 在 Solana 的原生编程中，systemProgram 是必须显式传递的，它标识了系统程序的 ID，用于执行系统级操作，如账户创建、转账等。
        // systemProgram: SystemProgram.programId, // System program
      })
      .signers([newAccount]) // Sign the transaction with the new account
      .rpc();

    console.log("Your transaction signature", transactionSignature);
  });
});
