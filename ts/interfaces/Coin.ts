interface Coin {
  id: number;
  uuid: string;
  slug: string;
  symbol: string;
  name: string;
  description: string;
  rank: number;
  iconUrl: string;
  price: string;
  marketCap: number;
  change: number;
}

export default Coin;
