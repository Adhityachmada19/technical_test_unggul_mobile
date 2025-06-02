import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../api/api";
import ToastManager, { Toast } from "toastify-react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PelangganCreate() {
  const [nama, setNama] = useState("");
  const [domisili, setDomisili] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [validation, setValidation] = useState({});
  const [loading, setLoading] = useState(false);
  const handleBackHome = () => {
    router.replace("/pelanggan");
  };
  const handleCreatePelanggan = async () => {
    const token = AsyncStorage.getItem("token");
    setLoading(true);
    try {
      const response = await Api.post(
        `/api/pelanggan/store`,
        {
          nama: nama,
          domisili: domisili,
          jenis_kelamin: jenisKelamin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: "success",
        text1: "Pelanggan Berhasil Ditambahkan",
        position: "top-end",
        visibilityTime: 3000,
        autoHide: true,
      });

      const timer = setTimeout(() => {
        router.replace("/pelanggan");
      }, 1000);
    } catch (err) {
      console.log(err.response.data);
      setValidation(err.response.data);
      setLoading(false);
    } finally {
      setLoading(false);
    }
    // console.log("barang", nama);
    // console.log("kategori", kategori);
    // console.log("harga", harga);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ToastManager />
      <View style={[styles.container]}>
        {/* Button Indicator  */}
        <View style={[styles.buttonIndicator]}>
          <View style={[styles.buttonIndicatorContentParentBack]}>
            <TouchableOpacity
              style={[styles.buttonIndicatorContentParentIcon]}
              onPress={() => handleBackHome()}
            >
              <Ionicons
                name="arrow-back"
                size={20}
                style={[styles.buttonIndicatorContentIcon]}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* End Button Indicator  */}
        {/* Profile Text */}
        <View style={[styles.profileTextParent]}>
          <Text style={[styles.profileTextContent]}>Tambah Pelanggan</Text>
        </View>
        {/* End Profile Text */}
        <View style={styles.formControl}>
          <TextInput
            placeholder="Nama Pelanggan"
            style={styles.textInput}
            value={nama}
            onChangeText={(text) => setNama(text)}
          />
          {validation?.nama && (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {validation.nama[0]}
            </Text>
          )}
          <TextInput
            placeholder="Domisili Pelanggan"
            style={styles.textInput}
            value={domisili}
            onChangeText={(text) => setDomisili(text)}
          />
          {validation?.domisili && (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {validation.domisili[0]}
            </Text>
          )}
          <View
            style={{
              borderWidth: 1,
              borderColor: "#bbb",
              borderRadius: 10,
              marginBottom: 15,
              overflow: "hidden", // agar rounded di Android terlihat
            }}
          >
            <Picker
              selectedValue={jenisKelamin}
              onValueChange={(itemValue) => setJenisKelamin(itemValue)}
            >
              <Picker.Item label="Pilih Jenis Kelamin" value="" />
              <Picker.Item label="PRIA" value="PRIA" />
              <Picker.Item label="WANITA" value="WANITA" />
            </Picker>
          </View>
          {validation?.jenis_kelamin && (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {validation.jenis_kelamin[0]}
            </Text>
          )}
        </View>
        {/* Button Edit */}
        <View style={[styles.buttonEditparent]}>
          <TouchableOpacity
            style={[styles.buttonEditContent]}
            onPress={handleCreatePelanggan}
            disabled={loading}
          >
            <Text style={[styles.buttonEditContentText]}>
              {loading ? "Loading ..." : "Tambah Pelanggan"}
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
    backgroundColor: "#d0eec6",
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  buttonIndicatorContentIcon: {
    color: "#027335",
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
    textAlign: "center",
  },
  /**
   * End Profile Text
   */

  /**
   * Form
   */
  formControl: {
    flexDirection: "column",
    marginTop: 20,
  },
  textInput: {
    paddingLeft: 10,
    height: 50,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bbbb",
  },
  /**
   * End Form
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
