import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={styles.container}>
        <NavigationContainer theme={{colors: 'white'}}>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="login">
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.select({ android: 24, ios: 0 }),
    paddingHorizontal: 12,
  },
});
