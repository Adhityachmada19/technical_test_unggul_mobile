import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function MainLayoutParent() {
  const [fontsLoaded] = useFonts({
    PoppinsThin: require("../../assets/fonts/Poppins/Poppins-Thin.ttf"),
    PoppinsLight: require("../../assets/fonts/Poppins/Poppins-Light.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    PoppinsBlack: require("../../assets/fonts/Poppins/Poppins-Black.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
