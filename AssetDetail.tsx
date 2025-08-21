import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export type Asset = {
  id: number;
  name: string;
  symbol: string;
  type: string;
  currentPrice: number;
  dailyChangePercent: number;
};

type AssetDetailRoute = {
  params: {
    asset: Asset;
    similarAssets: Asset[];
  };
};

type AssetDetailProps = {
  route: AssetDetailRoute;
};

const AssetDetail: React.FC<AssetDetailProps> = ({ route }) => {
  const { asset, similarAssets } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{asset.name}</Text>
      <Text>Symbol: {asset.symbol}</Text>
      <Text>Type: {asset.type}</Text>
      <Text>Current Price: {asset.currentPrice}</Text>
      <Text>Daily Change %: {asset.dailyChangePercent}</Text>
      <Text>Similar Asset:</Text>
      <FlatList
        keyExtractor={item => `${item.id}`}
        data={similarAssets}
        windowSize={7}
        removeClippedSubviews={true}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>Name: {item.name}</Text>
            <Text>Price: {item.currentPrice}</Text>
            <Text>DPC: {item.dailyChangePercent}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  itemContainer: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: 10,
    borderRadius: 5,
  },
});

export default AssetDetail;
