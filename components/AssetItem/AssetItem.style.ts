import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  assetContainer: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assetLabel: {
    color: '#fff',
    fontSize: 14,
  },
  assetValue: {
    fontWeight: 'bold',
  },
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
});

export default styles;