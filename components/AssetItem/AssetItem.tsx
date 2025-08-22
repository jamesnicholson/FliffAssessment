import { Text, TouchableOpacity, View } from 'react-native';
import { AssetProps } from './AssetItem.type';
import styles from './AssetItem.style';

const AssetItem: React.FC<AssetProps> = ({ asset, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.assetContainer}>
        <View>
          <Text style={styles.assetLabel}>
            <Text style={styles.assetValue}>{asset.name}</Text>
          </Text>

          <Text style={styles.assetLabel}>
            {'DPC: '}
            <Text style={styles.assetValue}>{asset.dailyChangePercent}</Text>
          </Text>
          <Text style={styles.assetLabel}>
            {'Asset Price: '}
            <Text style={styles.assetValue}>{asset.currentPrice}</Text>
          </Text>
        </View>
        <View style={styles.symbol}>
          <Text style={styles.symbolText}>{asset.symbol}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AssetItem;
