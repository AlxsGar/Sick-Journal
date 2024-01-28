import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../util/Colors";

function LoginButton({ enable, onPress }) {
  let enabledButton = enable;
  return (
    <View
      style={[
        styles.buttonDesign,
        enabledButton ? styles.buttonAble : styles.buttonDisable,
      ]}
    >
      <Pressable
        style={({ pressed }) => pressed && enabledButton ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
        onPress={onPress}
        android_ripple={{ color: enabledButton ? Colors.accentColor200 : 'gray' }}   
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonDesign: {
    margin: 4,
    borderRadius: 5,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonAble: {
    backgroundColor: Colors.accentColor,
  },
  buttonDisable: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75,
  }
});

export default LoginButton;
