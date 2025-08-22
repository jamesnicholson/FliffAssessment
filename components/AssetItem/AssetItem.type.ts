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