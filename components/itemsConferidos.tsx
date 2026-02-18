import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../services/database";
const props = {
  conferencia: String,
  array: Array,
  setArray: Function,
};
function ItemsConferidos({ conferencia, array, setArray }: props) {
  const conferidos = db.getAllSync(
    "SELECT produto FROM itens where conferencia = ?",
    [conferencia]
  );
  useEffect(() => {
    setArray(conferidos);
  }, [conferidos]);

  return (
    <View>
      {array.length > 0 ? (
        <View style={styles.bottomView}>
          <Text style={styles.white}>Conferidos ({array.length})</Text>
        </View>
      ) : (
        <View></View>
      )}
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
