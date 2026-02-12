import { useEffect, useState } from "react";
import { View, Text, ScrollView, ToastAndroid } from "react-native";
import * as Expo from "expo";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalItem from "./ModalItem";
import * as NavigationBar from "expo-navigation-bar";

export default function ItensScreen() {
  const { conferencia } = useLocalSearchParams();
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [quantidade, setQuantidade] = useState(null);
  const [produto, setProduto] = useState(null);
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("immersive");
    async function carregarItens() {
      try {
        const data = await fetchItens(conferencia as string);
        if (!data.error) {
          setItens(data.body);
        } else {
          if (data.error == "done") {
            ToastAndroid.showWithGravityAndOffset(
              "Lista já conferida",
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
              25,
              50
            );
          } else {
            ToastAndroid.showWithGravityAndOffset(
              "Lista não encontrada",
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
              25,
              50
            );
          }
        }
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      } finally {
        setLoading(false);
      }
    }

    if (conferencia) {
      carregarItens();
    }
  }, [conferencia]); // só executa quando conferencia mudar

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Conferência ${conferencia}`,
        }}
      />
      <ModalItem
        visible={visible}
        onClose={() => setVisible(false)}
        quantidade={quantidade}
        produto={produto}
        message="O item foi conferido com sucesso!"
      />
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={(styles.td, styles.th)}>CÓD</Text>
          <Text style={(styles.td, styles.th)}>QUANTIDADE</Text>
          <Text style={(styles.td, styles.th)}>AÇÃO</Text>
        </View>
        <ScrollView style={{ width: "100%" }}>
          {loading ? (
            <Text>Carregando...</Text>
          ) : itens.length > 0 ? (
            itens.map((item: any, index: number) => (
              <View key={index} style={styles.row}>
                <Text style={styles.td}>{item.cod}</Text>
                <Text style={styles.td}>{item.estoque}</Text>
                <Ionicons
                  style={styles.td}
                  name="checkmark-circle"
                  size={32}
                  color="green"
                  onPress={() => {
                    setQuantidade(item.estoque);
                    setProduto(item.cod);
                    setVisible(true);
                  }}
                />
              </View>
            ))
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}
const styles = {
  th: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  header: {
    alignItems: "center",
  },
  td: {
    width: "33%",
    textAlign: "center",
  },
  headerText: {
    backgroundColor: "#1C314E",
    flexDirection: "row",
    padding: 10,

    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
};
async function fetchItens(conferencia: string) {
  const response = await fetch(
    `http://192.168.2.78:8080/backend/conferencia/informacoesDaLista.php?id=${conferencia}`
  );

  if (!response.ok) {
    throw new Error("Erro na requisição");
  }

  const data = await response.json();
  return data;
}
