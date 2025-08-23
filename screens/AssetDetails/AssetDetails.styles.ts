import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#151544',
    paddingTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  item: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: 10,
    borderRadius: 5,
    marginBottom: 35,
  },
  itemDetail: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;