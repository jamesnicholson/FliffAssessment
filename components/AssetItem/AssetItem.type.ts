export type Asset = {
    id: number;
    name: string;
    symbol: string;
    type: string;
    currentPrice: number;
    dailyChangePercent: number;
};

export interface AssetProps {
    asset: Asset;
    onPress?: () => void;
}
export type AssetFilter = 'all' | 'stock' | 'crypto' | 'gainers' | 'losers';
export type AssetSort = 'nameAsc' | 'nameDesc' | 'perfAsc' | 'perfDesc';