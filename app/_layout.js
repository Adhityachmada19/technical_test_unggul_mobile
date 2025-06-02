import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MainLayoutParent() {
  const [fontsLoaded] = useFonts({
    PoppinsThin: require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    PoppinsBlack: require("../assets/fonts/Poppins/Poppins-Black.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaProvider>
    );
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
