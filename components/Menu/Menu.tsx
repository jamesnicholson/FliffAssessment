import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Menu.styles';
import type { MenuProps } from './Menu.types';
import { AssetFilter, AssetSort } from '../AssetItem';

const Menu: React.FC<MenuProps> = ({
  currentSort,
  currentFilter,
  onSort,
  onFilter,
}) => {
  const sortOptions = [
    { label: 'Name  (a-z)', value: 'nameAsc' },
    { label: 'Name  (z-a)', value: 'nameDesc' },
    { label: 'Price  ▲', value: 'perfDesc' },
    { label: 'Price  ▼', value: 'perfAsc' },
  ];

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Stock', value: 'stock' },
    { label: 'Crypto', value: 'crypto' },
    { label: 'Top Gainers', value: 'gainers' },
    { label: 'Top Losers', value: 'losers' },
  ];

  return (
    <View style={styles.menuWrapper}>
      <Text style={styles.subMenu}>Sort By</Text>
      <View style={styles.betweenContainer}>
        {sortOptions.map(option => (
          <TouchableOpacity
            key={option.value}
            testID={`sort-button-${option.value}`}
            style={[
              styles.button,
              currentSort === option.value && styles.buttonSelected,
            ]}
            onPress={() => onSort(option.value as AssetSort)}
          >
            <Text style={styles.buttonText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.subMenu}>Filter By</Text>
      <View style={styles.betweenContainer}>
        {filterOptions.map(option => (
          <TouchableOpacity
            key={option.value}
            testID={`filter-button-${option.value}`}
            style={[
              styles.button,
              currentFilter === option.value && styles.buttonSelected,
            ]}
            onPress={() => onFilter(option.value as AssetFilter)}
          >
            <Text style={styles.buttonText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Menu;
