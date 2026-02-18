import NetInfo from "@react-native-community/netinfo";
import { db } from "./database";
import { ToastAndroid } from "react-native";

let sincronizando = false;

async function sincronizarItens() {
  console.log("Iniciando sincronização...");
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

    for (let item of itens) {
      try {
        const response = await fetch("http://SEU_IP:3000/salvar-item", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quantidade: item.quantidade,
            produto: item.produto,
          }),
        });

        if (response.ok) {
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
    sincronizando = false; // 👈 libera novamente
  }
}
export { sincronizarItens };
