import { StyleSheet } from 'react-native';

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
    backgroundColor: '#4f46e5',
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

export default styles;
