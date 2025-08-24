import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import initialAssets from '../../financial_assets.json';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from '../../components/Menu';
import AssetItem, { AssetFilter, AssetSort } from '../../components/AssetItem';
import styles from './Home.styles';

const PAGE_SIZE = 30;
type TAsset = (typeof initialAssets)[number][];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [assets, setAssets] = useState<TAsset>(initialAssets);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<AssetFilter>('all');
  const [sort, setSort] = useState<AssetSort>('nameAsc');

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prevAssets =>
        prevAssets.map(asset => ({
          ...asset,
          currentPrice: parseFloat((Math.random() * 5000 + 10).toFixed(2)),
        })),
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [assets]);

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    const nextAssets = initialAssets.slice(0, nextPage * PAGE_SIZE);
    if (nextAssets.length > assets.length) {
      setAssets(nextAssets);
      setPage(nextPage);
    }
  }, [page, assets.length]);

  const handleSort = useCallback((sortType: AssetSort) => {
    setSort(sortType);
    setAssets(prev =>
      [...prev].sort((a, b) => {
        switch (sortType) {
          case 'nameAsc':
            return a.name.localeCompare(b.name);
          case 'nameDesc':
            return b.name.localeCompare(a.name);
          case 'perfAsc':
            return a.dailyChangePercent - b.dailyChangePercent;
          case 'perfDesc':
            return b.dailyChangePercent - a.dailyChangePercent;
          default:
            return 0;
        }
      }),
    );
  }, []);

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      switch (filter) {
        case 'stock':
          return asset.type === 'stock';
        case 'crypto':
          return asset.type === 'crypto';
        case 'gainers':
          return asset.dailyChangePercent > 0;
        case 'losers':
          return asset.dailyChangePercent < 0;
        default:
          return true;
      }
    });
  }, [assets, filter]);

  return (
    <SafeAreaView style={styles.container} testID="home-screen">
      <Menu
        currentFilter={filter}
        currentSort={sort}
        onSort={handleSort}
        onFilter={setFilter}
      />
      <FlatList
        keyExtractor={asset => `${asset.id}`}
        testID="asset-list"
        data={filteredAssets}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={PAGE_SIZE}
        windowSize={7}
        removeClippedSubviews={true}
        renderItem={({ item: asset }) => (
          <AssetItem
            asset={asset}
            onPress={() =>
              navigation.navigate('AssetDetail', {
                asset,
                similarAssets: [...filteredAssets.slice(0, 10)],
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
