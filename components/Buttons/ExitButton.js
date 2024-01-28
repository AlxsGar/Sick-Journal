import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../util/Colors";

function ExitButton({onExit}) {
  return (
    <View style={styles.buttonDesign}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onExit}
        android_ripple={Colors.accentColor200}
      >
        <Text style={styles.buttonContent}>x</Text>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
    buttonInnerContainer: {
      backgroundColor: 'transparent',
    },
    buttonContent: {
      color: "black",
      fontSize: 24,
    },
    pressed: {
      opacity: 0.75,
    },
  });

export default ExitButton
