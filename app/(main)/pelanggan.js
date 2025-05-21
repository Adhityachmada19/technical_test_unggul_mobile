import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../api/api";
import { router, useFocusEffect } from "expo-router";
import { formatRupiah } from "../../lib/FormatRupiah";
import { Swipeable } from "react-native-gesture-handler";
import ToastManager, { Toast } from "toastify-react-native";
export default function Pelanggan() {
  const [pelanggans, setPelanggans] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const fetchPelanggan = async (pageNumber = 1) => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      const perPage = 10;
      const response = await Api.get(
        `/api/pelanggan/list?page=${pageNumber}&perPage=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newData = response.data.data.data;
      console.log(newData);
      if (pageNumber === 1) {
        setIsEndReached(false);
      }
      if (newData.length < perPage) {
        setIsEndReached(true);
      }

      setPelanggans((prev) =>
        pageNumber === 1 ? newData : [...prev, ...newData]
      );

      setPage(pageNumber);
    } catch (err) {
      console.log(err?.response.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBarang = (kode) => {
    // console.log("Kode:", kode); // Debug dulu
    router.push(`/pelanggan/edit?kode=${kode}`);
  };

  const handleDeletePelanggan = (kode) => {
    Alert.alert("Konfirmasi", "Yakin ingin menghapus pelanggan ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => deletePelanggan(kode),
      },
    ]);
  };

  const deletePelanggan = async (id) => {
    const token = AsyncStorage.getItem("token");
    try {
      const response = await Api.delete(`/api/pelanggan/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPelanggan();
      Toast.show({
        type: "success",
        text1: "Data Berhasil Dihapus",
        position: "top-end",
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (err) {
      console.log(err.response.data);
      Toast.show({
        type: "error",
        text1: err.response.data.message,
        position: "top-end",
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPelanggan(1);
      setIsLoading(false);
      setIsEndReached(false);
    }, [])
  );

  const handleLoadMore = () => {
    if (!isLoading && !isEndReached) {
      fetchPelanggan(page + 1);
    }
  };

  const renderRightActions = (item) => (
    <View style={{ flexDirection: "row", height: "90%" }}>
      <TouchableOpacity
        style={{
          backgroundColor: "#f0ad4e",
          justifyContent: "center",
          alignItems: "center",
          width: 80,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
        onPress={() => handleEditBarang(item.id_pelanggan)}
      >
        <Text style={{ color: "white", fontFamily: "PoppinsSemiBold" }}>
          Edit
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#d9534f",
          justifyContent: "center",
          alignItems: "center",
          width: 80,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
        onPress={() => handleDeletePelanggan(item.id_pelanggan)}
      >
        <Text style={{ color: "white", fontFamily: "PoppinsSemiBold" }}>
          Hapus
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar translucent={false} backgroundColor="#fff" style="dark" />
      <View style={styles.container}>
        {/* Barang Text */}
        <View style={[styles.barangTextParent]}>
          <Text style={[styles.barangTextContent]}>Pelanggan</Text>
        </View>
        {/* End Barang Text */}

        {/* Tombol Tambah Data Barang */}
        <View style={styles.buttonTambahBarangParent}>
          <TouchableOpacity
            style={styles.buttonTambahBarang}
            onPress={() => router.push("/pelanggan/create")}
          >
            <Text style={styles.buttonTambahBarangContent}>
              Tambah Pelanggan
            </Text>
          </TouchableOpacity>
        </View>
        {/* end tomnbol tambah data barang */}
        <FlatList
          style={{ flex: 1, marginBottom: 70 }}
          data={pelanggans}
          keyExtractor={(item, index) => `${item.id_pelanggan}_${index}`}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshing={isLoading}
          onRefresh={() => fetchPelanggan(1)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item)}>
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={
                  () => console.log("Tekan item", item.id_pelanggan) // atau arahkan ke detail
                }
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardNama}>{item.nama}</Text>
                  <Text style={styles.cardHarga}>{item.jenis_kelamin}</Text>
                </View>
                <Text style={styles.cardKategori}>{item.domisili}</Text>
              </TouchableOpacity>
            </Swipeable>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            isLoading ? (
              <Text style={{ textAlign: "center", marginVertical: 10 }}>
                Loading...
              </Text>
            ) : null
          }
          ListEmptyComponent={
            !isLoading && (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                Tidak ada data
              </Text>
            )
          }
        />
      </View>
      <ToastManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  /**
   * barang Text
   */
  barangTextParent: {
    marginTop: 10,
  },

  barangTextContent: {
    fontFamily: "PoppinsBold",
    fontSize: 23,
  },
  /**
   * End barang Text
   */

  /**
   * Tombol tambah barang
   */
  buttonTambahBarangParent: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: 10,
  },

  buttonTambahBarang: {
    backgroundColor: "#027335",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  buttonTambahBarangContent: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "PoppinsSemiBold",

    color: "#fff",
  },
  /**
   * End tombol tambah barang
   */

  /**Card Barang */
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  cardKode: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: "#444",
  },

  cardHarga: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: "#027335",
  },

  cardNama: {
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: "#000",
  },

  cardKategori: {
    fontFamily: "PoppinsLight",
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  /**End Card Barang */
});
