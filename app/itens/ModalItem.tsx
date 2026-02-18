import { useEffect, useState } from "react";
import { View, Text, Button, Modal, StyleSheet, TextInput } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { db } from "../../services/database";
type Props = {
  visible: boolean;
  onClose: () => void;
  quantidade: number | null;
  produto: string | null;
  onConfirm: (produto: string | null) => void;
  conferencia: string;
};
export default function ModalItem({
  visible,
  onClose,
  quantidade,
  message,
  produto,
  onConfirm,
  conferencia,
}: props) {
  const [inputValue, setInputValue] = useState(quantidade);
  useEffect(() => {
    if (quantidade != null) {
      setInputValue(quantidade);
    }
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("immersive");
  }, [quantidade]);

  // ta duplicado pois está função é chamada quando pagina abre

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          visible={visible}
          style={styles.modalView}
          transparent
          animationType="fade"
          presentationStyle="fullScreen"
          statusBarTranslucent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalMessage}>Produto: {produto}</Text>
              <Text style={styles.modalTitle}>Quantidade:</Text>
              <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                style={styles.input}
                editable={true}
                keyboardType="numeric"
              />
              <Button
                title="Salvar"
                color="darkgreen"
                onPress={() => {
                  try {
                    db.runSync(
                      "INSERT INTO itens (quantidade, produto, conferencia,sincronizado) VALUES (?, ?, ?, 0)",
                      [Number(inputValue), produto, conferencia]
                    );
                    if (produto) {
                      onConfirm(produto);
                    }
                  } catch (error) {
                    console.log("Erro ao salvar:", error);
                  }
                }}
              />
              <Button
                title="Fechar"
                color="grey"
                style={styles.button}
                onPress={onClose}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
async function salvarItem(quantidade, produto, conferencia) {
  // Lógica para salvar a quantidade do produto
  console.log("Salvando item:", produto, "Quantidade:", quantidade);
  try {
    await db.runSync(
      "INSERT INTO itens (quantidade, produto, conferencia) VALUES (?, ?, ?)",
      [quantidade, produto, conferencia]
    );
    console.log("Item salvo com sucesso!");
    itensFiltrados = itensFiltrados.filter((item) => item.cod !== produto);
  } catch (error) {
    console.error("Erro ao salvar item:", error);
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 50,
  },
  buttonSave: {
    marginTop: 50,
    backgroundColor: "#20232a",
    color: "#fff",
  },
  input: {
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 7,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    gap: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalMessage: {
    marginBottom: 20,
  },
});
