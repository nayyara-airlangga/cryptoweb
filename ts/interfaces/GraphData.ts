interface GraphData {
  coinHistory: CoinHistory | undefined;
  coinName: string;
  currentPrice: string;
}

export interface CoinHistory {
  change: string;
  history: { price: string; timestamp: number }[];
}

export default GraphData;
