import { View, Text, Modal, Button } from "react-native";
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
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setArray(conferidos);
  }, [conferidos]);

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.modalTitle}>Itens Conferidos</Text>
              <View style={styles.modalView}>
                {array.map((item, index) => (
                  <View style={{ width: "45%" }} key={index}>
                    <Button
                      key={index}
                      title={item.produto}
                      color={"#1C314E"}
                    />
                  </View>
                ))}
              </View>
            </View>
            <View>
              <Button title="Fechar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      {array.length > 0 ? (
        <View style={styles.bottomView}>
          <Text style={styles.white} onPress={() => setModalVisible(true)}>
            Conferidos ({array.length})
          </Text>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
const styles = {
  item: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
  },
  modalView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    color: "white",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "95%",
    maxHeight: "95%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  modalContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
  },
  modalItem: {
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
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
