import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Api from "../../api/api";
import ToastManager, { Toast } from "toastify-react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({});
  const [handleFocusEmail, setHandleFocusEmail] = useState(false);
  const [handleFocusPassword, setHandleFocusPassword] = useState(false);
  const [handleShowPassword, setHandleShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFocusEmailClick = () => {
    setHandleFocusEmail(true);
    setHandleFocusPassword(false);
  };

  const handleFocusPasswordClick = () => {
    setHandleFocusEmail(false);
    setHandleFocusPassword(true);
  };

  const showPassword = () => {
    setHandleShowPassword(!handleShowPassword);
  };

  const handletoHome = async () => {
    setLoading(true);
    await Api.post(`/api/auth/login`, {
      email: email,
      password: password,
    })
      .then((response) => {
        setLoading(false);
        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("name_user", response.data.user.name);
        Toast.show({
          type: "success",
          text1: "Login Sucessfully",
          position: "top-end",
          visibilityTime: 3000,
          autoHide: true,
        });

        router.replace("/home");
      })
      .catch((error) => {
        setLoading(false);
        setValidation(error.response?.data);
      });
  };

  return (
    <ImageBackground
      source={require("../../assets/image/auth/imageBackground.png")}
      style={styles.container}
    >
      <StatusBar translucent={true} style="dark" />

      <View style={styles.content}>
        <View style={styles.viewTextBrand}>
          <Text style={styles.textHeaderBrand}>Toko Ku {"\n"}</Text>
        </View>
        <Text style={styles.textHeader}>Welcome back</Text>

        <View style={styles.formControl}>
          {validation?.message && (
            <Text
              style={{ color: "red", textAlign: "center", marginBottom: 8 }}
            >
              {validation.message}
            </Text>
          )}
          <View style={styles.formControlParent}>
            <Icon
              name="user"
              size={20}
              style={[
                styles.iconLeft,
                handleFocusEmail && styles.iconLeftActive,
              ]}
            />
            <TextInput
              placeholder="Email"
              autoCorrect={false}
              autoComplete="email"
              onFocus={handleFocusEmailClick}
              style={[
                styles.textInput,
                handleFocusEmail && styles.textInputActive,
              ]}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          {validation?.email && (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {validation.email[0]}
            </Text>
          )}
          <View style={styles.formControlParent}>
            <Icon
              name="lock"
              size={20}
              style={[
                styles.iconLeft,
                handleFocusPassword && styles.iconLeftActive,
              ]}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={handleShowPassword}
              onFocus={handleFocusPasswordClick}
              style={[
                styles.textInput,
                handleFocusPassword && styles.textInputActive,
              ]}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.buttonRightEyePassword}
              onPress={showPassword}
            >
              <Icon
                name={handleShowPassword ? "eye" : "eye-off"}
                size={20}
                style={[
                  styles.iconRight,
                  handleFocusPassword && styles.iconRightActive,
                ]}
              />
            </TouchableOpacity>
          </View>
          {validation?.password && (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {validation.password[0]}
            </Text>
          )}
          <TouchableOpacity
            style={styles.viewButton}
            onPress={handletoHome}
            disabled={loading}
          >
            <Text style={styles.textButton}>
              {loading ? "Loading..." : "SIGN IN"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ToastManager />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTextBrand: {
    alignItems: "center",
    justifyContent: "center",
  },
  textHeaderBrand: {
    fontFamily: "PoppinsBlack",
    fontSize: 40,
    color: "#027335",
    textAlign: "center",
  },
  textHeader: {
    fontFamily: "PoppinsBold",
    fontSize: 22,
    lineHeight: 32,
    alignSelf: "flex-start",
    textAlign: "left",
  },
  content: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 200,
    width: "100%",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "column",
  },
  formControl: {
    marginTop: 20,
    flexDirection: "column",
  },
  formControlParent: {
    position: "relative",
    flexDirection: "column",
  },
  iconLeft: {
    position: "absolute",
    zIndex: 2,
    left: 10,
    top: "30%",
    color: "#bbbb",
  },
  iconLeftActive: {
    color: "#027335",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#E8EFF3",
    paddingLeft: 35,
    height: 50,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bbbb",
  },
  textInputActive: {
    backgroundColor: "#fff",
    paddingLeft: 35,
    height: 50,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#027335",
  },
  buttonRightEyePassword: {
    zIndex: 2,
    position: "absolute",
    right: 15,
    top: "30%",
  },
  iconRight: {
    color: "#bbbb",
  },
  iconRightActive: {
    color: "#027335",
  },
  viewButton: {
    marginTop: 20,
    backgroundColor: "#027335",
    borderRadius: 10,
    shadowColor: "#027335",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  textButton: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "PoppinsExtraBold",
    paddingVertical: 10,
    color: "#fff",
  },
});
