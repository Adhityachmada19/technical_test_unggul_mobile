import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { useRouter } from "expo-router";
import { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SplashScreen() {
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");

      const timer = setTimeout(() => {
        if (!token) {
          router.replace("/auth/login");
        } else {
          router.replace("/home");
        }
      }, 2000);

      return () => clearTimeout(timer);
    };

    checkToken();
  }, []);
  return (
    // <ImageBackground
    //   source={require("../assets/image/guide/imageBackground.png")}
    //   style={styles.container}
    // >
    <View style={styles.container}>
      <StatusBar translucent={true} style="dark" />

      <View style={styles.content}>
        <View style={styles.viewImage}>
          <Image
            source={require("../assets/image/splash-screen/imageBanner.png")}
            style={styles.imageBanner}
          />
        </View>
        <View style={styles.viewImage}>
          <Text style={styles.textHeader}>Toko Ku</Text>
        </View>
      </View>
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    flexDirection: "column",
  },

  viewImage: {
    marginTop: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBanner: {
    width: 205,
    height: 235,
  },

  textHeader: {
    fontFamily: "PoppinsBlack",
    color: "#027335",
    fontSize: 50,
  },
});
