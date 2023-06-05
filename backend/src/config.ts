import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  ML_AUDIT_URL: 'http://13.50.55.163:8511/v1/api/aduit',
  TURTLESHELL_ADDRESS: {
    80001: '0x6F6408cc131001EfE2853955b46D948aCa13eeE5',
    420: '0x4e8EbD8f1225A01335Fcd851898df60555A36e17',
    59140: '0x6F6408cc131001EfE2853955b46D948aCa13eeE5',
  },
  PRIVATE_KEY: process.env.TURTLESHELL_PRIVATE_KEY,
  PINATA_API_KEY: process.env.PINATA_API_KEY,
  PINATA_SECRET_KEY: process.env.PINATA_SECRET_KEY,
  GOERLI_OPTIMISM_ETHERSCAN_API_KEY:
    process.env.GOERLI_OPTIMISM_ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY: process.env.POLYGONSCAN_API_KEY,
  LINEA_API_KEY: process.env.LINEA_API_KEY,
  ZKEVM_API_KEY: process.env.ZKEVM_POLYGONSCAN_API_KEY,
  ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
};

export default config;