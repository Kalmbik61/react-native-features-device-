import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPlace from "./src/screens/AddPlace";
import AllPlaces from "./src/screens/AllPlaces";
import IconButton from "./src/components/global/IconButton";
import { COLORS } from "./styles/styles";
import Map from "./src/screens/Map";
import { useEffect, useState } from "react";
import { initSQLite } from "./utils/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "./src/screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    initSQLite()
      .then((r) => setDbInitialized(true))
      .catch((e) => console.error(e));
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  if (!dbInitialized) {
    return (
      <SafeAreaView onLayout={onLayoutRootView} style={styles.loader}>
        <ActivityIndicator size={"large"} color={COLORS.accent500} />
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar style='dark' />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.primary500,
            },
            headerTintColor: COLORS.gray700,
            contentStyle: { backgroundColor: COLORS.gray700 },
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "All Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                  icon={"add"}
                />
              ),
            })}
          />
          <Stack.Screen
            name='AddPlace'
            component={AddPlace}
            options={{
              title: "Add new Places",
            }}
          />
          <Stack.Screen name='Map' component={Map} />

          <Stack.Screen
            name='PlaceDetails'
            component={PlaceDetails}
            options={{
              title: "Loading title...",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
