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
import { SafeAreaView } from "react-native-safe-area-context";
export default function Cart() {
  const [penjualans, setPenjualans] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const fetchPenjualan = async (pageNumber = 1) => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      const perPage = 10;
      const response = await Api.get(
        `/api/penjualan/list?page=${pageNumber}&perPage=${perPage}`,
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

      setPenjualans((prev) =>
        pageNumber === 1 ? newData : [...prev, ...newData]
      );

      setPage(pageNumber);
    } catch (err) {
      console.log(err?.response.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPenjualan = (kode) => {
    // console.log("Kode:", kode); // Debug dulu
    router.push(`/penjualan/edit?id=${kode}`);
  };

  const handleDeletePenjualan = (kode) => {
    Alert.alert("Konfirmasi", "Yakin ingin menghapus penjualan ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => deletePenjualan(kode),
      },
    ]);
  };

  const deletePenjualan = async (id) => {
    const token = AsyncStorage.getItem("token");
    try {
      const response = await Api.delete(`/api/penjualan/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPenjualan();
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
      fetchPenjualan(1);
      setIsLoading(false);
      setIsEndReached(false);
    }, [])
  );

  const handleLoadMore = () => {
    if (!isLoading && !isEndReached) {
      fetchPenjualan(page + 1);
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
        onPress={() => handleEditPenjualan(item.id_nota)}
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
        onPress={() => handleDeletePenjualan(item.id_nota)}
      >
        <Text style={{ color: "white", fontFamily: "PoppinsSemiBold" }}>
          Hapus
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {/* Barang Text */}
        <View style={[styles.barangTextParent]}>
          <Text style={[styles.barangTextContent]}>Penjualan</Text>
        </View>
        {/* End Barang Text */}

        {/* Tombol Tambah Data Barang */}
        <View style={styles.buttonTambahBarangParent}>
          <TouchableOpacity
            style={styles.buttonTambahBarang}
            onPress={() => router.push("/penjualan/create")}
          >
            <Text style={styles.buttonTambahBarangContent}>
              Tambah Penjualan
            </Text>
          </TouchableOpacity>
        </View>
        {/* end tomnbol tambah data barang */}
        <FlatList
          style={{ flex: 1, marginBottom: 70 }}
          data={penjualans}
          keyExtractor={(item, index) => `${item.id_nota}_${index}`}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshing={isLoading}
          onRefresh={() => fetchPenjualan(1)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item)}>
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={
                  () => console.log("Tekan item", item.id_nota) // atau arahkan ke detail
                }
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardNama}>{item.pelanggan.nama}</Text>
                  <Text style={styles.cardHarga}>
                    {formatRupiah(item.subtotal)}
                  </Text>
                </View>
                <Text style={styles.cardKategori}>{item.id_nota}</Text>
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
    </SafeAreaView>
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
