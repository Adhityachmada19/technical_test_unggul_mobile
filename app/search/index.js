import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
export default function Search() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar translucent={false} backgroundColor="#fff" style="dark" />
      <View style={styles.container}>
        {/* Headers */}
        <View style={styles.headers}>
          <View style={styles.headersNameAccountParent}>
            <Text style={styles.headersTimeText}>Good Morning </Text>
            <Text style={styles.headersNameAccountText}>Adhitya. 👋</Text>
          </View>

          <View style={styles.headesNotificationParent}>
            <View style={styles.headersNotificationCount}>
              <Text style={styles.headersNotificationCountText}>99+</Text>
              <View style={styles.headersNotificationIconParent}>
                <TouchableOpacity style={styles.headersNotificationIcon}>
                  <Ionicons name="notifications" color="#fff" size={22} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* End Headers */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },

  headers: {
    flexDirection: "row",
  },

  headersNameAccountParent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headersTimeText: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },

  headersNameAccountText: {
    fontFamily: "PoppinsBold",
    fontSize: 20,
  },

  headesNotificationParent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },

  headersNotificationCount: {
    backgroundColor: "#EDEDED",
    height: 42,
    width: 86,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  headersNotificationCountText: {
    fontFamily: "PoppinsMedium",
    fontSize: 14,
  },

  headersNotificationIconParent: {
    position: "absolute",
    right: 0,
    backgroundColor: "#fff",
    height: 50,
    width: 45,
    zIndex: 2,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  headersNotificationIcon: {
    backgroundColor: "#C29C1D",
    height: 42,
    width: 40,
    zIndex: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
