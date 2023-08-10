const { PublicKey } = require('@solana/web3.js');
const BN = require('bn.js'); // You'll need to install the bn.js package for this

class Pda extends PublicKey {
  constructor(value, bump) {
    super(value);
    this.bump = bump;
  }

  static find(programId, seeds) {
    const [publicKey, bump] = PublicKey.findProgramAddressSync(
      seeds,
      programId
    );

    return new Pda(publicKey, bump);
  }
}

// Assuming BUBBLEGUM_PROGRAM_ID, tree, and index are defined and valid
const BUBBLEGUM_PROGRAM_ID = new PublicKey('YOUR_BUBBLEGUM_PROGRAM_ID_HERE'); // Replace with your program ID
const tree = { toBuffer: () => Buffer.from('tL2TAswGPHjtCvxN9ez5y8TDrAU1Pxh8PEVmHC8tiyy') }; // Replace with your tree object
const index = new BN(0); // Replace with your index

const result = Pda.find(BUBBLEGUM_PROGRAM_ID, [
    Buffer.from("asset", "utf-8"),
    tree.toBuffer(),
    Uint8Array.from(new BN(index).toArray("le", 8)),
]);

console.log(result.toBase58());
