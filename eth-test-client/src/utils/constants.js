import abi from './Transactions.json';
import abiFalkToken from './FalkToken.json';
import abiEthSwap from './EthSwap.json';

export const contractABI = abi.abi;
export const contractAddress = '0x5Ea95Bf2b672409fe8386E0D125c51eB92868df0';

export const contractABIFalkToken = abiFalkToken.abi;
export const contractAddressFalkToken = abiFalkToken.networks[3].address;

export const contractABIEthSwap = abiEthSwap.abi;
export const contractAddressEthSwap = abiEthSwap.networks[3].address;