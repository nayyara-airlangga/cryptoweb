interface CryptoInfo {
  name: string;
  description: string;
  iconUrl: string;
  links: CryptoLink[];
  slug: string;
  price: string;
  rank: number;
  volume: number;
  marketCap: number;
  allTimeHigh: { price: string };
  numberOfMarkets: number;
  numberOfExchanges: number;
  approvedSupply: boolean;
  totalSupply: number;
  circulatingSupply: number;
}

interface CryptoLink {
  name: string;
  type: string;
  url: string;
}

export default CryptoInfo;
