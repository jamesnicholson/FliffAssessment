export type TAsset = {
  id: number;
  name: string;
  sybmol: string;
  type: 'stock' | 'crypto';
  currentPrice: number;
  dailyChangePercent: number;
}[];

export type AssetFilter = 'all' | 'stock' | 'crypto' | 'gainers' | 'losers';
export type AssetSort = 'nameAsc' | 'nameDesc' | 'perfAsc' | 'perfDesc';