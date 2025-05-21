import { Tabs } from "expo-router";
import { useFonts } from "expo-font";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { usePathname } from "expo-router";
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
      <GestureHandlerRootView>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 70,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            position: "absolute",
          },
          tabBarShowLabel: false, // Label akan dibuat manual
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarButton: (props) => (
              <CustomTabButton {...props} icon="home" label="home" />
            ),
          }}
        />
        <Tabs.Screen
          name="barang"
          options={{
            title: "Barang",
            tabBarButton: (props) => (
              <CustomTabButton {...props} icon="cube" label="barang" />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarButton: (props) => (
              <CustomTabButton {...props} icon="cash" label="cart" />
            ),
          }}
        />
        <Tabs.Screen
          name="pelanggan"
          options={{
            title: "Pelanggan",
            tabBarButton: (props) => (
              <CustomTabButton {...props} icon="people" label="pelanggan" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarButton: (props) => (
              <CustomTabButton {...props} icon="person" label="profile" />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}

// Komponen Custom untuk Tab Button
const CustomTabButton = ({ label, icon, accessibilityState, onPress }) => {
  const pathname = usePathname();
  const focused = pathname === `/${label}`;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[label !== "cart" ? styles.touchAll : styles.touchCart]}
    >
      {label !== "cart" ? (
        <Ionicons name={icon} size={24} color={focused ? "#027335" : "gray"} />
      ) : (
        <>
          <Ionicons name={icon} size={24} color="#fff" />
          <View
            style={{
              position: "absolute",
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#027335",
              top: 19,
              right: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 7,
                height: 7,
                borderRadius: 3.5,
                backgroundColor: "yellow",
                left: 1,
              }}
            />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchAll: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingVertical: 15,
    margin: 5,

    paddingHorizontal: 15,
  },

  touchCart: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#027335",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 15,
    margin: 5,
  },
});
