import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Asset } from './components/AssetItem/AssetItem.type';
import AssetItem from './components/AssetItem/AssetItem';

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
      <View style={styles.item}>
        <Text style={styles.title}>{asset.name}</Text>
        <Text style={styles.itemDetail}>Symbol: {asset.symbol}</Text>
        <Text style={styles.itemDetail}>Type: {asset.type}</Text>
        <Text style={styles.itemDetail}>
          Current Price: {asset.currentPrice}
        </Text>
        <Text style={styles.itemDetail}>
          Daily Change %: {asset.dailyChangePercent}
        </Text>
      </View>
      <Text style={styles.title}>Similar Asset:</Text>
      <FlatList
        keyExtractor={item => `${item.id}`}
        data={similarAssets}
        windowSize={7}
        removeClippedSubviews={true}
        horizontal={true}
        contentContainerStyle={{ alignItems: 'baseline' }} // aligns items vertically
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <AssetItem asset={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#151544',
    paddingTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  item: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: 10,
    borderRadius: 5,
    marginBottom: 35,
  },
  itemDetail: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AssetDetailScreen;
