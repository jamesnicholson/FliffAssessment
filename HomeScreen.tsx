import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
} from "react-native";

import initialAssets from "./financial_assets.json";

type TAsset = (typeof initialAssets)[number][];
const PAGE_SIZE = 30;

const HomeScreen: React.FC = () => {
  const [assets, setAssets] = useState<TAsset>(initialAssets);
  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const nextAssets = initialAssets.slice(0, nextPage * PAGE_SIZE);
    if (nextAssets.length > assets.length) {
      setAssets(nextAssets);
      setPage(nextPage);
    }
  };
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

  const handleSortAsc = (): void =>
    setAssets(
      assets.sort((a, b) => a.dailyChangePercent - b.dailyChangePercent),
    );

  const handleSortDesc = (): void =>
    setAssets(
      assets.sort((a, b) => b.dailyChangePercent - a.dailyChangePercent),
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sorting:</Text>
      <View style={styles.betweenContainer}>
        <Button title={"Sort Perf asc"} onPress={handleSortAsc} />
        <Button title={"Sort Perf desc"} onPress={handleSortDesc} />
        <Button title={"Sort Name asc"} />
        <Button title={"Sort Name desc"} />
      </View>
      <FlatList
        keyExtractor={asset => `${asset.id}`}
        data={assets}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={PAGE_SIZE}
        windowSize={7}
        removeClippedSubviews={true}
        renderItem={({ item: asset }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>
              {"Asset Name: "}
              <Text style={styles.itemValue}>{asset.name}</Text>
            </Text>
            <Text style={styles.itemLabel}>
              {"Asset Price: "}
              <Text style={styles.itemValue}>{asset.currentPrice}</Text>
            </Text>
            <Text style={styles.itemLabel}>
              {"DPC: "}
              <Text style={styles.itemValue}>{asset.dailyChangePercent}</Text>
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151544",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.05)",
    margin: 10,
    borderRadius: 5,
  },
  itemLabel: {
    color: "#fff",
    fontSize: 14,
  },
  itemValue: {
    fontWeight: "bold",
  },
  betweenContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

export default HomeScreen;
