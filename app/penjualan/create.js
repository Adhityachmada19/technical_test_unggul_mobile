import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../api/api"; // sesuaikan path-nya
import ToastManager, { Toast } from "toastify-react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";
import { formatRupiah } from "../../lib/FormatRupiah";
import { SafeAreaView } from "react-native-safe-area-context";

const PenjualanCreate = () => {
  const router = useRouter();
  const [pelangganList, setPelangganList] = useState([]);
  const [barangList, setBarangList] = useState([]);

  const [tgl, setTgl] = useState("");
  const [idPelanggan, setIdPelanggan] = useState("");
  const [items, setItems] = useState([{ kode: "", qty: 1 }]);

  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  // tambah item baru
  const handleAddItem = () => {
    setItems([...items, { kode: "", qty: 1 }]);
  };

  // hapus item berdasarkan index
  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Fungsi untuk handle input qty
  const handleQtyChange = (text, index) => {
    // Batasi input hanya angka (boleh kosong agar user bisa hapus dulu)
    if (/^\d*$/.test(text)) {
      const newItems = [...items];
      newItems[index].qty = text;
      setItems(newItems);
    }
  };

  // hitung harga total per item (harga * qty)
  const getHargaBarang = (kode) => {
    const barang = barangList.find((b) => b.kode === kode);
    return barang ? barang.harga : 0; // pastikan di API ada field harga
  };

  // hitung total keseluruhan
  const totalKeseluruhan = items.reduce((total, item) => {
    const harga = getHargaBarang(item.kode);
    return total + harga * item.qty;
  }, 0);

  // submit data penjualan
  const handleCreatePenjualan = async () => {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    setValidation({});

    try {
      const formattedItems = items.map((item) => ({
        kode_barang: item.kode,
        qty: Math.max(parseInt(item.qty) || 1, 1),
      }));

      // mapping items: kode -> kode_barang
      const dataToSend = {
        tgl,
        kode_pelanggan: idPelanggan,
        items: items.map((item) => ({
          kode_barang: item.kode,
          qty: item.qty,
        })),
      };

      const response = await Api.post("/api/penjualan/store", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Toast.show({
        type: "success",
        text1: "Penjualan Berhasil Ditambahkan",
        position: "top-end",
        visibilityTime: 3000,
        autoHide: true,
      });

      setTimeout(() => {
        router.replace("/cart");
      }, 1000);
    } catch (err) {
      console.log(err.response?.data || err.message);
      setValidation(err.response?.data || {});
    } finally {
      setLoading(false);
    }
  };

  // ambil data pelanggan & barang saat pertama kali load
  useEffect(() => {
    const fetchPelanggan = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await Api.get(
          "/api/pelanggan/list?page=1&perPage=10000",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPelangganList(response.data.data.data);
      } catch (error) {
        console.log("Gagal mengambil pelanggan", error);
      }
    };

    const fetchBarang = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await Api.get(
          "/api/barang/list?page=1&perPage=10000",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBarangList(response.data.data.data);
      } catch (error) {
        console.log("Gagal mengambil barang", error);
      }
    };

    fetchBarang();
    fetchPelanggan();
  }, []);

  // handler tombol back (bisa disesuaikan)
  const handleBackHome = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ToastManager />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Button Indicator */}
        <View style={[styles.buttonIndicator]}>
          <View style={[styles.buttonIndicatorContentParentBack]}>
            <TouchableOpacity
              style={[styles.buttonIndicatorContentParentIcon]}
              onPress={handleBackHome}
            >
              <Ionicons
                name="arrow-back"
                size={20}
                style={[styles.buttonIndicatorContentIcon]}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* End Button Indicator */}

        {/* Profile Text */}
        <View style={[styles.profileTextParent]}>
          <Text style={[styles.profileTextContent]}>Tambah Penjualan</Text>
        </View>
        {/* End Profile Text */}

        <View style={styles.formControl}>
          {/* Tanggal */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.textInput}
          >
            <Text style={{ paddingTop: 13, color: tgl ? "#000" : "#bbb" }}>
              {tgl ? moment(tgl).format("YYYY-MM-DD") : "Pilih Tanggal"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={tgl ? new Date(tgl) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setTgl(moment(selectedDate).format("YYYY-MM-DD"));
                }
              }}
            />
          )}
          {validation?.tgl && (
            <Text style={styles.errorText}>{validation.tgl[0]}</Text>
          )}

          {/* Pilih Pelanggan */}
          <Picker
            selectedValue={idPelanggan}
            onValueChange={(itemValue) => setIdPelanggan(itemValue)}
          >
            <Picker.Item label="-- Pilih Pelanggan --" value="" />
            {pelangganList.map((pelanggan) => (
              <Picker.Item
                key={pelanggan.id_pelanggan}
                label={`${pelanggan.nama} (${pelanggan.id_pelanggan})`}
                value={pelanggan.id_pelanggan}
              />
            ))}
          </Picker>
          {validation?.kode_pelanggan && (
            <Text style={styles.errorText}>{validation.kode_pelanggan[0]}</Text>
          )}

          <Text style={styles.label}>Barang</Text>
          {/* List Item Barang */}
          {items.map((item, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Picker
                selectedValue={item.kode}
                onValueChange={(itemValue) => {
                  const newItems = [...items];
                  newItems[index].kode = itemValue;
                  setItems(newItems);
                }}
              >
                <Picker.Item label="-- Pilih Barang --" value="" />
                {barangList
                  .filter((barang) => {
                    // Filter barang agar yang sudah dipilih di item lain tidak muncul
                    return (
                      barang.kode === item.kode || // tetap tampilkan barang yang sudah dipilih di baris ini
                      !items.some(
                        (itm, idx) => itm.kode === barang.kode && idx !== index
                      )
                    );
                  })
                  .map((barang) => (
                    <Picker.Item
                      key={barang.kode}
                      label={`${barang.nama} (${barang.kode})`}
                      value={barang.kode}
                    />
                  ))}
              </Picker>

              <TextInput
                value={item.qty}
                keyboardType="numeric"
                onChangeText={(text) => handleQtyChange(text, index)}
                style={styles.textInput}
              />

              {/* Total Harga per Item */}
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "PoppinsRegular",
                  textAlign: "right",
                  color: "#027335",
                }}
              >
                Harga:
                {formatRupiah(getHargaBarang(item.kode) * item.qty)}
              </Text>

              <TouchableOpacity
                onPress={() => handleRemoveItem(index)}
                style={{
                  backgroundColor: "red",
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontFamily: "PoppinsBlack",
                  }}
                >
                  Hapus
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            onPress={handleAddItem}
            style={{
              backgroundColor: "#027335",
              paddingVertical: 10,
              borderRadius: 10,
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontFamily: "PoppinsBlack",
              }}
            >
              Tambah Barang
            </Text>
          </TouchableOpacity>
        </View>

        {/* Total Keseluruhan */}
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#eee",
            paddingVertical: 10,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "PoppinsBold",
              color: "#027335",
              textAlign: "right",
            }}
          >
            Total: {formatRupiah(totalKeseluruhan)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleCreatePenjualan}
          style={[styles.buttonEdit, { marginBottom: 50 }]}
          disabled={loading}
        >
          {loading ? (
            <Text style={[styles.buttonEditContentText]}>Loading ...</Text>
          ) : (
            <Text style={[styles.buttonEditContentText]}>Simpan Penjualan</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PenjualanCreate;

// ... styles sama seperti sebelumnya
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  buttonIndicator: {
    flexDirection: "row",
  },
  buttonIndicatorContentParentBack: {
    flex: 1,
    alignItems: "flex-start",
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
    fontWeight: "700",
  },
  profileTextParent: {
    marginTop: 10,
  },
  profileTextContent: {
    fontFamily: "PoppinsBold",
    fontSize: 23,
    textAlign: "center",
  },
  formControl: {
    flexDirection: "column",
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#027335",
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 45,
    fontFamily: "PoppinsRegular",
    marginBottom: 10,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  buttonEdit: {
    backgroundColor: "#027335",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonEditContentText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    fontFamily: "PoppinsMedium",
  },
});
