import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

export default function guideOne() {
  const handleToGuideTwo = () => {
    router.replace("/guide/two");
  };
  return (
    <ImageBackground
      source={require("../../assets/image/guide/imageBackground.png")}
      style={styles.container}
    >
      <StatusBar translucent={true} style="dark" />

      <View style={styles.content}>
        <View style={styles.viewImage}>
          <Image
            source={require("../../assets/image/guide/one/imageBanner.png")}
            style={styles.imageBanner}
          />
        </View>
        <View style={styles.viewImage}>
          <Text style={styles.textHeader}>
            Welcome to Tanam!{"\n"} Grocery Applications
          </Text>
          <Text style={styles.textDescription}>
            Lorem ipsum dolor sit amet, consectetur {"\n"} adipiscing elit, sed
            do eiusmod tempor {"\n"} incididunt ut labore
          </Text>
        </View>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => handleToGuideTwo()}
        >
          <Text style={styles.textButton}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
    fontFamily: "PoppinsBold",
    fontSize: 22,
    lineHeight: 32,
    textAlign: "center",
  },

  textDescription: {
    paddingTop: 10,
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },

  viewButton: {
    backgroundColor: "#027335",
    borderRadius: 10,
    marginTop: 50,
  },
  textButton: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "PoppinsExtraBold",
    paddingVertical: 15,
    color: "#fff",
  },
});
