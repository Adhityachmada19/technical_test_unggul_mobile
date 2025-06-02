import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Api from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Profile() {
  const [isNotification, setNotification] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    await Api.get(`/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  };

  const handleLogout = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    await Api.post("/api/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoading(false);
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("name_user");

        router.replace("/auth/login");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);
  // const handleBackHome = () => {
  //   router.replace("/home");
  // };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={[styles.container]}>
        {/* Profile Text */}
        <View style={[styles.profileTextParent]}>
          <Text style={[styles.profileTextContent]}>Profile</Text>
        </View>
        {/* End Profile Text */}
        {/* Profile Image */}
        <View style={[styles.profileImageParent]}>
          <View style={[styles.profileImageBackground]}>
            <Image
              source={require("../../assets/image/home/profil.jpg")}
              style={[styles.profileImage]}
            />
            <TouchableOpacity style={styles.profileImageEdit}>
              <FontAwesome5 name="pen" size={12} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        {/*End Profile Image */}

        {/* Personal Info */}

        <View style={[styles.personalInfoTextParent]}>
          <Text style={[styles.personalInfoTextContent]}>
            Informasi Pengguna
          </Text>
        </View>

        <View style={[styles.personalInfoContentParent]}>
          <View style={[styles.personalInfoContentContainer]}>
            <View style={[styles.personalInfoContentKey]}>
              <Text style={[styles.personalInfoContentKeyText]}>Nama</Text>
            </View>
            <View style={[styles.personalInfoContentValue]}>
              <Text style={[styles.personalInfoContentValueText]}>
                {user.name}
              </Text>
            </View>
          </View>

          <View style={[styles.personalInfoContentContainer]}>
            <View style={[styles.personalInfoContentKey]}>
              <Text style={[styles.personalInfoContentKeyText]}>Domisili</Text>
            </View>
            <View style={[styles.personalInfoContentValue]}>
              <Text style={[styles.personalInfoContentValueText]}>-</Text>
            </View>
          </View>

          <View style={[styles.personalInfoContentContainer]}>
            <View style={[styles.personalInfoContentKey]}>
              <Text style={[styles.personalInfoContentKeyText]}>Jabatan</Text>
            </View>
            <View style={[styles.personalInfoContentValue]}>
              <Text style={[styles.personalInfoContentValueText]}>-</Text>
            </View>
          </View>
        </View>
        {/* End Personal Info */}

        {/* Contact Info */}

        <View style={[styles.personalInfoTextParent]}>
          <Text style={[styles.personalInfoTextContent]}>Contact Info</Text>
        </View>

        <View style={[styles.personalInfoContentParent]}>
          <View style={[styles.personalInfoContentContainer]}>
            <View style={[styles.personalInfoContentKey]}>
              <Text style={[styles.personalInfoContentKeyText]}>Email</Text>
            </View>
            <View style={[styles.personalInfoContentValue]}>
              <Text style={[styles.personalInfoContentValueText]}>
                {user.email}
              </Text>
            </View>
          </View>
        </View>
        {/* End Contact Info */}

        {/* Button Edit */}
        <View style={[styles.buttonEditparent]}>
          <TouchableOpacity
            style={[styles.buttonEditContent]}
            onPress={handleLogout}
            disabled={loading}
          >
            <Text style={[styles.buttonEditContentText]}>
              {loading ? "Loading ..." : "Logout"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* End Button Edit */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /**
   * ALL
   */
  container: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  /**
   * ALL
   */

  /**
   * Button Indicator
   */
  buttonIndicator: {
    flexDirection: "row",
  },
  buttonIndicatorContentParentBack: {
    flex: 1,
    alignItems: "flex-start",
  },

  buttonIndicatorContentParentNotification: {
    flex: 1,
    alignItems: "flex-end",
  },
  buttonIndicatorContentParentIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  buttonIndicatorContentIcon: {
    color: "#FF0000",
    fontWeight: 700,
  },
  buttonIndicatorContentIconBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    zIndex: 1,
  },
  /**
   * End Button Indicator
   */

  /**
   * Profile Text
   */
  profileTextParent: {
    marginTop: 10,
  },

  profileTextContent: {
    fontFamily: "PoppinsBold",
    fontSize: 23,
  },
  /**
   * End Profile Text
   */

  /**
   * Profile Image
   */
  profileImageParent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  profileImageBackground: {
    width: 100,
    height: 100,
    backgroundColor: "#b1eec5",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  profileImage: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  profileImageEdit: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: "#027335",
    borderColor: "#fff",
    borderWidth: 2,
    zIndex: 1,
  },
  /**
   * End Profile Image
   */

  /**
   * Personal Info
   */
  personalInfoTextParent: {
    flexDirection: "column",
  },

  personalInfoTextContent: {
    marginTop: 20,
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },

  personalInfoContentParent: {
    borderRadius: 20,
    borderColor: "#F6F6F6",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  personalInfoContentContainer: {
    flexDirection: "row",
    paddingBottom: 15,
  },
  personalInfoContentKey: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  personalInfoContentKeyText: {
    textAlign: "left",
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    color: "#3B3B3B",
  },

  personalInfoContentValue: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  personalInfoContentValueText: {
    textAlign: "right",
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    color: "#000",
  },
  personalInfoContentValueSwitch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  /**
   * End personal Info
   */

  /**
   * Button Edit
   */
  buttonEditparent: {
    flexDirection: "column",
    marginTop: 20,
  },

  buttonEditContent: {
    backgroundColor: "#027335",
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonEditContentText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "PoppinsBlack",
  },
  /**
   * End Button Edit
   */
});
