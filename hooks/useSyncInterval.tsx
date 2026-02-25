import { useEffect, useRef } from "react";
import NetInfo from "@react-native-community/netinfo";
import { sincronizarItens } from "../services/syncService";
export function useSyncInterval(
  syncFunction: () => Promise<void>,
  interval: number
) {
  const wasOffline = useRef(false);
  const syncing = useRef(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const state = await NetInfo.fetch();

      if (!state.isConnected) {
        wasOffline.current = true;
        return;
      }
      if (state.isConnected && !wasOffline.current && !syncing.current) {
        syncing.current = true;
        wasOffline.current = false;

        try {
          sincronizarItens();
        } finally {
          syncing.current = false;
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);
}
