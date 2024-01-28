import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../util/Colors";

function ActionButton({ onPress }) {
  return (
    <View style={styles.buttonDesign}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={Colors.accentColor200}
      >
        <Text style={styles.buttonContent}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonDesign: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 12,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 15,
  },
  buttonInnerContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.accentColor,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.58,
    shadowRadius: 2.22,
  },
  buttonContent: {
    color: "white",
    fontSize: 32,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default ActionButton;
