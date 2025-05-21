import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";

export default function Login() {
  const [handleFocusUsername, setHandleFocusUsername] = useState(false);
  const [handleFocusEmail, setHandleFocusEmail] = useState(false);
  const [handleFocusPassword, setHandleFocusPassword] = useState(false);
  const [handleShowPassword, setHandleShowPassword] = useState(true);

  const handleFocusUsernameClick = () => {
    setHandleFocusUsername(true);
    setHandleFocusEmail(false);
    setHandleFocusPassword(false);
  };

  const handleFocusPasswordClick = () => {
    setHandleFocusUsername(false);
    setHandleFocusEmail(false);
    setHandleFocusPassword(true);
  };

  const handleFocusEmailClick = () => {
    setHandleFocusUsername(false);
    setHandleFocusEmail(true);
    setHandleFocusPassword(false);
  };

  const showPassword = () => {
    setHandleShowPassword(!handleShowPassword);
  };

  const handletoLogin = () => {
    router.push("/auth/login");
  };
  return (
    <ImageBackground
      source={require("../../assets/image/auth/imageBackground.png")}
      style={styles.container}
    >
      <StatusBar translucent={true} style="dark" />

      <View style={styles.content}>
        <View style={styles.viewTextBrand}>
          <Text style={styles.textHeaderBrand}>
            tanam {"\n"}
            <Text style={styles.textDescriptionBrand}>Grocery App</Text>
          </Text>
        </View>
        <Text style={styles.textHeader}>Create an account</Text>
        <View style={styles.formControl}>
          <View style={styles.formControlParent}>
            <Icon
              name="user"
              size={20}
              style={[
                styles.iconLeft,
                handleFocusUsername && styles.iconLeftActive,
              ]}
            />
            <TextInput
              placeholder="Username"
              onFocus={() => handleFocusUsernameClick()}
              style={[
                styles.textInput,
                handleFocusUsername && styles.textInputActive,
              ]}
            />
          </View>

          <View style={styles.formControlParent}>
            <Icon
              name="mail"
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
              onFocus={() => handleFocusEmailClick()}
              style={[
                styles.textInput,
                handleFocusEmail && styles.textInputActive,
              ]}
            />
          </View>

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
              onFocus={() => handleFocusPasswordClick()}
              style={[
                styles.textInput,
                handleFocusPassword && styles.textInputActive,
              ]}
            />

            <TouchableOpacity
              style={styles.buttonRightEyePassword}
              onPress={() => showPassword()}
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

          <View style={[styles.viewForgotAndKeepSignInParent]}>
            <View style={[styles.viewForgotPassword]}>
              <TouchableOpacity>
                <Text style={[styles.textForgotPassword]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.textButton}>SIGN UP</Text>
          </TouchableOpacity>

          <View style={styles.viewTextRegister}>
            <Text style={styles.textRegister}>Have an account?</Text>
          </View>

          <TouchableOpacity
            style={styles.viewButtonBorder}
            onPress={() => handletoLogin()}
          >
            <Text style={styles.textButtonBorder}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 10,
  },

  textHeaderBrand: {
    fontFamily: "PoppinsBlack",
    fontSize: 40,
    color: "#027335",
    textAlign: "center",
  },
  textDescriptionBrand: {
    textAlign: "center",
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    color: "#027335",
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

  textHeader: {
    fontFamily: "PoppinsBold",
    fontSize: 22,
    lineHeight: 32,
    alignSelf: "flex-start",
    textAlign: "left",
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
    top: "20%",
    color: "#bbbb",
  },

  iconLeftActive: {
    position: "absolute",
    zIndex: 2,
    left: 10,
    top: "20%",
    color: "#027335",
  },

  iconLeft: {
    position: "absolute",
    zIndex: 2,
    left: 10,
    top: "20%",
    color: "#bbbb",
  },

  iconLeftActive: {
    position: "absolute",
    zIndex: 2,
    left: 10,
    top: "20%",
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
    top: "20%",
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
    shadowColor: "#027335", // warna shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    // Shadow untuk Android
    elevation: 8,
  },
  textButton: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "PoppinsExtraBold",
    paddingVertical: 10,
    color: "#fff",
  },

  viewButtonBorder: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderColor: "#027335",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#027335", // warna shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    // Shadow untuk Android
    elevation: 8,
  },
  textButtonBorder: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "PoppinsExtraBold",
    paddingVertical: 10,
    color: "#027335",
  },

  viewForgotAndKeepSignInParent: {
    flexDirection: "row",
  },

  viewForgotPassword: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },

  textForgotPassword: {
    color: "#027335",
    fontFamily: "PoppinsMedium",
    fontSize: 12,
    textDecorationLine: "underline",
  },

  viewTextRegister: {
    marginTop: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textRegister: {
    fontFamily: "PoppinsRegular",
    color: "#7D8FAB",
    fontSize: 12,
  },
});
