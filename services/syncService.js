import NetInfo from "@react-native-community/netinfo";
import { db } from "./database";
import { ToastAndroid } from "react-native";

let sincronizando = false;

async function sincronizarItens() {
  if (sincronizando) return; // 👈 impede loop
  sincronizando = true;

  try {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      sincronizando = false;
      return;
    }

    ToastAndroid.show("Sincronizando...", ToastAndroid.SHORT);

    const itens = db.getAllSync("SELECT * FROM itens WHERE sincronizado = 0");
    console.log("Itens para sincronizar:", itens.length);

    for (let item of itens) {
      try {
        const response = await fetch(
          "http://192.168.2.78:8080/tabela/Compras/apk/conferenciaApk.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              quantidade: item.quantidade,
              produto: item.produto,
              conferencia: item.conferencia,
            }),
          }
        );
        console.log(response);
        if (response.ok == true) {
          db.runSync("UPDATE itens SET sincronizado = 1 WHERE id = ?", [
            item.id,
          ]);
        }
      } catch (error) {
        console.log("Erro ao sincronizar item", item.id);
        break; // para sincronização se API falhar
      }
    }
  } catch (err) {
    console.log("Erro geral sync:", err);
  } finally {
    sincronizando = false;
  }
}
export { sincronizarItens };
