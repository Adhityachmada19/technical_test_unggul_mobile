import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../api/api";

import { formatRupiah } from "../../lib/FormatRupiah";
import { SafeAreaView } from "react-native-safe-area-context";
export default function home() {
  const [totalPelanggan, setTotalPelanggan] = useState(0);
  const [totalBarang, setTotalBarang] = useState(0);
  const [debitToday, setDebitToday] = useState(0);
  const [debitMonth, setDebitMonth] = useState(0);
  const [debitAll, setDebitAll] = useState(0);
  const [topPelanggan, setTopPelanggan] = useState([]);
  const [topBarang, setTopBarang] = useState([]);

  const [nameUser, setNameUser] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Selamat Pagi";
    } else if (currentHour >= 12 && currentHour < 15) {
      return "Selamat Siang";
    } else if (currentHour >= 15 && currentHour < 19) {
      return "Selamat Sore";
    } else {
      return "Selamat Malam";
    }
  };

  const fetchDataDashboard = async () => {
    const token = await AsyncStorage.getItem("token");
    await Api.get(`/api/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setTotalBarang(response.data.data.total_barang);
        setTotalPelanggan(response.data.data.total_pelanggan);
        setDebitToday(response.data.data.pemasukan_hari_ini);
        setDebitMonth(response.data.data.pemasukan_bulan_ini);
        setDebitAll(response.data.data.pemasukan_keseluruhan);
        setTopPelanggan(response.data.data.top_pelanggan);
        setTopBarang(response.data.data.barang_terlaris);
      })
      .catch((error) => {});
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDataDashboard(); // Fungsi ambil data
    setRefreshing(false);
  };
  useEffect(() => {
    const getName = async () => {
      const name = await AsyncStorage.getItem("name_user");
      if (name) setNameUser(name);
    };

    getName();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDataDashboard();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {/* Headers */}
        <View style={styles.headers}>
          <View style={styles.headersNameAccountParent}>
            <Text style={styles.headersTimeText}>{getGreeting()} </Text>
            <Text style={styles.headersNameAccountText}>{nameUser}. 👋</Text>
          </View>

          {/* <View style={styles.headesNotificationParent}>
            <View style={styles.headersNotificationCount}>
              <Text style={styles.headersNotificationCountText}>99+</Text>
              <View style={styles.headersNotificationIconParent}>
                <TouchableOpacity style={styles.headersNotificationIcon}>
                  <Ionicons name="notifications" color="#fff" size={22} />
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
        </View>

        {/* End Headers */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginBottom: 75 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Categories */}
          <View style={styles.categories}>
            <View style={styles.categoriesParent}>
              <View style={styles.categoriesCountPelanggan}>
                <View style={styles.categoriesItemCount}>
                  <Text style={styles.countValueText}>{totalPelanggan}</Text>
                </View>
                <View style={styles.categoriesItemText}>
                  <Text style={styles.countText}>Pelanggan</Text>
                </View>
              </View>
              <View style={styles.categoriesCountBarang}>
                <View style={styles.categoriesItemCount}>
                  <Text style={styles.countValueText}>{totalBarang}</Text>
                </View>
                <View style={styles.categoriesItemText}>
                  <Text style={styles.countText}>Barang</Text>
                </View>
              </View>
            </View>
          </View>
          {/* End Categories */}

          {/* Total Pemasukan */}
          <View style={styles.debit}>
            <View style={styles.debitParent}>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 16,
                  fontFamily: "PoppinsSemiBold",
                }}
              >
                Pemasukan
              </Text>
              <View style={styles.debitToday}>
                <View style={styles.debitItemParent}>
                  <Text style={styles.debitItemText}>Pemasukan Hari Ini</Text>
                </View>
                <View style={styles.debitItemValueParent}>
                  <Text style={styles.debitItemValueText}>
                    {formatRupiah(debitToday)}
                  </Text>
                </View>
              </View>
              <View style={styles.debitMonth}>
                <View style={styles.debitItemParent}>
                  <Text style={styles.debitItemText}>Pemasukan Bulan Ini</Text>
                </View>
                <View style={styles.debitItemValueParent}>
                  <Text style={styles.debitItemValueText}>
                    {formatRupiah(debitMonth)}
                  </Text>
                </View>
              </View>
              <View style={styles.debitAll}>
                <View style={styles.debitItemParent}>
                  <Text style={styles.debitItemText}>
                    Pemasukan Keseluruhan
                  </Text>
                </View>
                <View style={styles.debitItemValueParent}>
                  <Text style={styles.debitItemValueText}>
                    {formatRupiah(debitAll)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* End Total Pemasukan */}
          {/* Top Pelanggan */}
          <View style={styles.topPelanggan}>
            <View style={styles.topPelangganParent}>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 16,
                  fontFamily: "PoppinsSemiBold",
                }}
              >
                Top 5 Pelanggan
              </Text>
            </View>

            <FlatList
              style={styles.topPelangganContent}
              data={topPelanggan}
              scrollEnabled={false}
              keyExtractor={(item) => item.kode_pelanggan}
              renderItem={({ item, index }) => (
                <View style={styles.card}>
                  <Text style={styles.rank}>#{index + 1}</Text>
                  <View>
                    <Text style={styles.name}>{item.nama}</Text>
                    <Text style={styles.amount}>
                      {formatRupiah(item.total_pembelian)}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
          {/* End Top Pelanggan */}

          {/* Top Pelanggan */}
          <View style={styles.topPelanggan}>
            <View style={styles.topPelangganParent}>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 16,
                  fontFamily: "PoppinsSemiBold",
                }}
              >
                Top 5 Barang Terlaris
              </Text>
            </View>

            <FlatList
              style={styles.topPelangganContent}
              data={topBarang}
              scrollEnabled={false}
              keyExtractor={(item) => item.kode_barang}
              renderItem={({ item, index }) => (
                <View style={styles.card}>
                  <Text style={styles.rank}>#{index + 1}</Text>
                  <View>
                    <Text style={styles.name}>{item.nama}</Text>
                    <Text style={styles.totalBarang}>
                      {item.total_terjual} Terjual
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
          {/* End Top Pelanggan */}
        </ScrollView>
      </View>
    </SafeAreaView>
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

  categories: {
    flexDirection: "column",
  },

  categoriesParent: {
    flexDirection: "row",
    marginVertical: 10,
  },

  categoriesCountPelanggan: {
    marginHorizontal: 1,
    flex: 1,
    height: 100,
    backgroundColor: "#0b5394",
    flexDirection: "column",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  categoriesCountBarang: {
    marginHorizontal: 1,
    flex: 1,
    height: 100,
    backgroundColor: "#a2c4c9",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  countValueText: {
    fontFamily: "PoppinsBlack",
    color: "#fff",
    fontSize: 30,
  },

  countText: {
    fontFamily: "PoppinsSemiBold",
    color: "#fff",
    fontSize: 15,
  },

  debit: {
    flexDirection: "column",
  },
  debitParent: {
    flexDirection: "column",
  },
  debitToday: {
    paddingTop: 10,
    paddingHorizontal: 15,
    height: 100,
    backgroundColor: "#AE7156",
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: "column",
  },
  debitMonth: {
    paddingTop: 10,
    paddingHorizontal: 15,
    height: 100,
    backgroundColor: "#14AB87",
    borderRadius: 20,
    marginBottom: 10,
  },
  debitAll: {
    paddingTop: 10,
    paddingHorizontal: 15,
    height: 100,
    backgroundColor: "#A131AD",
    borderRadius: 20,
  },

  debitItemParent: { alignItems: "flex-start" },
  debitItemText: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  debitItemValueParent: {
    alignItems: "flex-end",
    marginTop: 10,
  },

  debitItemValueText: {
    textAlign: "right",
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 25,
  },

  topPelanggan: {
    flexDirection: "column",
    marginTop: 10,
  },
  topPelangganParent: {
    flexDirection: "column",
  },

  topPelangganContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: "column",
  },

  card: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  rank: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  amount: {
    fontSize: 14,
    color: "green",
  },

  totalBarang: {
    fontSize: 14,
    color: "green",
  },
});
