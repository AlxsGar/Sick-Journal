import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";
import { useEffect, useState } from "react";
import { init } from "./util/Data";
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {

  const [dbInit, setDbInit] = useState(false)

  useEffect(() => {
    init().then(() => {
      setDbInit(true)
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  if(!dbInit){
    return <AppLoading/>
  }

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
