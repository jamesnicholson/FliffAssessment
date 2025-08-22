import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import initialAssets from './financial_assets.json';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from './components/Menu/Menu';
import { AssetFilter, AssetSort } from './types';

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
    <SafeAreaView style={styles.container}>
      <Menu
        currentFilter={filter}
        currentSort={sort}
        onSort={handleSort}
        onFilter={setFilter}
      />
      <FlatList
        keyExtractor={asset => `${asset.id}`}
        data={filteredAssets}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={PAGE_SIZE}
        windowSize={7}
        removeClippedSubviews={true}
        renderItem={({ item: asset }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AssetDetail', {
                asset,
                similarAssets: [...filteredAssets.slice(0, 10)],
              })
            }
          >
            <View style={styles.itemContainer}>
              <View style={styles.assetInfo}>
                <Text style={styles.itemLabel}>
                  <Text style={styles.itemValue}>{asset.name}</Text>
                </Text>
                <Text style={styles.itemLabel}>
                  {'Asset Price: '}
                  <Text style={styles.itemValue}>{asset.currentPrice}</Text>
                </Text>
                <Text style={styles.itemLabel}>
                  {'DPC: '}
                  <Text style={styles.itemValue}>
                    {asset.dailyChangePercent}
                  </Text>
                </Text>
              </View>
              <View style={styles.symbol}>
                <Text style={styles.symbolText}>{asset.symbol}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151544',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  buttonSelected: {
    backgroundColor: '#4f46e5', // A distinct color for the selected state.
  },

  itemContainer: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    color: '#fff',
    fontSize: 14,
  },
  assetInfo: {},
  symbol: {
    borderRadius: 5,
    backgroundColor: '#4f46e5',
    color: '#fff',
    padding: 5,
    maxWidth: 35,
    maxHeight: 35,
    alignItems: 'center',
  },
  symbolText: {
    borderRadius: 25,
    padding: 5,
    fontSize: 11,
    fontWeight: 'bold',
  },
  itemValue: {
    fontWeight: 'bold',
  },
  betweenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  menuWrapper: {
    margin: 10,
  },
  subMenu: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HomeScreen;
