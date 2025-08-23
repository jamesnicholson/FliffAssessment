import React from 'react';
import { View, Text, FlatList } from 'react-native';
import AssetItem from '../../components/AssetItem/AssetItem';
import styles from './AssetDetails.styles';
import { AssetDetailProps } from './AssetDetails.types';

export const AssetDetailScreen: React.FC<AssetDetailProps> = ({ route }) => {
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
        contentContainerStyle={{ alignItems: 'baseline' }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <AssetItem asset={item} />}
      />
    </View>
  );
};
