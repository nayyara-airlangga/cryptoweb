interface Exchanges {
  name: string;
  id: number;
  rank: number;
  iconUrl: string;
  volume: number;
  numberOfMarkets: number;
  marketShare: number;
  description: string | null;
}

export default Exchanges;
