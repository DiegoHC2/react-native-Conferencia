import { useEffect, useState } from "react";
import { View, Text, Button, Modal, StyleSheet, TextInput } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function ModalItem({
  visible,
  onClose,
  quantidade,
  message,
  produto,
}) {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("immersive");
  }, []);
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
                value={quantidade}
                style={styles.input}
                editable={true}
              />
              <Button title="Fechar" style={styles.button} onPress={onClose} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
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
