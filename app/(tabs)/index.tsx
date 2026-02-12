import { StyleSheet, View, TextInput, Button } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Logo } from "@/components/logo";
import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { useRouter } from "expo-router";
export default function Home() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("immersive");
  }, []);
  const [conferencia, setConferencia] = useState("");
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
      </View>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <ThemedText type="default">Digite a conferencia</ThemedText>

          <TextInput
            style={styles.input}
            placeholder=""
            keyboardType="numeric"
            onChangeText={(text) => setConferencia(text)}
          />
          <View style={styles.button}>
            <Button
              title="Conferir"
              color="#20232a"
              onPress={() => {
                router.push(`/itens/${conferencia}`);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 50,
  },

  input: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 7,
  },
  header: {
    alignItems: "center",
    paddingTop: 30, // espaço do topo
  },

  content: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
  },
});
