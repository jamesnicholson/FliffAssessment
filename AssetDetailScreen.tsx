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

const AssetDetailScreen: React.FC<AssetDetailProps> = ({ route }) => {
  const { asset, similarAssets } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{asset.name}</Text>
      <Text style={styles.assetItemDetail}>Symbol: {asset.symbol}</Text>
      <Text style={styles.assetItemDetail}>Type: {asset.type}</Text>
      <Text style={styles.assetItemDetail}>
        Current Price: {asset.currentPrice}
      </Text>
      <Text style={styles.assetItemDetail}>
        Daily Change %: {asset.dailyChangePercent}
      </Text>
      <Text style={styles.title}>Similar Asset:</Text>

      <FlatList
        keyExtractor={item => `${item.id}`}
        data={similarAssets}
        windowSize={7}
        removeClippedSubviews={true}
        horizontal={true}
        contentContainerStyle={{ alignItems: 'baseline' }} // aligns items vertically
        showsHorizontalScrollIndicator={false}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151544',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: 10,
    borderRadius: 5,
  },
  assetItemDetail: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 5,
  },
});

export default AssetDetailScreen;
