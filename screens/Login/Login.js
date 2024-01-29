import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import LoginButton from "../../components/Buttons/LoginButton";
import Colors from "../../util/Colors";
import { useState } from "react";

function Login({ navigation }) {
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [enableButton, setEnableButton] = useState({
    emailValid: false,
    passValid: false,
  });

  const emailRx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const userData = {
    email: "jhon@mail.com",
    password: "77@1$.",
  };

  const emailInputHandler = (inputEmail) => {
    if (emailRx.test(inputEmail) === false) {
      setEnableButton({ ...enableButton, emailValid: false });
    } else {
      setEnableButton({ ...enableButton, emailValid: true });
      setEmailInput(inputEmail);
    }
  };

  const passInputHandler = (inputPass) => {
    if (inputPass) setEnableButton({ ...enableButton, passValid: true });
    else setEnableButton({ ...enableButton, passValid: false });
    setPassInput(inputPass);
  };

  const submitHandler = () => {
    if ((emailInput !== userData.email || passInput !== userData.password) && enableButton.emailValid && enableButton.passValid) {
      Alert.alert(
        "Usuario o cantraseña incorrecta",
        "Ingrese los datos de nuevo."
      );
      return;
    }
    if (enableButton.emailValid && enableButton.passValid && emailInput === userData.email && passInput === userData.password) {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.loginTitle}>Iniciar Sesión</Text>
        <Text style={styles.loginSubtitle}>
          Ingresa los datos de la cuenta para continuar
        </Text>
      </View>
      <View style={styles.loginForm}>
        <TextInput
          style={styles.loginInput}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Correo"
          onChangeText={emailInputHandler}
          autoCorrect={false}
          maxLength={100}
        />
        <TextInput
          style={styles.loginInput}
          secureTextEntry={true}
          placeholder="Contraseña"
          onChangeText={passInputHandler}
          maxLength={100}
        />
        <LoginButton
          enable={enableButton.emailValid && enableButton.passValid}
          onPress={submitHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleContainer: {
    flex: 5,
    justifyContent: "center",
  },
  loginForm: {
    flex: 7,
  },
  loginInput: {
    paddingVertical: 6,
    marginVertical: 6,
    height: 50,
    color: Colors.accentColor,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  loginTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.accentColor,
  },
  loginSubtitle: {
    color: "gray",
  },
});

export default Login;
