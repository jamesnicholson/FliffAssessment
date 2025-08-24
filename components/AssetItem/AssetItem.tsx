import { Text, TouchableOpacity, View } from 'react-native';
import { AssetProps } from './AssetItem.type';
import styles from './AssetItem.styles';

const AssetItem: React.FC<AssetProps> = ({ asset, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} testID={`asset-item-${asset.id}`}>
      <View style={styles.assetContainer}>
        <View>
          <Text style={styles.assetLabel} testID={`asset-name`}>
            <Text style={styles.assetValue}>{asset.name}</Text>
          </Text>

          <Text style={styles.assetLabel}>
            {'DPC: '}
            <Text style={styles.assetValue}>{asset.dailyChangePercent}</Text>
          </Text>
          <Text style={styles.assetLabel} testID={`asset-price`}>
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
