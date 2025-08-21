import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type Asset = {
  name: string;
  symbol: string;
  type: string;
  currentPrice: number;
  dailyChangePercent: number;
};

type AssetDetailRoute = {
  params: {
    asset: Asset;
  };
};

type AssetDetailProps = {
  route: AssetDetailRoute;
};

const AssetDetail: React.FC<AssetDetailProps> = ({ route }) => {
  const { asset } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{asset.name}</Text>
      <Text>Symbol: {asset.symbol}</Text>
      <Text>Type: {asset.type}</Text>
      <Text>Current Price: {asset.currentPrice}</Text>
      <Text>Daily Change %: {asset.dailyChangePercent}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

export default AssetDetail;
