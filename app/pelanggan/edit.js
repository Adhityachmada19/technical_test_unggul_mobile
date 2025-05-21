import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Api from "../../api/api";
import ToastManager, { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
export default function edit() {
  const [nama, setNama] = useState("");
  const [domisili, setDomisili] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [idPelanggan, setidPelanggan] = useState("");
  const [validation, setValidation] = useState({});
  const [kodeBarang, setKodeBarang] = useState("");
  const [loading, setLoading] = useState(false);

  const { kode } = useLocalSearchParams();

  const handleUpdatePelanggan = async () => {
    const token = AsyncStorage.getItem("token");
    setLoading(true);
    try {
      const response = await Api.post(
        `/api/pelanggan/update/${kode}`,
        {
          id_pelanggan: idPelanggan,
          nama: nama,
          domisili: domisili,
          jenis_kelamin: jenisKelamin,
          _method: "PUT",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: "success",
        text1: "Pelanggan Berhasil Diubah",
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
  };

  useEffect(() => {
    const getDetailPelanggan = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await Api.get(`api/pelanggan/detail/${kode}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setidPelanggan(response.data.data.id_pelanggan);
        setNama(response.data.data.nama);
        setDomisili(response.data.data.domisili);
        setJenisKelamin(response.data.data.jenis_kelamin);
      } catch (err) {
        console.log("Error:", err);
        Toast.show({
          type: "error",
          text1: "Pelanggan Tidak Ditemukan",
          position: "top-end",
          visibilityTime: 3000,
          autoHide: true,
        });

        setTimeout(() => {
          router.replace("/pelanggan");
        }, 1000);
      }
    };

    getDetailPelanggan();
  }, [kode]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ToastManager />
      <StatusBar translucent={false} backgroundColor="#fff" style="dark" />
      <View style={[styles.container]}>
        {/* Button Indicator  */}
        <View style={[styles.buttonIndicator]}>
          <View style={[styles.buttonIndicatorContentParentBack]}>
            <TouchableOpacity
              style={[styles.buttonIndicatorContentParentIcon]}
              onPress={() => router.replace("/pelanggan")}
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
          <Text style={[styles.profileTextContent]}>Ubah Pelanggan</Text>
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
            onPress={handleUpdatePelanggan}
            disabled={loading}
          >
            <Text style={[styles.buttonEditContentText]}>
              {loading ? "Loading ..." : "Ubah Pelanggan"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* End Button Edit */}
      </View>
    </View>
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
