import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuWrapper: {
    margin: 10,
  },
  subMenu: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  betweenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 4,
  },
  buttonSelected: {
    backgroundColor: '#4f46e5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default styles;