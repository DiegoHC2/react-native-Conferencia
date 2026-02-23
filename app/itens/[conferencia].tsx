import { useEffect, useState } from "react";
import { View, Text, ScrollView, ToastAndroid } from "react-native";
import * as Expo from "expo";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalItem from "./ModalItem";
import * as NavigationBar from "expo-navigation-bar";
import { db } from "../../services/database";
import ItemsConferidos from "../../components/itemsConferidos";

export default function ItensScreen() {
  function confirmarItem(produtoConfirmado) {
    // remove item do array
    setItens((itensFiltrados) =>
      itensFiltrados.filter((item) => item.cod !== produtoConfirmado)
    );
    setVisible(false);
  }
  const { conferencia } = useLocalSearchParams();
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [quantidade, setQuantidade] = useState(null);
  const [produto, setProduto] = useState(null);
  const [arrayConferidos, setArrayConferidos] = useState([]);
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("immersive");

    async function carregarItens() {
      try {
        const data = await fetchItens(conferencia as string);
        if (!data.error) {
          // preciso verificar se o item já foi conferido, para isso preciso comparar com o banco local
          const conferidos = db.getAllSync("SELECT produto FROM itens");

          const conferidosSet = new Set(conferidos.map((item) => item.produto));
          // filter is not a function
          const itensFiltrados = data.body.filter(
            (item) => !conferidosSet.has(item.cod)
          );
          setItens(itensFiltrados);
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

      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={(styles.td, styles.th)}>CÓD</Text>
          <Text style={(styles.td, styles.th)}>QUANTIDADE</Text>
          <Text style={(styles.td, styles.th)}>AÇÃO</Text>
        </View>
        <ScrollView style={{ width: "100%", marginBottom: 50 }}>
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
            <Text>Sem items...</Text>
          )}
        </ScrollView>
        <ModalItem
          visible={visible}
          onClose={() => setVisible(false)}
          quantidade={quantidade}
          produto={produto}
          onConfirm={confirmarItem}
          conferencia={conferencia as string}
          setArrayConferidos={setArrayConferidos}
        />
        <ItemsConferidos
          conferencia={conferencia as string}
          array={arrayConferidos}
          setArray={setArrayConferidos}
        />
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
    alignItems: "start",
    flex: 1,
    justifyContent: "start",
    backgroundColor: "#F0F0F0",
    height: "100%",
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
  console.log("teste");

  const response = await fetch(
    `http://192.168.2.78:8080/backend/conferencia/informacoesDaLista.php?id=${conferencia}`
  );
  if (!response.ok) {
    console.log("error");
    throw new Error("Erro na requisição");
  }

  const data = await response.json();
  return data;
}
