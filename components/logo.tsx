import { View, StyleSheet, Image } from "react-native";
export function Logo() {
  return (
    <View style={styles.mainLogo}>
      <Image
        source={require("@/assets/images/Logo_Horizontal-New-01.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainLogo: {
    bottom: 0,
    left: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  image: {
    width: 300,
    height: 100,
  },
});
