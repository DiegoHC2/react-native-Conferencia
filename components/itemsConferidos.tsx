import { View, Text, Modal, Button, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../services/database";
const props = {
  conferencia: String,
  array: Array,
  setArray: Function,
};

function ItemsConferidos({ conferencia, array, setArray }: props) {
  const [inputEditValue, setInputEditValue] = useState("");
  const [produtoEdit, setProdutoEdit] = useState("");
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [conferidos, setConferidos] = useState([]);
  useEffect(() => {
    const data = db.getAllSync(
      "SELECT produto, quantidade FROM itens where conferencia = ?",
      [conferencia]
    );

    setConferidos(data);
    setArray(data);
  }, [conferencia]);

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
                      onPress={() => {
                        console.log(item);
                        setModalEditProduto(
                          item.produto,
                          item.quantidade,
                          true,
                          setInputEditValue,
                          setProdutoEdit,
                          setModalEditVisible,
                          conferidos
                        );
                      }}
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

      <Modal visible={modalEditVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          {/* Modal para edição do produto */}
          <View style={styles.modalEditProduto}>
            <Text style={styles.textStyle}>Editar Produto</Text>
            <Text style={styles.textStyle}>
              Produto: <Text style={{ fontWeight: "bold" }}>{produtoEdit}</Text>{" "}
            </Text>
            <Text style={styles.textStyle}>Quantidade: </Text>
            <TextInput
              value={inputEditValue}
              onChangeText={(text) => {
                setInputEditValue(text);
              }}
              style={styles.input}
              keyboardType="numeric"
            />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 20,
              }}
            >
              <Button
                title="Editar"
                color="darkgreen"
                onPress={() => {
                  // Lógica para salvar as alterações do produto
                  alterarConferido(
                    produtoEdit,
                    inputEditValue,
                    conferencia,
                    conferidos
                  );
                  setModalEditProduto(
                    "",
                    0,
                    false,
                    setInputEditValue,
                    setProdutoEdit,
                    setModalEditVisible
                  );
                }}
              />
              <Button
                title="Excluir"
                color="red"
                onPress={() => {
                  try {
                    db.runSync(
                      "DELETE FROM itens WHERE produto = ? AND conferencia = ?",
                      [produtoEdit, conferencia]
                    );
                    const updatedConferidos = conferidos.filter(
                      (item) => item.produto !== produtoEdit
                    );
                    setArray(updatedConferidos);

                    if (updatedConferidos.length === 0) {
                      setModalVisible(false);
                    }
                  } catch (error) {
                    console.log("Erro ao excluir:", error);
                  }
                  setModalEditProduto(
                    "",
                    0,
                    false,
                    setInputEditValue,
                    setProdutoEdit,
                    setModalEditVisible
                  );
                }}
              />
              <Button
                title="Fechar"
                color="grey"
                onPress={() =>
                  setModalEditProduto(
                    "",
                    0,
                    false,
                    setInputEditValue,
                    setProdutoEdit,
                    setModalEditVisible
                  )
                }
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
function alterarConferido(
  produto: string,
  quantidade: string,
  conferencia: string,
  conferidos?: any[]
) {
  try {
    db.runSync(
      "UPDATE itens SET quantidade = ? WHERE produto = ? AND conferencia = ?",
      [Number(quantidade), produto, conferencia]
    );

    conferidos.map((item) => {
      if (item.produto === produto) {
        item.quantidade = Number(quantidade);
      }
    });
  } catch (error) {
    console.log("Erro ao alterar:", error);
  }
}
function setModalEditProduto(
  produto: string,
  quantidade: any,
  visible: boolean,
  setInputEditValue: Function,
  setProdutoEdit: Function,
  setModalEditVisible: Function
) {
  // Lógica para abrir o modal de edição do produto

  setInputEditValue(String(quantidade));
  setProdutoEdit(produto);
  setModalEditVisible(visible);
}
const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  modalEditProduto: {
    flex: 1,
    gap: 20,
    justifyContent: "start",
    alignItems: "start",
  },
  textStyle: {
    fontSize: 18,
  },
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
