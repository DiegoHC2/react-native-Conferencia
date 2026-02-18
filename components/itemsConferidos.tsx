import { View, Text } from "react-native";
function ItemsConferidos() {
  return (
    <View style={styles.bottomView}>
      <Text style={styles.white}>Conferidos (?)</Text>
    </View>
  );
}
const styles = {
  bottomView: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C314E",
    width: "100%",
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  white: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
};
export default ItemsConferidos;
