import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import initialAssets from "./financial_assets.json";


import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App";


type TAsset = (typeof initialAssets)[number][];
type AssetFilter = "all" | "stock" | "crypto" | "gainers" | "losers"
const PAGE_SIZE = 30;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [assets, setAssets] = useState<TAsset>(initialAssets);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<AssetFilter>("all");

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

  const handleSortNameAsc = (): void =>
    setAssets(
      [...assets].sort((a, b) => a.name.localeCompare(b.name)),
    );

  const handleSortNameDesc = (): void =>
    setAssets(
      [...assets].sort((a, b) =>  b.name.localeCompare(a.name)),
    );
    
  const handleSortPerfAsc = (): void =>
    setAssets(
      [...assets].sort((a, b) => a.dailyChangePercent - b.dailyChangePercent)
    );

  const handleSortPerfDesc = (): void =>
    setAssets(
      [...assets].sort((a, b) => b.dailyChangePercent - a.dailyChangePercent)
    );
    
const filteredAssets = assets.filter(asset => {
  switch (filter) {
    case "stock":
      return asset.type === "stock";
    case "crypto":
      return asset.type === "crypto";
    case "gainers":
      return asset.dailyChangePercent > 0;
    case "losers":
      return asset.dailyChangePercent < 0;
    default:
      return true;
  }
});

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sorting:</Text>
      <View style={styles.betweenContainer}>
        <Button title={"Sort Perf asc"} onPress={handleSortPerfAsc} />
        <Button title={"Sort Perf desc"} onPress={handleSortPerfDesc} />
        <Button title={"Sort Name asc"} onPress={handleSortNameAsc}/>
        <Button title={"Sort Name desc"} onPress={handleSortNameDesc} />
        <Button title={"All"} onPress={() => setFilter("all")} />
        <Button title={"Filter by stock"} onPress={() => setFilter("stock")} />
        <Button title={"Filter by crypto"} onPress={() => setFilter("crypto")} />
        <Button title={"Top gainers"} onPress={() => setFilter("gainers")} />
        <Button title={"Top losers"} onPress={() => setFilter("losers")} />
      </View>
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
            onPress={() => navigation.navigate("AssetDetail", { asset })}
          >
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
          </TouchableOpacity>
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
